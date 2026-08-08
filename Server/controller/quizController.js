import Quiz from "../model/Quiz.js";
import Result from "../model/Result.js";
import axios from "axios";
// ================= CREATE =================
export const createQuiz = async (req, res) => {
  try {
    const { title, subject, questions, duration } = req.body;
    if (!title || !subject || !questions?.length || !duration) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json({
      message: "Quiz created",
      quiz,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating quiz",
    });
  }
};
// ================= GET ALL =================
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("subject")
      .populate({
        path: "questions.questionId",
      });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching quizzes",
    });
  }
};
export const getSampleQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      quizType: "sampled"
    })
      .populate("subject")
      .populate({
        path: "questions.questionId",
      });
    res.json(quizzes);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching quizzes",
    });
  }
};
// ================= GET ONE =================
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("subject")
      .populate({
        path: "questions.questionId",
      });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    // ================= RANDOMIZE QUESTIONS =================
    let randomizedQuestions = [...quiz.questions];
    randomizedQuestions.sort(() => Math.random() - 0.5);
    // ================= RANDOMIZE OPTIONS =================
    randomizedQuestions = randomizedQuestions.map((item) => {
      const q = item.questionId;
      // if (
      //   q &&
      //   q.options &&
      //   Array.isArray(q.options)
      // ) {
      //   q.options = [...q.options].sort(
      //     () => Math.random() - 0.5
      //   );
      // }
      return item;
    });
    quiz.questions = randomizedQuestions;
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching quiz",
    });
  }
};
// ================= UPDATE =================
export const updateQuiz = async (req, res) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    res.json({
      message: "Quiz updated",
      updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Update failed",
    });
  }
};
// ================= DELETE =================
export const deleteQuiz = async (req, res) => {
  try {
    const deleted = await Quiz.findByIdAndDelete(
      req.params.id
    );
    if (!deleted) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    res.json({
      message: "Quiz deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Delete failed",
    });
  }
};
// ================= SUBMIT QUIZ =================
export const submitQuiz = async (req, res) => {
  console.log("req.user =", req.user);
  console.log("quizId =", req.body.quizId);
  try {
    const { quizId, attemptId, answers } = req.body;
    console.log("Q=", quizId)
    const studentId = req.user?.id;
    // Check if this attempt is blocked
    const blockedResult = await Result.findOne({
      attemptId,
      student: studentId,
      quiz: quizId,
    });

    if (blockedResult?.blocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your exam has been blocked by the administrator.",
      });
    }
    // ================= VALIDATION =================
    if (!quizId) {
      return res.status(400).json({
        message:
          "Quiz ID is required",
      });
    }
    // ================= FIND QUIZ =================
    const quizDoc =
      await Quiz.findById(quizId)
        .populate({
          path: "questions.questionId",
        });
    if (!quizDoc) {
      return res.status(404).json({
        message:
          "Quiz not found",
      });
    }
    // ================= PREVENT MULTIPLE ATTEMPTS =================
    const existingResult =
      await Result.findOne({
        attemptId,
      });

    if (
      existingResult &&
      existingResult.status === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This attempt has already been submitted.",
      });
    }
    // convert mongoose doc to object
    const quiz = quizDoc.toObject();
    let score = 0;
    let total = 0;
    const detailedAnswers = [];
    // ================= LOOP QUESTIONS =================
    for (const item of quiz.questions) {
      const q = item.questionId;
      if (!q) continue;
      const marks = item.marks || 1;
      total += marks;
      // ================= CODING QUESTION =================
      if (q.testCases &&
        Array.isArray(
          q.testCases
        )
      ) {
        const codingAnswer =
          answers?.[q._id];
        let passedCount = 0;
        // run hidden test cases
        for (const tc of q.testCases) {
          try {
            const response =
              await axios.post(
                "http://localhost:5002/api/run-code",
                {
                  language:
                    codingAnswer?.language ||
                    "javascript",
                  code:
                    codingAnswer?.code ||
                    "",
                  input:
                    tc.input,
                }
              );

            const output = String(
              response.data
                ?.output || ""
            ).trim();
            const expected =
              String(
                tc.output || ""
              ).trim();
            if (output === expected) {
              passedCount++;
            }

          } catch (err) {

            console.log(
              "Compile Error:",
              err.message
            );
          }
        }
        const passed = passedCount === q.testCases.length;
        // full marks only
        if (passed) {
          score += marks;
        }
        detailedAnswers.push({
          questionId:
            q._id,

          questionType:
            "coding",

          submittedCode:
            codingAnswer?.code ||
            "",

          language:
            codingAnswer?.language ||
            "javascript",
          passedTestCases:
            passedCount,
          totalTestCases:
            q.testCases.length,
          correct:
            passed,
          marks,
        });
        continue;
      }
      // ================= NORMAL QUESTIONS ===============
      const userAns = answers?.[q._id];
      let correct = false;
      if (userAns !== undefined) {
        // ================= MULTIPLE CORRECT =================
        if (
          Array.isArray(
            userAns
          ) &&
          Array.isArray(
            q.correctAnswer
          )
        ) {

          const sortedUser =
            [...userAns].sort();

          const sortedCorrect =
            [
              ...q.correctAnswer,
            ].sort();
          correct = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
        } else {
          correct = userAns === q.correctAnswer;
        }
        // ================= SCORING =================
        if (correct) {
          score += marks;
        } else {
          score -= Number(quiz.negativeMarking || 0);
        }
      }
      detailedAnswers.push({
        questionId:
          q._id,

        questionType:
          q.type,

        userAnswer:
          userAns,

        correctAnswer:
          q.correctAnswer,

        correct,

        marks,
      });
    }

    // ================= NO NEGATIVE SCORE =================
    if (score < 0) {
      score = 0;
    }

    // ================= PERCENTAGE =================
    const percentage =
      total > 0
        ? (
          (score / total) *
          100
        ).toFixed(2)
        : 0;

    // ================= SAVE RESULT =================
    const result = await Result.create({
      attemptId,
      student: studentId,
      quiz: quizId,

      answers: detailedAnswers,

      score,
      total,
      percentage,

      status: "completed",

      startedAt: new Date(),

      submittedAt: new Date(),

      ipAddress:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,

      autoSubmitted: false,

      blocked: false,

      violationCount: 0,
    });

    // ================= RESPONSE =================
    res.json({
      success: true,
      message: "Quiz submitted successfully",
      resultId: result._id,
      score,
      total,
      percentage,
      answers: detailedAnswers,
    });

  } catch (err) {

    console.error("SUBMIT QUIZ ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Error submitting quiz",
      error: err.message,
    });
  }
};

