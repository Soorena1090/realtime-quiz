const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/quizzes',authMiddleware,quizController.createQuiz);
router.get('/quizzes', authMiddleware,quizController.getAllQuizzes);

module.exports = router;