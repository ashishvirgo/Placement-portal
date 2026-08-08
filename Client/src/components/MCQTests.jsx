import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaBookOpen,
  FaPlay,
  FaStar,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const MCQTests = ({ navigate }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/quiz/sample`
      );

      setTests(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  const getTotalMarks = (quiz) => {
    if (
      quiz.quizType === "sampled"
    ) {
      return quiz.numQuestions || 0;
    }

    return (
      quiz.questions?.reduce(
        (sum, q) =>
          sum + (q.marks || 1),
        0
      ) || 0
    );
  };

  const getDifficultyColor = (
    difficulty
  ) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";

      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";

      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            MCQ Test Portal
          </h1>

          <p className="mt-2 text-blue-100">
            Practice assessments and
            improve your performance
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl">
              <p className="text-sm">
                Available Tests
              </p>
              <h3 className="text-2xl font-bold">
                {tests.length}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl">
              <p className="text-sm">
                Practice Mode
              </p>
              <h3 className="text-2xl font-bold">
                Active
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* LOADER */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map(
            (_, index) => (
              <div
                key={index}
                className="h-72 rounded-3xl bg-white dark:bg-slate-900 animate-pulse"
              />
            )
          )}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        tests.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-sm">
            <FaClipboardList className="mx-auto text-5xl text-slate-400 mb-4" />

            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
              No Tests Available
            </h3>

            <p className="text-slate-500 mt-2">
              New assessments will
              appear here.
            </p>
          </div>
        )}

      {/* TEST GRID */}
      {!loading &&
        tests.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tests.map((test) => (
              <div
                key={test._id}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* TOP STRIP */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                <div className="p-6">
                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                      {test.subject?.name ||
                        "General"}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                      {test.quizType ===
                      "sampled"
                        ? "Sampled"
                        : "Assigned"}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2">
                    {test.title}
                  </h2>

                  <p className="text-sm text-slate-500 mb-5">
                    Test your knowledge
                    and evaluate your
                    skills.
                  </p>

                  {/* DETAILS */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <FaClock />
                        Duration
                      </span>

                      <span className="font-semibold">
                        {test.duration} min
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <FaBookOpen />
                        Marks
                      </span>

                      <span className="font-semibold">
                        {getTotalMarks(
                          test
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <FaChartLine />
                        Difficulty
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                          test.difficulty
                        )}`}
                      >
                        {test.difficulty ||
                          "Mixed"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <FaStar />
                        Negative
                      </span>

                      <span className="font-semibold text-red-500">
                        -
                        {test.negativeMarking ||
                          0}
                      </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(
                        `/sampleexam/${test._id}`
                      )
                    }
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaPlay />
                    Start Test
                  </button>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default MCQTests;