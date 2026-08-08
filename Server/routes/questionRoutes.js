import express from "express";
import { upload } from "../middleware/upload.js";
import {
  addQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion
} from "../controller/questionController.js";

const router = express.Router();

// ================= CREATE QUESTION =================
router.post("/", upload.single("image"), addQuestion);

// ================= GET QUESTIONS =================
router.get("/", getQuestions);

// ================= UPDATE QUESTION (MISSING BEFORE) =================
router.put("/:id", upload.single("image"), updateQuestion);

// ================= DELETE QUESTION =================
router.delete("/:id", deleteQuestion);

export default router;