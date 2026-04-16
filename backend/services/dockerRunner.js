const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const runCode = (code, language, input) => {
  return new Promise((resolve) => {
    const id = uuidv4();
    const tempDir = path.join(__dirname, "../temp", id);

    fs.mkdirSync(tempDir, { recursive: true });

    let filename = "";
    let compileCmd = "";
    let runCmd = "";
    let image = "";

    if (language === "cpp") {
      filename = "main.cpp";
      compileCmd = "g++ main.cpp -o main";
      runCmd = "./main";
      image = "gcc";
    } else if (language === "python") {
      filename = "main.py";
      runCmd = "python main.py";
      image = "python";
    } else if (language === "java") {
      // Extract class name from Java code
      // Prioritize 'class Main' since driver templates use it
      let className = "Main";
      const mainClassMatch = code.match(/class\s+Main\b/);
      if (mainClassMatch) {
        className = "Main";
      } else {
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
      image = "node";
    }

    // Write the code to file
    fs.writeFileSync(path.join(tempDir, filename), code);

    // Replace backslashes in Windows paths for Docker
    const dockerTempDir = tempDir.replace(/\\/g, "/");

    // Debug logging
    console.log(`[DockerRunner] Language: ${language}`);
    console.log(`[DockerRunner] Filename: ${filename}`);
    if (language === "java") {
      console.log(`[DockerRunner] Java class name: ${filename.replace('.java', '')}`);
    }

    let dockerCommand = "";

    // If there is input, save it to input.txt
    if (input) {
      fs.writeFileSync(path.join(tempDir, "input.txt"), input);
      dockerCommand =
        `docker run --rm --memory=128m --cpus=0.5 --network=none -v "${dockerTempDir}:/app" -w /app ${image} bash -c "` +
        (compileCmd ? compileCmd + ' && ' : '') +
        runCmd + ' < input.txt"';
    } else {
      dockerCommand =
        `docker run --rm --memory=128m --cpus=0.5 --network=none -v "${dockerTempDir}:/app" -w /app ${image} bash -c "` +
        (compileCmd ? compileCmd + ' && ' : '') +
        runCmd + `"`;
    }

    exec(dockerCommand, (error, stdout, stderr) => {
      let status = { id: 3, description: "Accepted" };
      let outputStderr = stderr;

      if (error) {
        // Distinguish between compilation error and runtime error
        if (language === "java" && (stderr.includes(".java:") || stderr.includes("error:") || stderr.includes("cannot find symbol"))) {
          status = { id: 12, description: "Compilation Error" };
        } else if (language === "cpp" && (stderr.includes("error:") || stderr.includes("undefined reference"))) {
          status = { id: 12, description: "Compilation Error" };
        } else {
          status = { id: 11, description: "Runtime Error" };
        }
        console.log(`[DockerRunner] Error: ${status.description}`);
        console.log(`[DockerRunner] Stderr: ${stderr}`);
      }

      console.log(`[DockerRunner] Status: ${status.description}`);

      resolve({
        stdout: stdout || "",
        stderr: outputStderr || "",
        status: status,
        time: "0",
        memory: "0",
      });

      setTimeout(() => {
        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (err) {
          console.log("[Cleanup Error]", err.message);
        }
      }, 500);
    });
  });
};

module.exports = { runCode };