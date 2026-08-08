import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  topic: String,
  subtopic: String,

  title: { type: String, required: true },
  description: { type: String, required: true },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },

  starterCode: String,

  testCases: [
    {
      input: String,
      output: String
    }
  ],

  explanation: String
}, { timestamps: true });

export default mongoose.model("CodingQuestion", codingQuestionSchema);