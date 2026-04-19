const express = require('express');
const router = express.Router();
const {
    signupUser,
    loginUser,
    getProfile,
    getProfileStats,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.get('/stats', authMiddleware, getProfileStats);

module.exports = router;
