import CodingQuestion from "../model/CodingQuestion.js";

export const addCodingQuestion = async (req, res) => {
  try {
    const question = new CodingQuestion(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCodingQuestions = async (req, res) => {
  try {
    const questions = await CodingQuestion.find()
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};