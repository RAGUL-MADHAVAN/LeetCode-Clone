const express = require('express');
const router = express.Router();
const {
    storeSubmission,
    getUserSubmissions,
    getUserSubmissionsDetailed,
    getProblemSubmissions,
} = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, storeSubmission);
router.get('/user/:userId', authMiddleware, getUserSubmissions);
router.get('/user/:userId/all', authMiddleware, getUserSubmissionsDetailed);
router.get('/problem/:problemId', authMiddleware, getProblemSubmissions);

module.exports = router;
