const express = require('express');
const router = express.Router();
const {
    storeSubmission,
    getUserSubmissions,
    getProblemSubmissions,
} = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, storeSubmission);
router.get('/user/:userId', authMiddleware, getUserSubmissions);
router.get('/problem/:problemId', authMiddleware, getProblemSubmissions);

module.exports = router;
