const { runCode: dockerRunCode } = require('../services/dockerRunner');

// POST /api/code/run
const runCode = async (req, res) => {
    try {
        const { source_code, language, input } = req.body;

        if (!source_code || !language) {
            return res.status(400).json({ message: 'source_code and language are required' });
        }

        const supportedLanguages = ['cpp', 'python', 'java', 'javascript'];
        if (!supportedLanguages.includes(language)) {
            return res.status(400).json({
                message: `Unsupported language: ${language}. Supported: cpp, python, java, javascript`,
            });
        }

        const result = await dockerRunCode(source_code, language, input || '');

        res.json({
            stdout: result.stdout || null,
            stderr: result.stderr || null,
            compile_output: result.status.description === 'Compilation Error' ? result.stderr : null,
            status: result.status,
            time: result.time,
            memory: result.memory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { runCode };
