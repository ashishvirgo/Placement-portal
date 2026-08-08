import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    topic: String,
    difficulty: String,

    quizType: {
      type: String,
      enum: ["sample", "assigned"],
      default: "sample"
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // or Student model
      }
    ],

    duration: {
      type: Number,
      required: true
    },

    negativeMarking: {
      type: Number,
      default: 0
    },

    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "questions.questionType" // 🔥 KEY FIX
        },

        questionType: {
          type: String,
          required: true,
          enum: ["Question", "CodingQuestion"] // MUST match model names
        },

        marks: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);