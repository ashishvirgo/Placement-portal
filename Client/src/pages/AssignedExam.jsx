import React, {  useState,  useEffect,  useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calculator from "../components/Calculator";
const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";
const back_API = import.meta.env.VITE_BACK_API ||
  "http://localhost:5002/";;
const AssignedExam = () => {
  const { id } = useParams();
    const [violations, setViolations] = useState(0);
const MAX_VIOLATIONS = 5;
const [blocked, setBlocked] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [attemptId, setAttemptId] = useState("");
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
  // ================= CODING =================
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [compiling, setCompiling] = useState(false);
  const timerRef = useRef(null);
  const submittingRef = useRef(false);
const violationCooldown = useRef(0);
 useEffect(() => {
  let savedAttemptId =
    localStorage.getItem(`attempt_${id}`);

  if (!savedAttemptId) {
    savedAttemptId =
      Date.now().toString() +
      Math.random()
        .toString(36)
        .substring(2, 10);

    localStorage.setItem(
      `attempt_${id}`,
      savedAttemptId
    );
  }

  setAttemptId(savedAttemptId);
}, [id]);


  // ================= FETCH QUIZ =================
  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${API}/quiz/${id}`);
    const data = res.data;
    setQuiz(data);
    setQuestions(data.questions || []);
    const saved =
      localStorage.getItem(`exam_state_${id}`);
    if (saved) {
      const state =JSON.parse(saved);
      setAnswers(state.answers || {});
      setCurrentQ(
  Math.min(
    state.currentQ || 0,
    (data.questions
      ?.length || 1) -
      1
  )
);

      setTimeLeft(
        state.timeLeft ||
        (data.duration || 1) * 60
      );

      setViolations(
        state.violations || 0
      );

      setLanguage(
        state.language ||
        "javascript"
      );

      setCode(
        state.code || ""
      );
    } else {
      setTimeLeft(
        (data.duration || 1) * 60
      );
    }
  } catch (err) {
    console.error(err);
    setError(
      "Failed to load quiz."
    );
  } finally {
    setLoading(false);
  }
};

// ================= REFRESH WARNING =================
useEffect(() => {
  const beforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener(
    "beforeunload",
    beforeUnload
  );

  return () =>
    window.removeEventListener(
      "beforeunload",
      beforeUnload
    );
}, []);

  // ================= TIMER =================
  useEffect(() => {
    if (!quiz || submitted)
      return;

    clearInterval(
  timerRef.current
);

timerRef.current =
  setInterval(() => {
    setTimeLeft(
      (prev) => {
        if (prev <= 1) {
          clearInterval(
            timerRef.current
          );

          handleSubmit();

          return 0;
        }

        return prev - 1;
      }
    );
  }, 1000);

    return () =>
      clearInterval(
        timerRef.current
      );

  }, [quiz, submitted]);
  

//============ Anti cheating =================
useEffect(() => {
  if (submitted || blocked) return;

  const addViolation = async (reason) => {
    const now = Date.now();

    // prevent multiple violations within 3 seconds
    if (now - violationCooldown.current < 3000)
      return;

    violationCooldown.current = now;

    setViolations((prev) => {
      const count = prev + 1;

      console.log("Violation:",reason, count );

      // Block student after max violations
      if (count >= MAX_VIOLATIONS) {
        setBlocked(true);

        clearInterval(timerRef.current);

        axios.post(`${API}/quiz/block`,
            {
              quizId: id,
              attemptId,
              reason,
              violations: count,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .catch(console.error);
      }
      localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem(`exam_state_${id}`);
  localStorage.removeItem(`attempt_${id}`);
  localStorage.setItem(`blocked_${id}`, "true");

  // Redirect to login
  window.location.replace("/");
      return count;
    });
  };

  // Tab switch
  const handleVisibility = () => {
    if (document.hidden) {
      addViolation("tab_switch");
    }
  };

  // Alt+Tab / minimize
  const handleBlur = () => {
    addViolation("window_blur");
  };

  // Exit fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      addViolation("fullscreen_exit");
    }
  };

  // Prevent actions
  const prevent = (e) => {
    e.preventDefault();
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    if (
      e.key === "F12" ||
      (e.ctrlKey &&
        ["c", "v", "x", "u", "s", "a"].includes(
          key
        )) ||
      (e.ctrlKey && e.shiftKey)
    ) {
      e.preventDefault();
      addViolation("shortcut");
    }
  };

  // DevTools detection
  const devtoolInterval = setInterval(() => {
    const width =
      window.outerWidth -
      window.innerWidth;

    const height =
      window.outerHeight -
      window.innerHeight;

    if (width > 250 || height > 250) {
      addViolation("devtools");
    }
  }, 3000);

  // Register events
  document.addEventListener(
    "visibilitychange",
    handleVisibility
  );

  window.addEventListener("blur",handleBlur);

  document.addEventListener(
    "fullscreenchange",
    handleFullscreen
  );

  document.addEventListener(
    "contextmenu",
    prevent
  );

  document.addEventListener(
    "copy",
    prevent
  );

  document.addEventListener(
    "paste",
    prevent
  );

  document.addEventListener(
    "cut",
    prevent
  );

  document.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    clearInterval(devtoolInterval);

    document.removeEventListener(
      "visibilitychange",
      handleVisibility
    );

    window.removeEventListener(
      "blur",
      handleBlur
    );

    document.removeEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    document.removeEventListener(
      "contextmenu",
      prevent
    );

    document.removeEventListener(
      "copy",
      prevent
    );

    document.removeEventListener(
      "paste",
      prevent
    );

    document.removeEventListener(
      "cut",
      prevent
    );

    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [
  submitted,
  blocked,
  id,
  attemptId,
]);

// ================= SAVE EXAM STATE =================
useEffect(() => {
  const isBlocked =
    localStorage.getItem(
      `blocked_${id}`
    );

  if (isBlocked === "true") {
    setBlocked(true);
  }
}, [id]);

useEffect(() => {
  if (
    !quiz ||
    submitted
  )
    return;

  const timeout =
    setTimeout(() => {
      localStorage.setItem(`exam_state_${id}`,
        JSON.stringify({
          answers,
          currentQ,
          timeLeft,
          violations,
          language,
          code,
        })
      );
    }, 500);

  return () =>
    clearTimeout(
      timeout
    );
}, [
  answers,
  currentQ,
  timeLeft,
  violations,
  language,
  code,
  quiz,
  submitted,
]);
  // ================= CURRENT QUESTION =================
  const currentQuestion =
    questions[currentQ];

 const q =
  currentQuestion
    ?.questionId ??
  currentQuestion ??
  null;
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
  }, [currentQ, language]);

  // ================= ANSWER =================
  const handleAnswer = (
    value
  ) => {
    if (!q) return;

    setAnswers((prev) => {

      if (
        q.type === "multiple"
      ) {
        const existing =
          prev[q?._id] || [];

        return existing.includes(
          value
        )
          ? {
            ...prev,
            [q?._id]:
              existing.filter(
                (v) =>
                  v !== value
              )
          }
          : {
            ...prev,
            [q?._id]: [
              ...existing,
              value
            ]
          };
      }

      return {
        ...prev,
        [q?._id]: value
      };
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (autoSubmitted = false) => {
  if (submittingRef.current || submitted) return;

  submittingRef.current = true;

  try {
    clearInterval(timerRef.current);

    const token = localStorage.getItem("token");

    const attemptId = localStorage.getItem(
      `attempt_${id}`
    );

    const res = await axios.post(
      `${API}/quiz/submit`,
      {
        quizId: id,
        attemptId,
        answers,
        autoSubmitted, // <-- send to backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem(`attempt_${id}`);
    localStorage.removeItem(`exam_state_${id}`);
    localStorage.removeItem(`blocked_${id}`);

    setResult(res.data);
    setSubmitted(true);

  } catch (err) {
    submittingRef.current = false;

    console.error(err.response?.data || err);

    setError(
      err.response?.data?.message ||
      "Submission failed"
    );
  }
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
  //=======for blocked user===========
  if (blocked) {
  return (
    <div className="h-screen flex justify-center items-center bg-red-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

        <h1 className="text-4xl font-bold text-red-600">
          Exam Blocked
        </h1>

        <p className="mt-5 text-lg">
          You exceeded the allowed
          number of violations.
        </p>

        <p className="mt-2 text-gray-500">
          Please contact the administrator
          to unblock your exam.
        </p>

        <div className="mt-5 font-bold">
          Attempt ID:
          {attemptId}
        </div>

      </div>
    </div>
  );
}
  // ================= RESULT =================
  if (submitted && result) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">

          <h1 className="text-4xl font-bold text-green-600">
            Exam Submitted Successfully
          </h1>

          {/* <p className="mt-5 text-2xl">
            Score:
            <span className="font-bold">
              {" "}
              {result.score}/
              {result.total}
            </span>
          </p>

          <p className="mt-2 text-xl">
            Percentage:
            <span className="font-bold">
              {" "}
              {result.percentage}%
            </span>
          </p> */}

        </div>
      </div>
    );
  }

  return (
   <div className="h-screen bg-gray-100 flex flex-col">

       {/* FULL WIDTH HEADER */}
  <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div>
      <h2 className="text-2xl font-bold">
        {quiz?.title}
      </h2>
      <h3 className="text-sm text-gray-500">
  Attempt ID:
  <span className="font-semibold text-black ml-2">
    {attemptId}
  </span>
</h3>
      
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowCalc(!showCalc)}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        {showCalc ? "Hide Calculator" : "Calculator"}
      </button>
      <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-bold">
  Violations: {violations}/{MAX_VIOLATIONS}
</div>
      <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-lg">
        ⏱ {formatTime(timeLeft)}
      </div>

      <button
        onClick={() => setShowSubmitModal(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
      >
        Submit Exam
      </button>
    </div>
  </div>
 <div className="flex flex-1 overflow-hidden">
  {/* LEFT */}
    <div className="flex-1 p-6">
        {/* QUESTION CARD */}
        <div className="bg-white p-6 rounded-2xl shadow">
         <p className="text-gray-500">
        Question {currentQ + 1} of {questions.length}
      </p>
          {/* QUESTION */}
          <h3 className="text-xl font-semibold mb-4">
            Q{currentQ + 1}.{" "}
            {q?.question ||
              q?.title}
          </h3>

          {/* DESCRIPTION */}
          {q?.description && (
            <div className="bg-gray-100 p-4 rounded-xl mb-4 whitespace-pre-wrap">
              {q.description}
            </div>
          )}
         <div className="bg-white p-6 rounded-2xl shadow max-h-[350px] overflow-y-auto">
          {/* IMAGE */}
          {q?.image && (
            <img
              src={
                q.image.startsWith("http")
                  ? q.image
                  : `${back_API}${q.image.replace(
                    /^\/+/,
                    ""
                  )}`
              }
              alt="question"
              className="max-h-72 rounded-lg mb-5 object-contain"
            />
          )}
         </div>
          {/* ================= MCQ ================= */}
          {[
            "single",
            "multiple"
          ].includes(
            q?.type
          ) && (
              // <div className="space-y-3">
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {q?.options?.map(
                  (
                    opt,
                    i
                  ) => {

                    const selected =
                      q?.type ===
                        "multiple"
                        ? (
                          answers[
                          q?._id
                          ] || []
                        ).includes(i)
                        : answers[
                        q?._id
                        ] === i;

                    return (
                      <div
                        key={i}
                        onClick={() =>
                          handleAnswer(i)
                        }
                        className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 ${selected
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                          }`}
                      >

                        {opt?.image && (
                          <img
                            src={
                              opt.image.startsWith("http")
                                ? opt.image
                                : `${back_API}}/${opt.image.replace(
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
                          . {opt?.text}
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
                  "False"
                ].map(
                  (
                    val,
                    i
                  ) => (
                    <div
                      key={i}
                      onClick={() =>
                        handleAnswer(
                          val ===
                          "True"
                        )
                      }
                      className={`p-4 border rounded-xl cursor-pointer ${answers[
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
          {q?.testCases && (
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
                        e.target.value
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
                                  tc.input
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
                              result
                                .trim() ===
                              tc.output.trim()
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
                            .value
                      }
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
          {/* NAVIGATION */}
          <div className="flex justify-between items-center mt-8">

            {/* Previous & Next */}
            <div className="flex justify-between w-full">
              <button
                disabled={currentQ === 0}
                onClick={() =>
                  setCurrentQ((p) => p - 1)
                }
                className="bg-gray-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                ← Previous
              </button>

              {currentQ <
                questions.length - 1 && (
                  <button
                    onClick={() =>
                      setCurrentQ((p) => p + 1)
                    }
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    Next →
                  </button>
                )}
            </div>

            

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

              const answered =
                answers[qid] !==
                undefined;

              return (
                <button
                  key={
                    index
                  }
                  onClick={() =>
                    setCurrentQ(
                      index
                    )
                  }
                  className={`h-12 rounded-lg font-bold ${currentQ ===
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
</div>
      {/* CALCULATOR */}
      {showCalc && (
        <div className="fixed bottom-5 right-5 z-50">
          <Calculator />
        </div>
      )}
      {/* model */}
      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6">

            <div className="text-center">

              <div className="text-6xl mb-3">
                ⚠️
              </div>

              <h2 className="text-2xl font-bold text-red-600 mb-3">
                Submit Exam?
              </h2>

              <p className="text-gray-600 mb-6">
                Are you sure you want to
                submit your exam?
                <br />
                <span className="font-semibold text-red-500">
                  You will not be able to
                  change your answers after
                  submission.
                </span>
              </p>

            </div>

            <div className="flex justify-center gap-4">

              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
  disabled={
    submittingRef.current
  }
  onClick={() => {
    setShowSubmitModal(false);
    handleSubmit();
  }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold"
              >
                Yes, Submit
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default AssignedExam;