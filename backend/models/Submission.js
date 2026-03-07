const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        enum: ['cpp', 'python', 'java', 'javascript'],
    },
    status: {
        type: String,
        enum: [
            'Accepted',
            'Wrong Answer',
            'Runtime Error',
            'Time Limit Exceeded',
            'Compilation Error',
            'Pending',
        ],
        default: 'Pending',
    },
    runtime: {
        type: String,
        default: '0',
    },
    memory: {
        type: String,
        default: '0',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Submission', submissionSchema);
