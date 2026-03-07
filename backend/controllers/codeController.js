const { submitCode } = require('../services/judge0Service');

// Judge0 language IDs
const LANGUAGE_MAP = {
    cpp: 54,       // C++ (GCC 9.2.0)
    python: 71,    // Python (3.8.1)
    java: 62,      // Java (OpenJDK 13.0.1)
    javascript: 63 // JavaScript (Node.js 12.14.0)
};

// POST /api/code/run
const runCode = async (req, res) => {
    try {
        const { source_code, language, input } = req.body;

        if (!source_code || !language) {
            return res.status(400).json({ message: 'source_code and language are required' });
        }

        const language_id = LANGUAGE_MAP[language];
        if (!language_id) {
            return res.status(400).json({
                message: `Unsupported language: ${language}. Supported: cpp, python, java, javascript`,
            });
        }

        const result = await submitCode(source_code, language_id, input || '');

        res.json({
            stdout: result.stdout || null,
            stderr: result.stderr || null,
            compile_output: result.compile_output || null,
            status: result.status,
            time: result.time,
            memory: result.memory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { runCode };
