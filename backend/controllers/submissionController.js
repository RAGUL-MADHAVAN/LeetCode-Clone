const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');
const { submitCode } = require('../services/judge0Service');

const LANGUAGE_MAP = {
    cpp: 54,
    python: 71,
    java: 62,
    javascript: 63,
};

// POST /api/submissions
const storeSubmission = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;
        const userId = req.user._id;

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const language_id = LANGUAGE_MAP[language];
        if (!language_id) {
            return res.status(400).json({ message: 'Unsupported language' });
        }

        let allPassed = true;
        let status = 'Accepted';
        let lastTime = '0';
        let lastMemory = '0';
        const results = [];

        // Run code against each test case
        for (const testCase of problem.testCases) {
            const result = await submitCode(code, language_id, testCase.input);

            const stdout = (result.stdout || '').trim();
            const expected = (testCase.expectedOutput || '').trim();
            const passed = stdout === expected && result.status && result.status.id === 3;

            results.push({
                input: testCase.input,
                expected,
                actual: stdout,
                passed,
                status: result.status,
                time: result.time,
                memory: result.memory,
            });

            if (!passed) {
                allPassed = false;
                if (result.status && result.status.id === 6) {
                    status = 'Compilation Error';
                } else if (result.status && result.status.id === 5) {
                    status = 'Time Limit Exceeded';
                } else if (result.status && result.status.id >= 7 && result.status.id <= 12) {
                    status = 'Runtime Error';
                } else {
                    status = 'Wrong Answer';
                }
            }

            lastTime = result.time || lastTime;
            lastMemory = result.memory || lastMemory;
        }

        if (allPassed) status = 'Accepted';

        const submission = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status,
            runtime: `${lastTime} s`,
            memory: `${lastMemory} KB`,
        });

        // If accepted, add problem to user's solvedProblems (no duplicates)
        if (status === 'Accepted') {
            await User.findByIdAndUpdate(userId, {
                $addToSet: { solvedProblems: problemId },
            });
        }

        res.status(201).json({ submission, results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/submissions/user/:userId
const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.params.userId })
            .populate('problemId', 'title difficulty')
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/submissions/problem/:problemId
const getProblemSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            problemId: req.params.problemId,
        })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { storeSubmission, getUserSubmissions, getProblemSubmissions };
