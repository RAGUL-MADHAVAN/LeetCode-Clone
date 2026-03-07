const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const JUDGE0_URL = process.env.JUDGE0_URL || 'http://localhost:2358';
const EXECUTION_MODE = process.env.EXECUTION_MODE || 'local'; // 'judge0' or 'local'

/**
 * Submit code. Uses Judge0 API in production, or fallback for local Windows dev.
 */
const submitCode = async (source_code, language_id, stdin = '') => {
    if (EXECUTION_MODE === 'judge0') {
        try {
            const response = await axios.post(
                `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
                {
                    source_code,
                    language_id,
                    stdin,
                },
                {
                    timeout: 30000,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    `Judge0 API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
                );
            }
            throw new Error(`Judge0 connection failed: Make sure Judge0 Docker container is running. ${error.message}`);
        }
    } else {
        // Fallback Local Execution Strategy for Dev
        return executeLocally(source_code, language_id, stdin);
    }
};

const executeLocally = (source_code, language_id, stdin) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'code-'));
    let stdout = '';
    let stderr = '';
    let compile_output = '';
    let status_id = 3; // 3 = Accepted, 6 = Compile Error, etc.
    let runTime = 0.01;
    let memory = 1024;

    try {
        const startTime = process.hrtime();

        switch (language_id) {
            case 63: // JavaScript
                {
                    const codeFile = path.join(tmpDir, 'main.js');
                    fs.writeFileSync(codeFile, source_code);
                    stdout = runCommandSync(`node ${codeFile}`, stdin, tmpDir);
                    break;
                }
            case 71: // Python
                {
                    const codeFile = path.join(tmpDir, 'main.py');
                    fs.writeFileSync(codeFile, source_code);
                    stdout = runCommandSync(`python ${codeFile}`, stdin, tmpDir);
                    break;
                }
            case 54: // C++
                {
                    const codeFile = path.join(tmpDir, 'main.cpp');
                    const binFile = path.join(tmpDir, 'main.exe');
                    fs.writeFileSync(codeFile, source_code);
                    try {
                        compile_output = runCommandSync(`g++ ${codeFile} -o ${binFile}`, '', tmpDir);
                    } catch (e) {
                        status_id = 6;
                        compile_output = e.stderr || e.stdout || e.message;
                        break;
                    }
                    stdout = runCommandSync(binFile, stdin, tmpDir);
                    break;
                }
            case 62: // Java
                {
                    const codeFile = path.join(tmpDir, 'Main.java');
                    fs.writeFileSync(codeFile, source_code);
                    try {
                        compile_output = runCommandSync(`javac ${codeFile}`, '', tmpDir);
                    } catch (e) {
                        status_id = 6;
                        compile_output = e.stderr || e.stdout || e.message;
                        break;
                    }
                    stdout = runCommandSync(`java -cp ${tmpDir} Main`, stdin, tmpDir);
                    break;
                }
            default:
                throw new Error("Unsupported language ID");
        }

        const diff = process.hrtime(startTime);
        runTime = (diff[0] + diff[1] / 1e9).toFixed(3);
    } catch (e) {
        status_id = 4; // Wrong Answer/Runtime error
        stderr = e.stderr || e.message;
    } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }

    return {
        stdout,
        stderr,
        compile_output,
        time: runTime,
        memory,
        status: { id: status_id }
    };
};

const runCommandSync = (command, stdin, dir) => {
    return execSync(command, {
        cwd: dir,
        input: stdin,
        timeout: 5000,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
    });
};

module.exports = { submitCode };
