import mongoose from "mongoose";

const optionSchema =
  new mongoose.Schema({
    text: String,

    // Optional image
    image: String
  });

const questionSchema =
  new mongoose.Schema(
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
      },

      topic: {
        type: String,
        required: true
      },

      subtopic: {
        type: String,
        required: true
      },

      question: {
        type: String,
        required: true
      },

      // Question image
      image: {
        type: String,
        default: ""
      },

      type: {
        type: String,
        enum: [
          "single",
          "multiple",
          "fill",
          "boolean"
        ],
        required: true
      },

      difficulty: {
        type: String,
        enum: [
          "easy",
          "medium",
          "hard"
        ],
        default: "easy"
      },

      // Options
      options: {
        type: [optionSchema],
        default: []
      },

      // single => Number
      // multiple => Array
      // boolean => Boolean
      // fill => String
      correctAnswer: {
        type:
          mongoose.Schema.Types.Mixed,
        required: true
      },

      // Explanation
      explanation: {
        type: String,
        default: ""
      }
    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "Question",
  questionSchema
);