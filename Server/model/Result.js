import mongoose from "mongoose";

const violationSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },

    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const resultSchema = new mongoose.Schema(
  {
    // ================= STUDENT =================
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ================= QUIZ =================
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },

    // ================= ATTEMPT =================
    attemptId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // ================= ANSWERS =================
    answers: {
      type: Array,
      default: [],
    },

    codingAnswers: {
      type: Object,
      default: {},
    },

    selectedLanguage: {
      type: String,
      default: "javascript",
    },

    // ================= RESULT =================
    score: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    // ================= STATUS =================
    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "terminated",
        "blocked",
      ],
      default: "pending",
    },

    // ================= TIME =================
    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },

    // ================= QUESTION ORDER =================
    questionSequence: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],

    // ================= CLIENT INFO =================
    ipAddress: String,

    browser: String,

    device: String,

    // ================= ANTI CHEATING =================
    violationCount: {
      type: Number,
      default: 0,
    },

    violations: {
      type: [violationSchema],
      default: [],
    },

    tabSwitchCount: {
      type: Number,
      default: 0,
    },

    blocked: {
      type: Boolean,
      default: false,
      index: true,
    },

    blockedReason: {
      type: String,
      default: "",
    },

    blockedAt: Date,

    blockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    unblockedAt: Date,

    unblockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    autoSubmitted: {
      type: Boolean,
      default: false,
    },

    terminatedReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent multiple results for the same student and quiz
resultSchema.index(
  {
    student: 1,
    quiz: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Result", resultSchema);