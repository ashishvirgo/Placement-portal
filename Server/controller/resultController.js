// controller/resultController.js

import Result from "../model/Result.js";

export const getMyResults = async (req, res) => {
  try {
    const studentId = req.user.id;

    const results = await Result.find({
      student: studentId,
    })
      .populate("quiz", "title subject duration")
      .sort({ submittedAt: -1 });

    res.json(results);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching results",
    });
  }
};


export const getQuizWiseResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email")
      .populate(
        "quiz",
        "title duration passingMarks totalMarks"
      )
      .sort({
        submittedAt: -1,
      });

    const groupedResults = {};

    results.forEach((result) => {
      const quizName =
        result.quiz?.title || "Unknown Quiz";

      const date = new Date(
        result.submittedAt
      ).toLocaleDateString("en-IN");

      if (!groupedResults[quizName]) {
        groupedResults[quizName] = {};
      }

      if (!groupedResults[quizName][date]) {
        groupedResults[quizName][date] = [];
      }

      groupedResults[quizName][date].push({
        _id: result._id,
        student:
          result.student?.name ||
          "Anonymous",
        email:
          result.student?.email || "",
        score: result.score,
        total: result.total,
        percentage:
          result.percentage,
        status: result.status,
        submittedAt:
          result.submittedAt,
        timeTaken:
          result.timeTaken,
        tabSwitchCount:
          result.tabSwitchCount,
        autoSubmitted:
          result.autoSubmitted,
      });
    });

    res.status(200).json(
      groupedResults
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch results",
    });
  }
};
// GET /api/result/quiz/:quizId?date=2026-07-03
export const getResultsByQuizAndDate =
  async (req, res) => {
    try {
      const { quizId } =
        req.params;

      const { date } =
        req.query;

      if (!quizId) {
        return res
          .status(400)
          .json({
            message:
              "Quiz ID is required",
          });
      }

      const filter = {
        quiz: quizId,
      };

      // Filter by date if provided
      if (date) {
        const start =
          new Date(date);

        const end =
          new Date(date);

        end.setDate(
          end.getDate() + 1
        );

        filter.submittedAt =
          {
            $gte: start,
            $lt: end,
          };
      }

      const results =
        await Result.find(
          filter
        )
          .populate(
            "student",
            "name email"
          )
          .populate(
            "quiz",
            "title duration passingMarks totalMarks"
          )
          .sort({
            score: -1,
            submittedAt:
              -1,
          });

      const formatted =
        results.map(
          (
            result
          ) => ({
            _id:
              result._id,

            student: {
              name:
                result
                  .student
                  ?.name ||
                "Anonymous",

              email:
                result
                  .student
                  ?.email ||
                "",
            },

            quiz:
              result
                .quiz
                ?.title,

            score:
              result.score,

            total:
              result.total,

            percentage:
              result.percentage,

            status:
              result.status,

            submittedAt:
              result.submittedAt,

            timeTaken:
              result.timeTaken,

            tabSwitchCount:
              result.tabSwitchCount ||
              0,

            autoSubmitted:
              result.autoSubmitted ||
              false,
          })
        );

      res.status(200).json(
        formatted
      );

    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch results",
      });
    }
  };