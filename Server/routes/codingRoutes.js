import express from "express";
import {
  addCodingQuestion,
  getCodingQuestions
} from "../controller/codingController.js";

const router = express.Router();

router.post("/", addCodingQuestion);
router.get("/", getCodingQuestions);

export default router;