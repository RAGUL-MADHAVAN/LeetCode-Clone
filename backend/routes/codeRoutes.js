const express = require('express');
const router = express.Router();
const { runCode } = require('../controllers/codeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/run', authMiddleware, runCode);

module.exports = router;
