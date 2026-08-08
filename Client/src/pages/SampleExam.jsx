import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Calculator from "../components/Calculator";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const SampleExam = () => {
  const { id } = useParams();

  const [quiz, setQuiz] =
    useState(null);

  const [questions, setQuestions] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(0);

  const [currentQ, setCurrentQ] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [showCalc, setShowCalc] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ================= CODING =================
  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] =
    useState("");

  const [output, setOutput] =
    useState([]);

  const [compiling, setCompiling] =
    useState(false);

  const timerRef = useRef(null);

  // ================= FETCH QUIZ =================
  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/quiz/${id}`
      );

      const data = res.data;

      setQuiz(data);

      setQuestions(
        data.questions || []
      );

      setTimeLeft(
        (data.duration || 1) * 60
      );
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= TIMER =================
  useEffect(() => {
    if (!quiz || submitted)
      return;

    timerRef.current =
      setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(
              timerRef.current
            );

            handleSubmit();

            return 0;
          }

          return prev - 1;
        });
      }, 1000);

    return () =>
      clearInterval(
        timerRef.current
      );
  }, [quiz, submitted]);

  // ================= CURRENT QUESTION =================
  const currentQuestion =
    questions[currentQ];

  const q =
    currentQuestion?.questionId ||
    currentQuestion;

  // ================= LOAD STARTER CODE =================
  useEffect(() => {
    if (
      q?.starterCode &&
      typeof q.starterCode ===
        "object"
    ) {
      setCode(
        q.starterCode[
          language
        ] || ""
      );
    }
  }, [currentQ, language, q]);

  // ================= ANSWER =================
const handleAnswer = (
  value
) => {
  if (!q) return;

  setAnswers((prev) => {
    // ================= MULTIPLE =================
    if (
      q.type === "multiple"
    ) {
      const val =
        Number(value);

      const existing =
        prev[q?._id] || [];

      return existing.includes(
        val
      )
        ? {
            ...prev,
            [q?._id]:
              existing.filter(
                (v) =>
                  v !== val
              ),
          }
        : {
            ...prev,
            [q?._id]: [
              ...existing,
              val,
            ],
          };
    }

    // ================= SINGLE =================
    if (
      q.type === "single"
    ) {
      return {
        ...prev,
        [q?._id]:
          Number(value),
      };
    }

    // ================= OTHERS =================
    return {
      ...prev,
      [q?._id]: value,
    };
  });
};

// ================= SUBMIT =================
const handleSubmit = () => {
  if (submitted) return;

  clearInterval(
    timerRef.current
  );

  let score = 0;

  let totalMarks = 0;

  questions.forEach(
    (item) => {
      const q =
        item?.questionId ||
        item;

      const userAnswer =
        answers[q._id];

      const marks =
        Number(item.marks) ||
        1;

      totalMarks += marks;

      // ================= SINGLE =================
      if (
        q.type === "single"
      ) {
        const selectedAnswer =
          userAnswer;

        const correctAnswer =
          Number(
            q.correctAnswer
          );

        const correct =
          selectedAnswer ===
          correctAnswer;

        if (correct) {
          score += marks;
        }
      }

      // ================= MULTIPLE =================
      else if (
        q.type === "multiple"
      ) {
        const correct =
          (
            q.correctAnswers ||
            []
          ).map(Number);

        const user = (
          userAnswer || []
        ).map(Number);

        const same =
          correct.length ===
            user.length &&
          correct.every((v) =>
            user.includes(v)
          );

        if (same) {
          score += marks;
        }
      }

      // ================= BOOLEAN =================
      else if (
        q.type === "boolean"
      ) {
        if (
          userAnswer ===
          q.correctAnswer
        ) {
          score += marks;
        }
      }

      // ================= FILL =================
      else if (
        q.type === "fill"
      ) {
        const correct =
          (
            q.correctAnswer ||
            ""
          )
            .toString()
            .trim()
            .toLowerCase();

        const user =
          (
            userAnswer || ""
          )
            .toString()
            .trim()
            .toLowerCase();

        if (correct === user) {
          score += marks;
        }
      }

      // ================= CODING =================
      else if (
        q.type === "coding"
      ) {
        const codingAnswer =
          userAnswer;

        if (
          codingAnswer &&
          codingAnswer.code &&
          codingAnswer.code.trim() !==
            ""
        ) {
          score += marks;
        }
      }
    }
  );

  const percentage =
    totalMarks > 0
      ? (
          (score /
            totalMarks) *
          100
        ).toFixed(2)
      : 0;

  setResult({
    score,
    totalMarks,
    percentage,
  });

  setSubmitted(true);
};

  

  // ================= FORMAT TIME =================
  const formatTime = (
    sec
  ) => {
    const m = Math.floor(
      sec / 60
    );

    const s = sec % 60;

    return `${m}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  // ================= RESULT =================
  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* RESULT HEADER */}
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center mb-8">

            <h1 className="text-4xl font-bold text-green-600">
              Your Score
            </h1>

            <p className="mt-5 text-2xl">
              Score:
              <span className="font-bold">
                {" "}
                {result.score}/
                {
                  result.totalMarks
                }
              </span>
            </p>

            <p className="mt-2 text-xl">
              Percentage:
              <span className="font-bold">
                {" "}
                {
                  result.percentage
                }
                %
              </span>
            </p>
          </div>

          {/* QUESTIONS REVIEW */}
          <div className="space-y-6">

            {questions.map(
              (
                item,
                index
              ) => {
                const q =
                  item?.questionId ||
                  item;

                const userAnswer =
                  answers[q._id];

                let correct =
                  false;

                let correctAnswerText =
                  "";

                let userAnswerText =
                  "";

                // ================= SINGLE =================
                if (
                  q.type ===
                  "single"
                ) {
                  const selectedAnswer =
                    Number(
                      userAnswer
                    );

                  const correctAnswer =
                    Number(
                      q.correctAnswer
                    );

                  correct =
                    selectedAnswer ===
                    correctAnswer;

                  correctAnswerText =
                    q.options?.[
                      correctAnswer
                    ]?.text ||
                    "";

                  userAnswerText =
                    q.options?.[
                      selectedAnswer
                    ]?.text ||
                    "Not Answered";
                }

                // ================= MULTIPLE =================
                else if (
                  q.type ===
                  "multiple"
                ) {
                  const correctAnswers =
                    q.correctAnswers ||
                    [];

                  const userAnswers =
                    userAnswer ||
                    [];

                  correct =
                    correctAnswers.length ===
                      userAnswers.length &&
                    correctAnswers.every(
                      (v) =>
                        userAnswers.includes(
                          v
                        )
                    );

                  correctAnswerText =
                    correctAnswers
                      .map(
                        (i) =>
                          q.options?.[
                            i
                          ]?.text
                      )
                      .join(", ");

                  userAnswerText =
                    userAnswers.length >
                    0
                      ? userAnswers
                          .map(
                            (i) =>
                              q.options?.[
                                i
                              ]?.text
                          )
                          .join(", ")
                      : "Not Answered";
                }

                // ================= BOOLEAN =================
                else if (
                  q.type ===
                  "boolean"
                ) {
                  correct =
                    userAnswer ===
                    q.correctAnswer;

                  correctAnswerText =
                    q.correctAnswer
                      ? "True"
                      : "False";

                  userAnswerText =
                    userAnswer ===
                    undefined
                      ? "Not Answered"
                      : userAnswer
                      ? "True"
                      : "False";
                }

                // ================= FILL =================
                else if (
                  q.type ===
                  "fill"
                ) {
                  const correctAns =
                    (
                      q.correctAnswer ||
                      ""
                    )
                      .toString()
                      .trim()
                      .toLowerCase();

                  const userAns =
                    (
                      userAnswer ||
                      ""
                    )
                      .toString()
                      .trim()
                      .toLowerCase();

                  correct =
                    correctAns ===
                    userAns;

                  correctAnswerText =
                    q.correctAnswer;

                  userAnswerText =
                    userAnswer ||
                    "Not Answered";
                }

                return (
                  <div
                    key={index}
                    className={`bg-white p-6 rounded-2xl shadow border-l-8 ${
                      correct
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  >

                    <div className="flex justify-between items-start">

                      <div>
                        <h2 className="text-xl font-bold">
                          Q
                          {index + 1}
                          .{" "}
                          {q.question ||
                            q.title}
                        </h2>

                        <p className="text-sm text-blue-600 font-semibold mt-1">
                          Marks:{" "}
                          {item?.marks ||
                            1}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold ${
                          correct
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {correct
                          ? "Correct"
                          : "Wrong"}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    {q.description && (
                      <div className="mt-3 bg-gray-100 p-4 rounded-xl whitespace-pre-wrap">
                        {
                          q.description
                        }
                      </div>
                    )}

                    {/* USER ANSWER */}
                    <div className="mt-5">
                      <p className="font-semibold text-gray-700">
                        Your Answer:
                      </p>

                      <div className="mt-1 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        {
                          userAnswerText
                        }
                      </div>
                    </div>

                    {/* CORRECT ANSWER */}
                    <div className="mt-4">
                      <p className="font-semibold text-gray-700">
                        Correct Answer:
                      </p>

                      <div className="mt-1 bg-green-50 border border-green-200 p-3 rounded-lg">
                        {
                          correctAnswerText
                        }
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* LEFT */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">

          <div>
            <h2 className="text-2xl font-bold">
              {quiz?.title}
            </h2>

            <p className="text-gray-500">
              Question{" "}
              {currentQ + 1} of{" "}
              {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setShowCalc(
                  !showCalc
                )
              }
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              {showCalc
                ? "Hide Calculator"
                : "Calculator"}
            </button>

            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-lg">
              ⏱{" "}
              {formatTime(
                timeLeft
              )}
            </div>
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">

          {/* QUESTION */}
          <h3 className="text-xl font-semibold mb-4">
            Q{currentQ + 1}.{" "}
            {q?.question ||
              q?.title}
          </h3>

          <p className="text-sm text-blue-600 font-semibold mb-3">
            Marks:{" "}
            {currentQuestion?.marks ||
              1}
          </p>

          {/* DESCRIPTION */}
          {q?.description && (
            <div className="bg-gray-100 p-4 rounded-xl mb-4 whitespace-pre-wrap">
              {q.description}
            </div>
          )}

          {/* IMAGE */}
          {q?.image && (
            <img
              src={
                q.image.startsWith(
                  "http"
                )
                  ? q.image
                  : `http://localhost:5002/${q.image.replace(
                      /^\/+/,
                      ""
                    )}`
              }
              alt="question"
              className="max-h-72 rounded-lg mb-5 object-contain"
            />
          )}

          {/* ================= SINGLE / MULTIPLE ================= */}
          {[
            "single",
            "multiple",
          ].includes(q?.type) && (
            <div className="space-y-3">

              {q?.options?.map(
                (opt, i) => {
                  const value =
  answers[q?._id];

const selected =
  q?.type ===
  "multiple"
    ? (value || []).includes(i)
    : Number(value) === i;

                  return (
                    <div
                      key={i}
                      onClick={() =>
                        handleAnswer(
                          i
                        )
                      }
                      className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 ${
                        selected
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >

                      {opt?.image && (
                        <img
                          src={
                            opt.image.startsWith(
                              "http"
                            )
                              ? opt.image
                              : `http://localhost:5002/${opt.image.replace(
                                  /^\/+/,
                                  ""
                                )}`
                          }
                          alt="option"
                          className="h-16 rounded"
                        />
                      )}

                      <span className="font-medium">
                        {String.fromCharCode(
                          65 + i
                        )}
                        .{" "}
                        {opt?.text}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* ================= BOOLEAN ================= */}
          {q?.type ===
            "boolean" && (
            <div className="space-y-3">

              {[
                "True",
                "False",
              ].map(
                (val, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleAnswer(
                        val ===
                          "True"
                      )
                    }
                    className={`p-4 border rounded-xl cursor-pointer ${
                      answers[
                        q?._id
                      ] ===
                      (val ===
                        "True")
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {val}
                  </div>
                )
              )}
            </div>
          )}

          {/* ================= FILL ================= */}
          {q?.type ===
            "fill" && (
            <input
              type="text"
              placeholder="Enter Answer"
              value={
                answers[
                  q?._id
                ] || ""
              }
              onChange={(e) =>
                handleAnswer(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            />
          )}

          {/* ================= CODING ================= */}
          {q?.type === "coding" && (
            <div className="mt-6">

              <div className="flex justify-between items-center mb-4">

                <h4 className="font-bold text-xl">
                  Coding Question
                </h4>

                <div className="flex gap-3">

                  <select
                    value={
                      language
                    }
                    onChange={(
                      e
                    ) => {
                      setLanguage(
                        e.target.value
                      );

                      setCode(
                        q?.starterCode?.[
                          e.target
                            .value
                        ] || ""
                      );
                    }}
                    className="border p-2 rounded-lg"
                  >
                    <option value="javascript">
                      JavaScript
                    </option>

                    <option value="python">
                      Python
                    </option>

                    <option value="java">
                      Java
                    </option>

                    <option value="cpp">
                      C++
                    </option>

                    <option value="c">
                      C
                    </option>
                  </select>

                  <button
                    disabled={
                      compiling
                    }
                    onClick={async () => {
                      try {
                        setCompiling(
                          true
                        );

                        const results =
                          [];

                        for (
                          let tc of q.testCases
                        ) {
                          const res =
                            await axios.post(
                              `${API}/run-code`,
                              {
                                language,
                                code,
                                input:
                                  tc.input,
                              }
                            );

                          const result =
                            res.data
                              .output || "";

                          results.push({
                            input:
                              tc.input,
                            expected:
                              tc.output,
                            result,
                            pass:
                              result.trim() ===
                              tc.output.trim(),
                          });
                        }

                        setOutput(
                          results
                        );
                      } catch (
                        err
                      ) {
                        console.error(
                          err
                        );

                        setOutput([]);
                      } finally {
                        setCompiling(
                          false
                        );
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    {compiling
                      ? "Running..."
                      : "Compile"}
                  </button>
                </div>
              </div>

              {/* CODE EDITOR */}
              <textarea
                rows={18}
                value={code}
                onChange={(
                  e
                ) => {
                  setCode(
                    e.target.value
                  );

                  setAnswers(
                    (
                      prev
                    ) => ({
                      ...prev,
                      [q?._id]:
                        {
                          language,
                          code:
                            e.target
                              .value,
                        },
                    })
                  );
                }}
                className="w-full border rounded-xl p-4 bg-black text-green-400 font-mono text-sm"
              />

              {/* OUTPUT */}
              <div className="mt-5">

                <h4 className="font-bold mb-2">
                  Output
                </h4>

                <div className="bg-black text-green-400 p-4 rounded-xl min-h-[120px]">

                  {output.length ===
                  0 ? (
                    <p>
                      No output yet
                    </p>
                  ) : (
                    output.map(
                      (
                        res,
                        i
                      ) => (
                        <div
                          key={i}
                          className="mb-3 border-b pb-2"
                        >
                          <p>
                            Test Case{" "}
                            {i + 1}
                          </p>

                          <p>
                            Input:{" "}
                            {
                              res.input
                            }
                          </p>

                          <p>
                            Expected:{" "}
                            {
                              res.expected
                            }
                          </p>

                          <p>
                            Output:{" "}
                            {
                              res.result
                            }
                          </p>

                          <p
                            className={
                              res.pass
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {res.pass
                              ? "Passed"
                              : "Failed"}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between mt-8">

            <button
              disabled={
                currentQ === 0
              }
              onClick={() =>
                setCurrentQ(
                  (p) =>
                    p - 1
                )
              }
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              ← Previous
            </button>

            {currentQ <
            questions.length -
              1 ? (
              <button
                onClick={() =>
                  setCurrentQ(
                    (p) =>
                      p + 1
                  )
                }
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={
                  handleSubmit
                }
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 bg-white border-l p-5 overflow-y-auto">

        <h3 className="font-bold text-lg mb-4">
          Questions
        </h3>

        <div className="grid grid-cols-4 gap-3">

          {questions.map(
            (
              item,
              index
            ) => {
              const qid =
                item?.questionId
                  ?._id ||
                item?._id;

              const value =
                answers[qid];

              const answered =
                value !==
                  undefined &&
                value !== "";

              return (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentQ(
                      index
                    )
                  }
                  className={`h-12 rounded-lg font-bold ${
                    currentQ ===
                    index
                      ? "bg-blue-600 text-white"
                      : answered
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* CALCULATOR */}
      {showCalc && (
        <div className="fixed bottom-5 right-5 z-50">
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default SampleExam;