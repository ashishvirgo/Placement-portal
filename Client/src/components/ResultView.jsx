import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import * as XLSX from "xlsx";
const API =
  import.meta.env
    .VITE_BACKEND_API ||
  "http://localhost:5002/api";

export default function ResultView() {
  const [quizzes, setQuizzes] =
    useState([]);

  const [
    selectedQuiz,
    setSelectedQuiz,
  ] = useState("");

  const [
    selectedDate,
    setSelectedDate,
  ] = useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ================= FETCH QUIZZES =================
  useEffect(() => {
    fetchQuizzes();
  }, []);
 
  const fetchQuizzes =
    async () => {
      try {
        const res =
          await axios.get(
            `${API}/quiz`
          );

        setQuizzes(
          res.data || []
        );
      } catch (err) {
        console.log(err);

        setError(
          "Failed to load quizzes."
        );
      }
    };

  // ================= FETCH RESULTS =================
  const fetchResults =
    async () => {
      if (
        !selectedQuiz ||
        !selectedDate
      ) {
        alert(
          "Please select quiz and date."
        );
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res =
          await axios.get(
            `${API}/result/quiz/${selectedQuiz}`,
            {
              params: {
                date:
                  selectedDate,
              },
            }
          );

        setResults(
          res.data || []
        );
      } catch (err) {
        console.log(err);

        setResults([]);

        setError(
          err.response?.data
            ?.message ||
            "Failed to fetch results."
        );
      } finally {
        setLoading(false);
      }
    };
   //==============Download===========
   const downloadResults = () => {
  if (!results || results.length === 0) {
    alert("No results available to download");
    return;
  }

  const excelData = results.map(
    (r, index) => ({
      Rank: index + 1,
      Student:
        r.student?.name ||
        "N/A",
      Email:
        r.student?.email ||
        "N/A",
      Score: r.score,
      Total: r.total,
      Percentage:
        `${r.percentage}%`,
      Status: r.status,
      "Time Taken":
        `${r.timeTaken} min`,
      "Tab Switches":
        r.tabSwitchCount || 0,
      "Auto Submitted":
        r.autoSubmitted
          ? "YES"
          : "NO",
      Submitted: new Date(
        r.submittedAt
      ).toLocaleString(),
    })
  );

  const worksheet =
    XLSX.utils.json_to_sheet(
      excelData
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Results"
  );

  const quizName =
    quizzes.find(
      (q) =>
        q._id ===
        selectedQuiz
    )?.title || "Quiz";

  XLSX.writeFile(
    workbook,
    `${quizName}_${selectedDate}_Results.xlsx`
  );
};
  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold mb-5">
          Quiz Result Report
        </h1>

        <div className="flex flex-wrap gap-4 items-end">
          {/* QUIZ */}
          <div>
            <label className="block font-medium mb-2">
              Select Quiz
            </label>

            <select
              value={
                selectedQuiz
              }
              onChange={(
                e
              ) =>
                setSelectedQuiz(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2 min-w-[250px]"
            >
              <option value="">
                Select Quiz
              </option>

              {quizzes.map(
                (
                  quiz
                ) => (
                  <option
                    key={
                      quiz._id
                    }
                    value={
                      quiz._id
                    }
                  >
                    {
                      quiz.title
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="block font-medium mb-2">
              Exam Date
            </label>

            <input
              type="date"
              value={
                selectedDate
              }
              onChange={(
                e
              ) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            />
          </div>

          {/* SEARCH */}
          <button
            onClick={
              fetchResults
            }
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
          <div className="flex gap-3">
 
  <button
    onClick={downloadResults}
    disabled={
      results.length === 0
    }
    className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
  >
    Download Excel
  </button>

</div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* RESULT TABLE */}
      {results.length >
      0 ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-bold">
              Results (
              {
                results.length
              }{" "}
              Students)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">
                    Rank
                  </th>

                  <th className="border p-3">
                    Student
                  </th>

                  <th className="border p-3">
                    Email
                  </th>

                  <th className="border p-3">
                    Score
                  </th>

                  <th className="border p-3">
                    Percentage
                  </th>

                  <th className="border p-3">
                    Time
                  </th>

                  <th className="border p-3">
                    Status
                  </th>

                  <th className="border p-3">
                    Tab Switch
                  </th>

                  <th className="border p-3">
                    Auto Submit
                  </th>
                </tr>
              </thead>

              <tbody>
                {results
                  .sort(
                    (
                      a,
                      b
                    ) =>
                      b.score -
                      a.score
                  )
                  .map(
                    (
                      r,
                      index
                    ) => (
                      <tr
                        key={
                          r._id
                        }
                        className="hover:bg-gray-50"
                      >
                        <td className="border p-3 text-center">
                          {index +
                            1}
                        </td>

                        <td className="border p-3">
                          {r
                            .student
                            ?.name ||
                            r.student}
                        </td>

                        <td className="border p-3">
                          {r
                            .student
                            ?.email ||
                            "-"}
                        </td>

                        <td className="border p-3 text-center">
                          {
                            r.score
                          }
                          /
                          {
                            r.total
                          }
                        </td>

                        <td className="border p-3 text-center">
                          {
                            r.percentage
                          }
                          %
                        </td>

                        <td className="border p-3 text-center">
                          {
                            r.timeTaken
                          }
                          {" "}
                          min
                        </td>

                        <td className="border p-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-white ${
                              r.status ===
                              "PASS"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {
                              r.status
                            }
                          </span>
                        </td>

                        <td className="border p-3 text-center">
                          <span
                            className={
                              r.tabSwitchCount >
                              3
                                ? "text-red-600 font-bold"
                                : ""
                            }
                          >
                            {
                              r.tabSwitchCount ||
                              0
                            }
                          </span>
                        </td>

                        <td className="border p-3 text-center">
                          {r.autoSubmitted
                            ? "YES"
                            : "NO"}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !loading &&
        selectedQuiz &&
        selectedDate && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            No results found
            for selected quiz
            and date.
          </div>
        )
      )}
    </div>
  );
}