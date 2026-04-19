const User = require('../models/User');
const Submission = require('../models/Submission');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/signup
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/auth/profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('solvedProblems', 'title difficulty');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/auth/stats
const getProfileStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalSubmissions = await Submission.countDocuments({ userId });
        const acceptedSubmissions = await Submission.countDocuments({
            userId,
            status: 'Accepted',
        });
        const user = await User.findById(userId)
            .select('-password')
            .populate('solvedProblems', 'difficulty');

        const solvedProblems = user.solvedProblems.length;
        const solvedByDifficulty = {
            easy: 0,
            medium: 0,
            hard: 0,
        };

        for (const p of user.solvedProblems) {
            const diff = typeof p === 'object' ? p.difficulty : null;
            if (diff && solvedByDifficulty[diff] !== undefined) {
                solvedByDifficulty[diff] += 1;
            }
        }
        const accuracy =
            totalSubmissions > 0
                ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
                : '0.0';

        const recentSubmissions = await Submission.find({ userId })
            .populate('problemId', 'title difficulty')
            .sort({ createdAt: -1 })
            .limit(10);

        const since = new Date();
        since.setDate(since.getDate() - 365);

        const activityAgg = await Submission.aggregate([
            { $match: { userId: user._id, createdAt: { $gte: since } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const submissionActivity = {};
        for (const row of activityAgg) {
            submissionActivity[row._id] = row.count;
        }

        res.json({
            totalSubmissions,
            acceptedSubmissions,
            solvedProblems,
            solvedByDifficulty,
            accuracy,
            submissionActivity,
            recentSubmissions,
            user: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signupUser, loginUser, getProfile, getProfileStats };
