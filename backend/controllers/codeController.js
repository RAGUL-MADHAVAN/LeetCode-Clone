const { runBatch } = require('../services/dockerRunner');
const Problem = require('../models/Problem');
const DriverTemplate = require('../models/DriverTemplate');

// POST /api/code/run
const runCode = async (req, res) => {
    try {
        const { source_code, language, input, expected_output, problemId } = req.body;
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
        let problem = null;

        if (problemId) {
            problem = await Problem.findById(problemId);

            if (problem && problem.driverTemplate) {
                const template = await DriverTemplate.findOne({
                    name: problem.driverTemplate
                });

                if (template && template.languages[language]) {
                    executionCode = template.languages[language]
                        .replace('USER_CODE', source_code)
                        .replace(/FUNC/g, problem.functionName);
                } else {
                    console.log(
                        `[runCode] Driver template not found or language missing: template=${problem.driverTemplate}, language=${language}`
                    );
                }
            } else {
                console.log(
                    `[runCode] Driver template not found or language missing: template=${problem.driverTemplate}, language=${language}`
                );
            }
        }

        if (language === 'java') {
            const count = (executionCode.match(/class Solution/g) || []).length;
            if (count > 1) {
                console.log("❌ Duplicate Solution class detected!");
            }
        }

        const hasCustomInput = typeof input === 'string' && input.trim().length > 0;

        let cases = [];
        if (hasCustomInput) {
            cases = [
                {
                    input: input,
                    expected: typeof expected_output === 'string' ? expected_output : null,
                },
            ];
        } else if (problem && Array.isArray(problem.sampleTestCases) && problem.sampleTestCases.length > 0) {
            cases = problem.sampleTestCases.map((tc) => ({
                input: tc.input || '',
                expected: typeof tc.output === 'string' ? tc.output : '',
            }));
        } else {
            cases = [{ input: '', expected: null }];
        }

        const batchResult = await runBatch(
            executionCode,
            language,
            cases.map((c) => c.input)
        );

        const results = (batchResult.results || []).map((r, idx) => {
            const expected = cases[idx]?.expected ?? null;
            const actual = (r.stdout || '').trim();
            const expectedTrimmed = typeof expected === 'string' ? expected.trim() : null;
            const passed = expectedTrimmed === null ? null : actual === expectedTrimmed;

            return {
                input: cases[idx]?.input || '',
                expected: expectedTrimmed,
                actual,
                passed,
                stdout: r.stdout || '',
                stderr: r.stderr || '',
                status: r.status,
                time: r.time,
                memory: r.memory,
            };
        });

        const comparable = results.filter((r) => r.passed !== null);
        const passedCount = comparable.filter((r) => r.passed).length;
        const totalCount = comparable.length;

        const overallStatus = batchResult.status?.description === 'Compilation Error'
            ? { id: 12, description: 'Compilation Error' }
            : totalCount > 0
                ? (passedCount === totalCount
                    ? { id: 3, description: 'Accepted' }
                    : { id: 4, description: 'Wrong Answer' })
                : batchResult.status;

        res.json({
            status: overallStatus,
            compile_output: batchResult.compile_output || null,
            summary: {
                passed: passedCount,
                total: totalCount,
            },
            results,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { runCode };