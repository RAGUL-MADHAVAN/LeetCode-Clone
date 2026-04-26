const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const classifyErrorStatus = (language, stderr) => {
  if (!stderr) return { id: 11, description: "Runtime Error" };

  if (
    language === "java" &&
    (stderr.includes(".java:") ||
      stderr.includes("error:") ||
      stderr.includes("cannot find symbol"))
  ) {
    return { id: 12, description: "Compilation Error" };
  }

  if (
    language === "cpp" &&
    (stderr.includes("error:") || stderr.includes("undefined reference"))
  ) {
    return { id: 12, description: "Compilation Error" };
  }

  return { id: 11, description: "Runtime Error" };
};

const getRuntimeConfig = (code, language) => {
  let filename = "";
  let compileCmd = "";
  let runCmd = "";
  let image = "";

  if (language === "cpp") {
    filename = "main.cpp";
    compileCmd = "g++ main.cpp -o main";
    runCmd = "./main";
    image = "gcc:13";
  } else if (language === "python") {
    filename = "main.py";
    runCmd = "python main.py";
    image = "python:3.11";
  } else if (language === "java") {
    let className = "Main";
    const mainClassMatch = code.match(/class\s+Main\b/);
    if (!mainClassMatch) {
      const classMatch = code.match(/class\s+(\w+)/);
      className = classMatch ? classMatch[1] : "Main";
    }

    filename = `${className}.java`;
    compileCmd = `javac ${className}.java`;
    runCmd = `java ${className}`;
    image = "eclipse-temurin:17-jdk";
  } else if (language === "javascript") {
    filename = "main.js";
    runCmd = "node main.js";
    image = "node:20";
  }

  return { filename, compileCmd, runCmd, image };
};

const safeReadFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
};

const runBatch = (code, language, inputs = []) => {
  return new Promise((resolve) => {
    const id = uuidv4();
    const tempDir = path.join(__dirname, "../temp", id);

    const cleanup = () => {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (err) {
        console.log("[Cleanup Error]", err.message);
      }
    };

    fs.mkdirSync(tempDir, { recursive: true });

    const { filename, compileCmd, runCmd, image } = getRuntimeConfig(code, language);

    fs.writeFileSync(path.join(tempDir, filename), code);

    const normalizedInputs = Array.isArray(inputs) ? inputs : [inputs];
    normalizedInputs.forEach((input, idx) => {
      fs.writeFileSync(path.join(tempDir, `input_${idx}.txt`), input || "");
    });

    const totalCases = normalizedInputs.length;
    const script = `#!/usr/bin/env bash\n` +
      `set +e\n` +
      (compileCmd
        ? `(${compileCmd}) > compile_stdout.txt 2> compile_stderr.txt\n` +
          `echo $? > compile_exit.txt\n` +
          `if [ $(cat compile_exit.txt) -ne 0 ]; then exit 0; fi\n`
        : "") +
      `for i in $(seq 0 ${Math.max(totalCases - 1, 0)}); do\n` +
      `  (${runCmd} < input_${"$i"}.txt) > stdout_${"$i"}.txt 2> stderr_${"$i"}.txt\n` +
      `  echo $? > exit_${"$i"}.txt\n` +
      `done\n`;

    fs.writeFileSync(path.join(tempDir, "run.sh"), script);

    console.log(`[LocalRunner] Language: ${language}`);
    console.log(`[LocalRunner] Filename: ${filename}`);
    console.log(`[LocalRunner] Temp Directory: ${tempDir}`);

    exec(
      'bash run.sh',
      {
        cwd: tempDir,
        timeout: 10000,
        maxBuffer: 5 * 1024 * 1024,
      },
      (error, dockerStdout, dockerStderr) => {
        const compileExitRaw = safeReadFile(path.join(tempDir, "compile_exit.txt")).trim();
        const compileExit = compileExitRaw ? Number.parseInt(compileExitRaw, 10) : 0;
        const compileStderr = safeReadFile(path.join(tempDir, "compile_stderr.txt"));

        if (compileCmd && compileExit !== 0) {
          const status = classifyErrorStatus(language, compileStderr);
          const results = normalizedInputs.map(() => ({
            stdout: "",
            stderr: compileStderr || "",
            exitCode: compileExit,
            status,
            time: "0",
            memory: "0",
          }));
          resolve({
            status,
            compile_output: compileStderr || "",
            results,
          });
          cleanup();
          return;
        }

        if (error) {
          const combinedErr = [dockerStderr, error.message].filter(Boolean).join("\n");
          const status = { id: 11, description: "Runtime Error" };
          const results = normalizedInputs.map(() => ({
            stdout: "",
            stderr: combinedErr || "",
            exitCode: 1,
            status,
            time: "0",
            memory: "0",
          }));
          resolve({ status, results });
          cleanup();
          return;
        }

        const results = normalizedInputs.map((_, idx) => {
          const stdout = safeReadFile(path.join(tempDir, `stdout_${idx}.txt`));
          const stderr = safeReadFile(path.join(tempDir, `stderr_${idx}.txt`));
          const exitRaw = safeReadFile(path.join(tempDir, `exit_${idx}.txt`)).trim();
          const exitCode = exitRaw ? Number.parseInt(exitRaw, 10) : 0;
          const status = exitCode === 0 ? { id: 3, description: "Accepted" } : classifyErrorStatus(language, stderr);

          return {
            stdout: stdout || "",
            stderr: stderr || "",
            exitCode,
            status,
            time: "0",
            memory: "0",
          };
        });

        const overallStatus = results.every((r) => r.status?.id === 3)
          ? { id: 3, description: "Accepted" }
          : results.find((r) => r.status?.id !== 3)?.status || { id: 11, description: "Runtime Error" };

        resolve({
          status: overallStatus,
          results,
        });
        cleanup();
      }
    );
  });
};

const runCode = async (code, language, input) => {
  const batch = await runBatch(code, language, [input || ""]);
  const first = batch.results?.[0] || {};

  return {
    stdout: first.stdout || "",
    stderr: first.stderr || "",
    status: first.status || batch.status,
    time: first.time || "0",
    memory: first.memory || "0",
  };
};

module.exports = { runCode, runBatch };