// ================= ASSIGNED QUIZZES =================
export const getAssignedQuizzes = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log("sid=", studentId)
    const quizzes = await Quiz.find({
      quizType: "assigned",
      students: studentId,
    })
      .populate("subject")
      .populate({
        path: "questions.questionId",
      });
    console.log("Assigned Quiz=", quizzes)
    const formatted = await Promise.all(
      quizzes.map(async (quiz) => {

        const alreadyAttempted =
          await Result.findOne({
            student: studentId,
            quiz: quiz._id,
          });

        return {
          ...quiz.toObject(),

          status: alreadyAttempted
            ? "completed"
            : "pending",

          totalMarks: quiz.questions.reduce(
            (sum, q) =>
              sum + (q.marks || 1),
            0
          ),
        };
      })
    );
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Error fetching assigned quizzes",
    });
  }
};
export const unblockQuiz =  async (req, res) => {
    const { attemptId } = req.params;

    const result =
      await Result.findOneAndUpdate(
        { attemptId },
        {
          blocked: false,
          status: "pending",
          blockedReason: "",
          blockedAt: null,
          violationCount: 0,
          violations: [],
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message:
        "Student unblocked successfully",
      result,
    });
  };
export const checkBlock =
  async (req, res) => {
    const { attemptId } =
      req.params;

    const result =
      await Result.findOne({
        attemptId,
      }).select(
        "blocked blockedReason"
      );

    res.json({
      blocked:
        result?.blocked || false,
      reason:
        result?.blockedReason || "",
    });
  };
export const blockQuiz = async (req, res) => {
  try {
    const {
      quizId,
      attemptId,
      reason,
      violations,
    } = req.body;

    const result = await Result.findOne({
      quiz: quizId,
      attemptId,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found.",
      });
    }

    result.blocked = true;
    result.status = "blocked";
    result.blockedReason = reason;
    result.blockedAt = new Date();
    result.violationCount = violations;

    result.violations.push({
      reason,
      time: new Date(),
    });

    await result.save();

    const updatedResult = await Result.findById(result._id)
      .populate("student", "name email rollNo")
      .populate("quiz", "title");

    res.json({
      success: true,
      message: "Student blocked successfully.",
      result: updatedResult,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getBlockedStudentsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const results = await Result.find({
      quiz: quizId,
      blocked: true,
    })
      .populate("student", "name email")
      .populate("quiz", "title")
      .sort({ blockedAt: -1 });

    res.json({
      success: true,
      count: results.length,
      students: results,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Error fetching blocked students",
    });
  }
};