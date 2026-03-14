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
      filename = "Main.java";
      compileCmd = "javac Main.java";
      runCmd = "java Main";
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
      if (error) {
        resolve({
          stdout: "",
          stderr: stderr,
          status: { id: 11, description: "Runtime Error" },
          time: "0",
          memory: "0",
        });
      } else {
        resolve({
          stdout,
          stderr: "",
          status: { id: 3, description: "Accepted" },
          time: "0",
          memory: "0",
        });
      }

      fs.rmSync(tempDir, { recursive: true, force: true });
    });
  });
};

module.exports = { runCode };