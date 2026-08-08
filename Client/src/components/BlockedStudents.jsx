import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const BlockedStudents = () => {
  const token = localStorage.getItem("token");

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [blockedStudents, setBlockedStudents] =
    useState([]);
  const [loading, setLoading] = useState(false);

  // ================= LOAD QUIZZES =================
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(
        `${API}/quiz`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizzes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOAD BLOCKED STUDENTS =================
  const fetchBlockedStudents =
    async (quizId) => {
      if (!quizId) return;

      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/quiz/blocked/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log("blocked",res.data.students)
        setBlockedStudents(
          res.data.students || []
        );

      } catch (err) {
        console.log(err);
        setBlockedStudents([]);
      } finally {
        setLoading(false);
      }
    };

  // ================= UNBLOCK =================
  const unblockStudent =
    async (resultId) => {
      if (
        !window.confirm(
          "Unblock this student?"
        )
      )
        return;

      try {
        await axios.put(
          `${API}/quiz/unblock/${resultId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Student unblocked successfully."
        );

        fetchBlockedStudents(
          selectedQuiz
        );

      } catch (err) {
        console.log(err);

        alert("Unable to unblock");
      }
    };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Unblock Student
      </h1>

      {/* SELECT QUIZ */}

      <div className="bg-white shadow rounded-xl p-5 mb-6">

        <label className="font-semibold">
          Select Quiz
        </label>

        <select
          className="w-full mt-2 border rounded-lg p-3"
          value={selectedQuiz}
          onChange={(e) => {
            setSelectedQuiz(
              e.target.value
            );

            fetchBlockedStudents(
              e.target.value
            );
          }}
        >
          <option value="">
            Select Quiz
          </option>

          {quizzes.map((quiz) => (
            <option
              key={quiz._id}
              value={quiz._id}
            >
              {quiz.title}
            </option>
          ))}
        </select>

      </div>

      {loading && (
        <div className="text-center py-10">
          Loading...
        </div>
      )}

      {!loading &&
        selectedQuiz &&
        blockedStudents.length ===
          0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            No blocked students found.
          </div>
        )}

      {!loading &&
        blockedStudents.length >
          0 && (

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3">
                    Student
                  </th>

                  <th className="p-3">
                    Attempt ID
                  </th>

                  <th className="p-3">
                    Violations
                  </th>

                  <th className="p-3">
                    Reason
                  </th>

                  <th className="p-3">
                    Blocked At
                  </th>

                  <th className="p-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {blockedStudents.map(
                  (student) => (

                    <tr
                      key={
                        student._id
                      }
                      className="border-t"
                    >

                      <td className="p-3">
                        {
                          student.name
                        }
                      </td>

                      <td className="p-3 font-mono">
                        {
                          student.attemptId
                        }
                      </td>

                      <td className="p-3">
                        {
                          student.violationCount
                        }
                      </td>

                      <td className="p-3">
                        {
                          student.blockedReason
                        }
                      </td>

                      <td className="p-3">
                        {new Date(
                          student.blockedAt
                        ).toLocaleString()}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            unblockStudent(
                              student._id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Unblock
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}
    </div>
  );
};

export default BlockedStudents;