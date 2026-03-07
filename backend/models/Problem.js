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
        constraints: {
            type: String,
            default: '',
        },
        sampleInput: {
            type: String,
            default: '',
        },
        sampleOutput: {
            type: String,
            default: '',
        },
        testCases: [
            {
                input: { type: String, default: '' },
                expectedOutput: { type: String, default: '' },
            },
        ],
        tags: [String],
        starterCode: {
            cpp: { type: String, default: '' },
            python: { type: String, default: '' },
            java: { type: String, default: '' },
            javascript: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);
