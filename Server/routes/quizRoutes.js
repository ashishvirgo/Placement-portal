import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  deleteQuiz,
  submitQuiz,
  updateQuiz,
  getSampleQuizzes,
  getAssignedQuizzes,blockQuiz,unblockQuiz,checkBlock,
  getBlockedStudentsByQuiz
} from "../controller/quizController.js";

const router = express.Router();
router.put("/:id", updateQuiz);
router.post("/", createQuiz);
router.get("/sample", getSampleQuizzes);
router.get("/", getQuizzes);
router.get("/assigned/:id", getAssignedQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id", deleteQuiz);
router.post("/submit",authMiddleware, submitQuiz);
router.post("/block",blockQuiz);
router.get("/check-block/:attemptId",checkBlock);
router.put( "/unblock/:attemptId", unblockQuiz);
router.get("/blocked/:quizId",getBlockedStudentsByQuiz);
export default router;