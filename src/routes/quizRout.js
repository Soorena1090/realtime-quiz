const express = require("express");
const router = express.Router();
const {
  quizById,
  getAllQuizzes,
  createQuiz,
} = require("../controllers/quizController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-quizId", authMiddleware,quizById);
router.post("/quizzes", authMiddleware,createQuiz);
router.get("/quizzes", authMiddleware,getAllQuizzes);

module.exports = router;
