const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: [true, 'Difficulty is required'],
        },
        functionName: {
            type: String,
            default: '',
        },
        driverTemplate: {
            type: String,
            default: '',
        },
        tags: [String],
        functionSignatures: {
            javascript: { type: String, default: '' },
            python: { type: String, default: '' },
            java: { type: String, default: '' },
            cpp: { type: String, default: '' },
        },
        sampleTestCases: [
            {
                input: { type: String, default: '' },
                output: { type: String, default: '' },
            },
        ],
        testCases: [
            {
                input: { type: String, default: '' },
                expectedOutput: { type: String, default: '' },
                isHidden: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);
