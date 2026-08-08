import Question from "../model/Question.js";

// ================= ADD QUESTION =================

export const addQuestion = async (req, res) => {
  try {
    let {
      subject,
      topic,
      subtopic,
      question,
      type,
      options,
      correctAnswer,
      difficulty
    } = req.body;

    // ✅ Parse JSON (VERY IMPORTANT for FormData)
    if (options) options = JSON.parse(options);
    if (correctAnswer) correctAnswer = JSON.parse(correctAnswer);

    // ================= IMAGE =================
    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // ================= VALIDATION =================
    if (!subject || !topic || !subtopic || !question || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (["single", "multiple"].includes(type)) {
      if (!options || options.length < 2) {
        return res.status(400).json({
          message: "At least 2 options required"
        });
      }
    }

    if (type === "single" && typeof correctAnswer !== "number") {
      return res.status(400).json({
        message: "Single answer must be index (number)"
      });
    }

    if (type === "multiple" && !Array.isArray(correctAnswer)) {
      return res.status(400).json({
        message: "Multiple answers must be array"
      });
    }

    if (type === "boolean" && typeof correctAnswer !== "boolean") {
      return res.status(400).json({
        message: "Boolean must be true/false"
      });
    }

    if (type === "fill" && typeof correctAnswer !== "string") {
      return res.status(400).json({
        message: "Fill must be text"
      });
    }

    // ================= SAVE =================
    const newQuestion = new Question({
      subject,
      topic,
      subtopic,
      question,
      type,
      options,
      correctAnswer,
      difficulty,
      image
    });

    await newQuestion.save();

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding question" });
  }
};

// export const updateQuestion = async (req, res) => {
//   try {
//     let data = req.body;

//     if (data.options) data.options = JSON.parse(data.options);
//     if (data.correctAnswer) data.correctAnswer = JSON.parse(data.correctAnswer);

//     if (req.file) {
//       data.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await Question.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Question not found" });
//     }

//     res.json({ message: "Question updated", question: updated });

//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };
// ================= GET QUESTIONS =================
export const getQuestions1 = async (req, res) => {
  try {
    const {
      subject,
      difficulty,
      topic,
      subtopic,
      search,
      page = 1,
      limit = 10
    } = req.query;
  console.log(subject);
  console.log(topic);
  console.log(difficulty);
    let filter = {};

    if (subject) filter.subject=subject;
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (subtopic) filter.subtopic = subtopic;

    // Text search
    if (search) {
      filter.$or = [
        { question: { $regex: search, $options: "i" } },
        { topic: { $regex: search, $options: "i" } },
        { subtopic: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [questions, total] = await Promise.all([
      Question.find(filter)
        .populate("subject","name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      Question.countDocuments(filter)
    ]);

    res.json({
      questions,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching questions" });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { subject } = req.query;

    let filter = {};

    if (subject) {
      filter.subject = subject;
    }

    const questions = await Question.find(filter)
      .populate("subject", "name");

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching questions",
    });
  }
};



//================= UPDATE QUESTION =================
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({
      message: "Question updated",
      question: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};



// ================= DELETE =================
export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};