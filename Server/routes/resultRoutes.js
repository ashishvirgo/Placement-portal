import { getMyResults, getQuizWiseResults,getResultsByQuizAndDate } from "../controller/resultController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/results", authMiddleware,getMyResults);
router.get("/quiz-wise",getQuizWiseResults);
router.get("/quiz/:quizId",getResultsByQuizAndDate)
export default router;