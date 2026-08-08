
import express from "express";
import {
  addSubject,
  getSubjects,
  deleteSubject
} from "../controller/subjectController.js";

const router = express.Router();

// ADD SUBJECT
router.post("/add", addSubject);

// GET ALL SUBJECTS
router.get("/", getSubjects);

// DELETE SUBJECT
router.delete("/:id", deleteSubject);

export default router;

