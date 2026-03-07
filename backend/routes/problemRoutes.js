const express = require('express');
const router = express.Router();
const {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
} = require('../controllers/problemController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProblems);
router.get('/:id', getProblemById);

// Protected routes (require auth)
router.post('/', authMiddleware, createProblem);
router.put('/:id', authMiddleware, updateProblem);
router.delete('/:id', authMiddleware, deleteProblem);

module.exports = router;
