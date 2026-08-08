import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const AssignedTests = () => {
  const navigate = useNavigate();

  const [tests, setTests] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= FETCH ASSIGNED TESTS =================
  useEffect(() => {
    fetchAssignedTests();
  }, []);

  const fetchAssignedTests =
    async () => {
      try {
        setLoading(true);
        setError("");

        const userData =localStorage.getItem("user");
        console.log("UserData=",userData)
        if (!userData) {
          setError(
            "User not found. Please login again."
          );
          return;
        }

        const user =JSON.parse(userData);

        if (!user?.id) {
          setError(
            "Invalid user data"
          );
          return;
        }

        console.log(
          "User ID =",
          user.id
        );

        const res =
          await axios.get(
            `${API}/quiz/assigned/${user.id}`
          );

        console.log(
          "Assigned Tests =",
          res.data
        );

        setTests(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data
            ?.message ||
            "Failed to fetch assigned tests"
        );
      } finally {
        setLoading(false);
      }
    };

  // ================= FORMAT DATE =================
  const formatDate = (
    date
  ) => {
    if (!date) return "N/A";

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  // ================= STATUS CLASS =================
  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "expired":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ================= BUTTON TEXT =================
  const getButtonText = (
    status
  ) => {
    switch (status) {
      case "completed":
        return "Already Attempted";

      case "expired":
        return "Test Expired";

      default:
        return "Start Test →";
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Assigned Tests
          </h2>

          <p className="text-gray-500 mt-1">
            View and attempt your assigned exams
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-xl font-semibold w-fit">
          Total Tests: {tests.length}
        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-20">

          <div className="text-lg font-semibold text-gray-500">
            Loading assigned tests...
          </div>

        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        tests.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-white">
              No Assigned Tests
            </h3>

            <p className="text-gray-500 mt-2">
              You don't have any assigned exams yet.
            </p>

          </div>
        )}

      {/* TEST GRID */}
      {!loading &&
        !error &&
        tests.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            {tests.map((test) => {
              const status =
                test.status ||
                "pending";

              const disabled =
                status ===
                  "completed" ||
                status ===
                  "expired";

              return (
                <div
                  key={test._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-5">

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {test.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {test.subject
                          ?.name ||
                          "General"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        status
                      )}`}
                    >
                      {status.toUpperCase()}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">

                    <div className="flex justify-between">
                      <span>
                        ⏱ Duration
                      </span>

                      <span className="font-semibold">
                        {
                          test.duration
                        }{" "}
                        mins
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Questions
                      </span>

                      <span className="font-semibold">
                        {test
                          .questions
                          ?.length ||
                          0}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Difficulty
                      </span>

                      <span
                        className={`font-semibold ${
                          test.difficulty ===
                          "easy"
                            ? "text-green-500"
                            : test.difficulty ===
                              "medium"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {test.difficulty ||
                          "Mixed"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Negative
                      </span>

                      <span className="font-semibold">
                        {test.negativeMarking ||
                          0}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Due Date
                      </span>

                      <span className="font-semibold">
                        {formatDate(
                          test.dueDate
                        )}
                      </span>
                    </div>

                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={
                      disabled
                    }
                    onClick={() =>
                      navigate(
                        `/assignedexam/${test._id}`
                      )
                    }
                    className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
                      disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {getButtonText(
                      status
                    )}
                  </button>

                </div>
              );
            })}

          </div>
        )}

    </div>
  );
};

export default AssignedTests;