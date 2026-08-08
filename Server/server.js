import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import DBConnect from './config/db.js';
import subjectRoutes from './routes/subjectRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import quizRoutes from "./routes/quizRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
dotenv.config();
const port=process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());
DBConnect();
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/subjects', subjectRoutes)
app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/coding-questions", codingRoutes);
app.post('/api/run-code', async (req, res) => {
  const { code, language, input } = req.body;

  try {
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      {
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        script: code,
        language: language === "python" ? "python3" : language,
        versionIndex: "0",
        stdin: input || ""
      }
    );

    res.json({
      output: response.data.output
    });

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data || "Execution failed"
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});