const { runCode: dockerRunCode } = require('../services/dockerRunner');
const Problem = require('../models/Problem');
const DriverTemplate = require('../models/DriverTemplate');

// POST /api/code/run
const runCode = async (req, res) => {
    try {
        const { source_code, language, input, problemId } = req.body;
        console.log(input);
        if (!source_code || !language) {
            return res.status(400).json({
                message: 'source_code and language are required'
            });
        }

        const supportedLanguages = ['cpp', 'python', 'java', 'javascript'];
        if (!supportedLanguages.includes(language)) {
            return res.status(400).json({
                message: `Unsupported language: ${language}. Supported: cpp, python, java, javascript`,
            });
        }

        let executionCode = source_code;

        console.log(`[CodeController] Language: ${language}`);
        console.log(`[CodeController] Problem ID: ${problemId}`);

        if (problemId) {
            const problem = await Problem.findById(problemId);
            console.log(`[CodeController] Problem found: ${!!problem}`);

            if (problem && problem.driverTemplate) {
                const template = await DriverTemplate.findOne({
                    name: problem.driverTemplate
                });

                console.log(`[CodeController] Template found: ${!!template}`);

                if (template && template.languages[language]) {

                    executionCode = template.languages[language]
                        .replace('USER_CODE', source_code)
                        .replace(/FUNC/g, problem.functionName);

                    console.log(`[CodeController] Template applied`);
                }
            }
        }

        if (language === 'java') {
            const count = (executionCode.match(/class Solution/g) || []).length;
            if (count > 1) {
                console.log("❌ Duplicate Solution class detected!");
            }
        }

        console.log("===== FINAL EXECUTION CODE =====");
        console.log(executionCode);

        const result = await dockerRunCode(
            executionCode,
            language,
            input || ''
        );

        res.json({
            stdout: result.stdout || null,
            stderr: result.stderr || null,
            compile_output:
                result.status.description === 'Compilation Error'
                    ? result.stderr
                    : null,
            status: result.status,
            time: result.time,
            memory: result.memory,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { runCode };