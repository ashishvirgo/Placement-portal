import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calculator from "../components/Calculator";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

// ✅ FIX: consistent ID resolver
const getQid = (q) =>
  q?.questionId?._id || q?.questionId || q?._id;

const Exam = () => {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [showCalc, setShowCalc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // coding
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [compiling, setCompiling] = useState(false);

  const timerRef = useRef(null);
 
  // ================= FETCH QUIZ =================
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/quiz/${id}`);
      const data = res.data;

      setQuiz(data);
      setQuestions(data.questions || []);
      setTimeLeft((data.duration || 1) * 60);
    } catch (err) {
      console.error(err);
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  // ================= TIMER =================
  useEffect(() => {
    if (!quiz || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz, submitted]);

  const currentQuestion = questions[currentQ];
  const q = currentQuestion?.questionId || currentQuestion;

  // ================= STARTER CODE =================
  useEffect(() => {
    if (q?.starterCode && typeof q.starterCode === "object") {
      setCode(q.starterCode[language] || "");
    }
  }, [currentQ, language]);

  // ================= ANSWER =================
  const handleAnswer = (value) => {
    if (!q) return;

    const qid = getQid(q);

    setAnswers((prev) => {
      if (q.type === "multiple") {
        const existing = prev[qid] || [];

        return existing.includes(value)
          ? {
              ...prev,
              [qid]: existing.filter((v) => v !== value),
            }
          : {
              ...prev,
              [qid]: [...existing, value],
            };
      }

      return {
        ...prev,
        [qid]: value,
      };
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      clearInterval(timerRef.current);
       const token = localStorage.getItem("token");
       console.log("token=",token)
      const res = await axios.post(`${API}/quiz/submit`, {
        quizId: id,
        answers,
      },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    );

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
      setError("Submission failed");
    }
  };

  // ================= TIME =================
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  // ================= RESULT =================
  if (submitted && result) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h1 className="text-3xl font-bold text-green-600">
            Exam Submitted 
          </h1>

          <p className="mt-4 text-xl">
            Score: {result.score}/{result.total}
          </p>

          <p className="text-lg">
            Percentage: {result.percentage}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* LEFT */}
      <div className="flex-1 p-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold">{quiz?.title}</h2>
            <p className="text-gray-500">
              Question {currentQ + 1} of {questions.length}
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Calculator
            </button>

            <div className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold">
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* QUESTION */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-xl font-semibold mb-4">
            Q{currentQ + 1}. {q?.question || q?.title}
          </h3>

          {/* OPTIONS */}
          {["single", "multiple"].includes(q?.type) && (
            <div className="space-y-3">
              {q?.options?.map((opt, i) => {
                const qid = getQid(q);

                const selected =
                  q.type === "multiple"
                    ? (answers[qid] || []).includes(i)
                    : answers[qid] === i;

                return (
                  <div
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`p-4 border rounded cursor-pointer ${
                      selected ? "bg-blue-100 border-blue-500" : ""
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt?.text}
                  </div>
                );
              })}
            </div>
          )}

          {/* BOOLEAN */}
          {q?.type === "boolean" && (
            <div className="space-y-3">
              {["True", "False"].map((val) => {
                const qid = getQid(q);

                return (
                  <div
                    key={val}
                    onClick={() => handleAnswer(val === "True")}
                    className={`p-4 border rounded cursor-pointer ${
                      answers[qid] === (val === "True")
                        ? "bg-blue-100 border-blue-500"
                        : ""
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          )}

          {/* FILL */}
          {q?.type === "fill" && (
            <input
              className="w-full border p-3 rounded mt-3"
              value={answers[getQid(q)] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}

          {/* NAV */}
          <div className="flex justify-between mt-6">
            <button
              disabled={currentQ === 0}
              onClick={() => setCurrentQ((p) => p - 1)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Prev
            </button>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((p) => p + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-72 bg-white border-l p-4">
        <h3 className="font-bold mb-3">Questions</h3>

        <div className="grid grid-cols-4 gap-2">
          {questions.map((item, i) => {
            const qid =
              item?.questionId?._id || item?.questionId || item?._id;

            const answered = answers[qid] !== undefined;

            return (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`p-2 rounded ${
                  currentQ === i
                    ? "bg-blue-600 text-white"
                    : answered
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* CALCULATOR */}
      {showCalc && (
        <div className="fixed bottom-4 right-4">
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default Exam;