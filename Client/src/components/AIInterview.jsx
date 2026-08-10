
import React, { useEffect, useMemo, useState } from "react";

import {
  FiMic,
  FiVideo,
  FiPlay,
  FiPause,
  FiSend,
  FiClock,
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronRight,
  FiCode,
  FiUser,
  FiBriefcase,
  FiBarChart2,
  FiRefreshCw,
  FiVolume2,
} from "react-icons/fi";

const AIInterview = ({ student }) => {
  /* =====================================================
     STATE
  ===================================================== */

  const [branch, setBranch] = useState(
    student?.branch || "Computer Science & Engineering"
  );

  const [interviewType, setInterviewType] =
    useState("Technical");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [started, setStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(120);

  const [isPaused, setIsPaused] = useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const [result, setResult] = useState(null);

  /* =====================================================
     BRANCH DATA
  ===================================================== */

  const branchTopics = {
    "Computer Science & Engineering": [
      "Data Structures",
      "Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "OOP",
      "Java",
      "JavaScript",
      "React",
      "Node.js",
      "MERN Stack",
    ],

    "Information Technology": [
      "Data Structures",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Cloud Computing",
      "Java",
      "Python",
      "JavaScript",
    ],

    "CSE-AIML": [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "NLP",
      "Computer Vision",
      "Statistics",
      "TensorFlow",
    ],

    "CSE-DS": [
      "Python",
      "Statistics",
      "SQL",
      "Data Analysis",
      "Machine Learning",
      "Power BI",
      "Pandas",
      "NumPy",
    ],

    "Electronics & Communication Engineering": [
      "Digital Electronics",
      "Analog Electronics",
      "Microprocessors",
      "Microcontrollers",
      "Communication Systems",
      "Embedded Systems",
      "VLSI",
    ],

    "Electrical Engineering": [
      "Electrical Machines",
      "Power Systems",
      "Control Systems",
      "Power Electronics",
      "Network Theory",
      "Transformers",
      "Renewable Energy",
    ],

    "Mechanical Engineering": [
      "Thermodynamics",
      "Fluid Mechanics",
      "Heat Transfer",
      "Manufacturing",
      "Machine Design",
      "Engineering Mechanics",
      "CAD/CAM",
    ],

    "Civil Engineering": [
      "Structural Engineering",
      "Concrete Technology",
      "Geotechnical Engineering",
      "Surveying",
      "Transportation Engineering",
      "Environmental Engineering",
      "Construction Management",
    ],

    "Chemical Engineering": [
      "Mass Transfer",
      "Heat Transfer",
      "Fluid Mechanics",
      "Reaction Engineering",
      "Process Control",
      "Thermodynamics",
    ],
  };

  /* =====================================================
     QUESTION BANK
  ===================================================== */

  const questionBank = {
    Technical: {
      "Computer Science & Engineering": [
        "Explain the difference between an Array and a Linked List.",
        "What is normalization in DBMS and why is it required?",
        "Explain the difference between process and thread.",
        "What is the time complexity of binary search?",
        "Explain OOP concepts with real-world examples.",
      ],

      "Information Technology": [
        "Explain REST API and its advantages.",
        "What is cloud computing?",
        "Explain authentication versus authorization.",
        "What is a database index?",
        "Explain MVC architecture.",
      ],

      "CSE-AIML": [
        "What is overfitting in machine learning and how can you prevent it?",
        "Explain supervised and unsupervised learning.",
        "What is gradient descent?",
        "Explain precision, recall and F1-score.",
        "What is the difference between CNN and RNN?",
      ],

      "CSE-DS": [
        "What is the difference between SQL JOIN types?",
        "How do you handle missing data in a dataset?",
        "Explain mean, median and mode.",
        "What is data normalization?",
        "How would you identify an outlier?",
      ],

      "Electronics & Communication Engineering": [
        "Explain the working of a transistor.",
        "What is modulation and why is it required?",
        "Explain microprocessor versus microcontroller.",
        "What is a flip-flop?",
        "Explain the working of an ADC.",
      ],

      "Electrical Engineering": [
        "Explain the working principle of a transformer.",
        "What is power factor?",
        "Explain AC motor versus DC motor.",
        "What is the purpose of a circuit breaker?",
        "Explain closed-loop control systems.",
      ],

      "Mechanical Engineering": [
        "Explain the first law of thermodynamics.",
        "What is the difference between stress and strain?",
        "Explain the working of a four-stroke engine.",
        "What is CNC machining?",
        "Explain heat transfer mechanisms.",
      ],

      "Civil Engineering": [
        "What is the difference between cement and concrete?",
        "Explain the purpose of reinforcement in RCC.",
        "What is soil bearing capacity?",
        "Explain different types of foundations.",
        "What is surveying?",
      ],

      "Chemical Engineering": [
        "Explain absorption and adsorption.",
        "What is a distillation column?",
        "Explain heat exchanger operation.",
        "What is chemical reaction engineering?",
        "Explain mass transfer.",
      ],
    },

    HR: [
      "Tell me about yourself.",
      "Why should we hire you?",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in five years?",
      "Why do you want to join our company?",
    ],

    Behavioral: [
      "Tell me about a time when you worked in a team.",
      "Describe a situation where you handled failure.",
      "How do you handle pressure and deadlines?",
      "Tell me about a conflict with a teammate.",
      "Describe a situation where you showed leadership.",
    ],

    "Project Based": [
      "Explain your major academic project.",
      "What problem does your project solve?",
      "What technologies did you use?",
      "What was your contribution to the project?",
      "What challenges did you face?",
    ],
  };

  /* =====================================================
     QUESTIONS
  ===================================================== */

  const questions = useMemo(() => {
    if (interviewType === "Technical") {
      return (
        questionBank.Technical[branch] ||
        questionBank.Technical[
          "Computer Science & Engineering"
        ]
      );
    }

    return questionBank[interviewType] ||
      questionBank.HR;
  }, [interviewType, branch]);

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (
      !started ||
      isPaused ||
      showResult
    ) {
      return;
    }

    if (timeLeft <= 0) {
      submitAnswer();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(
        (previous) => previous - 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [
    started,
    isPaused,
    timeLeft,
    showResult,
  ]);

  /* =====================================================
     FORMAT TIME
  ===================================================== */

  const formatTime = (seconds) => {
    const minutes = Math.floor(
      seconds / 60
    );

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* =====================================================
     START INTERVIEW
  ===================================================== */

  const startInterview = () => {
    setStarted(true);

    setShowResult(false);

    setCurrentQuestion(0);

    setAnswers([]);

    setAnswer("");

    setTimeLeft(120);

    setIsPaused(false);
  };

  /* =====================================================
     SIMULATE AI SPEAKING
  ===================================================== */

  const speakQuestion = () => {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        questions[currentQuestion]
      );

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  };

  /* =====================================================
     VOICE ANSWER DEMO
  ===================================================== */

  const startVoiceAnswer = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setAnswer(
        (previous) =>
          `${previous} ${transcript}`.trim()
      );
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  /* =====================================================
     AI SCORE
  ===================================================== */

  const calculateScore = (
    submittedAnswers
  ) => {
    const validAnswers =
      submittedAnswers.filter(
        (item) =>
          item.answer &&
          item.answer.trim().length > 20
      ).length;

    const total =
      submittedAnswers.length || 1;

    const answerScore = Math.round(
      (validAnswers / total) * 100
    );

    const randomBonus =
      Math.floor(Math.random() * 10);

    return Math.min(
      100,
      answerScore + randomBonus
    );
  };

  /* =====================================================
     SUBMIT ANSWER
  ===================================================== */

  const submitAnswer = async () => {
    if (loading) {
      return;
    }

    const updatedAnswers = [
      ...answers,
      {
        question:
          questions[currentQuestion],

        answer: answer.trim(),

        questionNumber:
          currentQuestion + 1,
      },
    ];

    setAnswers(updatedAnswers);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      setAnswer("");

      setTimeLeft(120);

      setIsSpeaking(false);

      return;
    }

    setLoading(true);

    try {
      /*
        REAL API EXAMPLE

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ai/interview/evaluate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              studentId: student?.userId,
              branch,
              interviewType,
              difficulty,
              answers: updatedAnswers,
            }),
          }
        );

        const data = await response.json();
      */

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 1200)
      );

      const score =
        calculateScore(
          updatedAnswers
        );

      const technical =
        Math.max(
          0,
          Math.min(
            100,
            score - 3
          )
        );

      const communication =
        Math.min(
          100,
          score + 5
        );

      const confidence =
        Math.min(
          100,
          score + 2
        );

      const problemSolving =
        Math.max(
          0,
          Math.min(
            100,
            score - 5
          )
        );

      setResult({
        score,

        technical,

        communication,

        confidence,

        problemSolving,

        strengths: [
          "Good understanding of fundamentals",
          "Clear communication",
          "Logical approach to problems",
        ],

        improvements: [
          "Improve depth of technical explanations",
          "Use more real-world examples",
          "Practice answering within a time limit",
        ],

        recommendation:
          score >= 80
            ? "Excellent placement readiness"
            : score >= 65
            ? "Good readiness — continue practicing"
            : "Needs more preparation before interviews",
      });

      setShowResult(true);

      setStarted(false);
    } catch (error) {
      console.error(
        "Interview evaluation error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RESTART
  ===================================================== */

  const restartInterview = () => {
    setResult(null);

    setShowResult(false);

    setStarted(false);

    setCurrentQuestion(0);

    setAnswers([]);

    setAnswer("");

    setTimeLeft(120);

    setIsPaused(false);
  };

  /* =====================================================
     RESULT PAGE
  ===================================================== */

  if (
    showResult &&
    result
  ) {
    return (
      <div className="space-y-6">

        {/* Result Header */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div>

              <p className="text-blue-200">
                AI Interview Completed
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Interview Performance Report
              </h1>

              <p className="mt-2 text-blue-100">
                {branch}
              </p>

              <p className="text-blue-100">
                {interviewType} • {difficulty}
              </p>

            </div>

            <div className="w-36 h-36 rounded-full bg-white/10 border-4 border-white/40 flex flex-col items-center justify-center">

              <span className="text-5xl font-bold">
                {result.score}
              </span>

              <span className="text-sm">
                / 100
              </span>

            </div>

          </div>

        </div>

        {/* Skill Scores */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          {[
            [
              "Technical",
              result.technical,
              FiCode,
            ],

            [
              "Communication",
              result.communication,
              FiMic,
            ],

            [
              "Confidence",
              result.confidence,
              FiUser,
            ],

            [
              "Problem Solving",
              result.problemSolving,
              FiTrendingUp,
            ],
          ].map(
            ([
              title,
              score,
              Icon,
            ]) => (

              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-slate-700"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                    <Icon size={22} />

                  </div>

                  <span className="text-2xl font-bold dark:text-white">
                    {score}%
                  </span>

                </div>

                <h3 className="mt-4 font-semibold dark:text-white">
                  {title}
                </h3>

                <div className="mt-3 h-2 bg-gray-200 rounded-full">

                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${score}%`,
                    }}
                  />

                </div>

              </div>

            )
          )}

        </div>

        {/* Strength + Improvements */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">

              <FiCheckCircle className="text-green-500" />

              Strengths

            </h2>

            <div className="mt-5 space-y-3">

              {result.strengths.map(
                (item, index) => (

                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  >

                    <FiCheckCircle className="text-green-600 mt-1" />

                    <span className="dark:text-gray-200">
                      {item}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">

              <FiAlertCircle className="text-orange-500" />

              Areas to Improve

            </h2>

            <div className="mt-5 space-y-3">

              {result.improvements.map(
                (item, index) => (

                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl"
                  >

                    <FiAlertCircle className="text-orange-600 mt-1" />

                    <span className="dark:text-gray-200">
                      {item}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* Recommendation */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <div className="flex gap-4 items-center">

            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">

              <FiAward size={24} />

            </div>

            <div>

              <h2 className="font-bold text-xl dark:text-white">
                AI Recommendation
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {result.recommendation}
              </p>

            </div>

          </div>

        </div>

        {/* Restart */}

        <button
          onClick={restartInterview}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >

          <FiRefreshCw />

          Take Another Interview

        </button>

      </div>
    );
  }

  /* =====================================================
     CONFIGURATION PAGE
  ===================================================== */

  if (!started) {
    return (
      <div className="space-y-6">

        {/* Hero */}

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                  <FiMic size={30} />

                </div>

                <div>

                  <h1 className="text-3xl font-bold">
                    AI Mock Interview
                  </h1>

                  <p className="text-blue-100 mt-1">
                    Practice with your AI placement interviewer
                  </p>

                </div>

              </div>

              <p className="mt-5 text-blue-100 max-w-2xl">

                Get interview questions based on your
                engineering branch, technical skills,
                projects and placement requirements.

              </p>

            </div>

            {/* Interviewer Image */}

            <div className="flex justify-center">

              <div className="relative">

                <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl"></div>

                <img
                  src="/ai-interviewer.jpg"
                  alt="AI Interviewer"
                  className="relative w-44 h-44 object-cover rounded-3xl border-4 border-white/40 shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://ui-avatars.com/api/?name=AI+Interviewer&background=6366f1&color=fff&size=300";
                  }}
                />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">

                  <span className="w-2 h-2 bg-white rounded-full"></span>

                  AI Online

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Configuration */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold dark:text-white">

            Configure Your Interview

          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-6">

            {/* Branch */}

            <div>

              <label className="block text-sm font-medium mb-2 dark:text-gray-300">

                Engineering Branch

              </label>

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              >

                {Object.keys(
                  branchTopics
                ).map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

            {/* Type */}

            <div>

              <label className="block text-sm font-medium mb-2 dark:text-gray-300">

                Interview Type

              </label>

              <select
                value={interviewType}
                onChange={(e) =>
                  setInterviewType(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              >

                <option>
                  Technical
                </option>

                <option>
                  HR
                </option>

                <option>
                  Behavioral
                </option>

                <option>
                  Project Based
                </option>

              </select>

            </div>

            {/* Difficulty */}

            <div>

              <label className="block text-sm font-medium mb-2 dark:text-gray-300">

                Difficulty

              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              >

                <option>
                  Easy
                </option>

                <option>
                  Medium
                </option>

                <option>
                  Hard
                </option>

                <option>
                  Expert
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">

            <FiClock className="text-blue-600 text-2xl" />

            <h3 className="font-bold mt-4 dark:text-white">
              Timed Interview
            </h3>

            <p className="text-gray-500 mt-2">
              2 minutes are provided for each question.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">

            <FiBarChart2 className="text-green-600 text-2xl" />

            <h3 className="font-bold mt-4 dark:text-white">
              AI Evaluation
            </h3>

            <p className="text-gray-500 mt-2">
              Get scores for technical and communication skills.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">

            <FiAward className="text-purple-600 text-2xl" />

            <h3 className="font-bold mt-4 dark:text-white">
              Placement Feedback
            </h3>

            <p className="text-gray-500 mt-2">
              Identify your strengths and improvement areas.
            </p>

          </div>

        </div>

        {/* Start */}

        <button
          onClick={startInterview}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
        >

          <FiPlay />

          Start AI Interview

        </button>

      </div>
    );
  }

  /* =====================================================
     INTERVIEW SCREEN
  ===================================================== */

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (
    <div className="space-y-5">

      {/* Top Bar */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>

            <p className="text-sm text-gray-500">
              AI Mock Interview
            </p>

            <h2 className="text-xl font-bold dark:text-white">
              {branch}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {interviewType} • {difficulty}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
                timeLeft <= 30
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >

              <FiClock />

              {formatTime(
                timeLeft
              )}

            </div>

            <button
              onClick={() =>
                setIsPaused(
                  !isPaused
                )
              }
              className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700 dark:text-white"
            >

              {isPaused ? (
                <FiPlay />
              ) : (
                <FiPause />
              )}

            </button>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-5 h-2 bg-gray-200 rounded-full">

          <div
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-500">

          <span>
            Question{" "}
            {currentQuestion + 1}{" "}
            of {questions.length}
          </span>

          <span>
            {Math.round(
              progress
            )}
            %
          </span>

        </div>

      </div>

      {/* Main Interview */}

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Interviewer */}

        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden">

          <div className="p-4 flex items-center justify-between text-white">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">

                <FiVideo />

              </div>

              <div>

                <h3 className="font-bold">
                  AI Interviewer
                </h3>

                <p className="text-xs text-gray-400">
                  Virtual Interview Panel
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-green-400 text-xs">

              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

              LIVE

            </div>

          </div>

          <div className="relative flex justify-center px-5 pb-5">

            <div
              className={`relative w-full max-w-sm rounded-2xl overflow-hidden ${
                isSpeaking
                  ? "ring-4 ring-blue-500"
                  : ""
              }`}
            >

              <img
                src="/ai-interviewer.jpg"
                alt="AI Interviewer"
                className="w-full aspect-square object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=AI+Interviewer&background=4f46e5&color=fff&size=500";
                }}
              />

              {/* Speaking Overlay */}

              {isSpeaking && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">

                  <FiVolume2 />

                  Speaking...

                </div>
              )}

            </div>

          </div>

          <div className="px-5 pb-5">

            <div className="bg-white/10 rounded-xl p-4 text-white">

              <p className="text-xs text-gray-400">
                Interviewer
              </p>

              <p className="mt-1 font-semibold">
                AI Placement Interviewer
              </p>

            </div>

            <button
              onClick={speakQuestion}
              disabled={isPaused}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold"
            >

              <FiVolume2 />

              Read Question Aloud

            </button>

          </div>

        </div>

        {/* Question / Answer */}

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow p-7">

          <div className="flex items-center justify-between">

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Question{" "}
              {currentQuestion + 1}
            </span>

            <span className="text-sm text-gray-500">
              AI Interviewer
            </span>

          </div>

          <h1 className="text-2xl font-bold mt-8 dark:text-white leading-relaxed">

            {questions[currentQuestion]}

          </h1>

          <div className="mt-8">

            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">

              Your Answer

            </label>

            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              disabled={isPaused}
              rows={9}
              placeholder="Type your answer here or use Voice Answer..."
              className="w-full border border-gray-300 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />

          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-3 mt-5">

            <button
              onClick={
                startVoiceAnswer
              }
              disabled={isPaused}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >

              <FiMic />

              {isListening
                ? "Listening..."
                : "Voice Answer"}

            </button>

            <button
              onClick={
                submitAnswer
              }
              disabled={
                loading ||
                isPaused
              }
              className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold"
            >

              {loading ? (
                "Evaluating..."
              ) : currentQuestion ===
                questions.length - 1 ? (
                <>
                  Finish Interview
                  <FiCheckCircle />
                </>
              ) : (
                <>
                  Next Question
                  <FiChevronRight />
                </>
              )}

            </button>

          </div>

        </div>

      </div>

      {/* Bottom Information */}

      <div className="grid lg:grid-cols-2 gap-5">

        {/* Tips */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <h3 className="font-bold text-lg dark:text-white">
            Interview Tips
          </h3>

          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">

            <p>
              ✓ Structure your answer clearly.
            </p>

            <p>
              ✓ Give real-world examples.
            </p>

            <p>
              ✓ Explain your reasoning.
            </p>

            <p>
              ✓ Avoid very short answers.
            </p>

            <p>
              ✓ Stay within the time limit.
            </p>

          </div>

        </div>

        {/* Questions */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <h3 className="font-bold dark:text-white">
            Interview Questions
          </h3>

          <div className="grid grid-cols-5 gap-2 mt-4">

            {questions.map(
              (_, index) => (

                <div
                  key={index}
                  className={`h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                    index <
                    currentQuestion
                      ? "bg-green-100 text-green-700"
                      : index ===
                        currentQuestion
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >

                  {index + 1}

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AIInterview;

