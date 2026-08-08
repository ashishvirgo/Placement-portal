import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const ViewCodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingQ, setEditingQ] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchQuestions();
  }, [page, limit]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/coding-questions?page=${page}&limit=${limit}`
      );

      setQuestions(res.data.questions || res.data);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await axios.delete(`${API}/coding-questions/${id}`);
    fetchQuestions();
  };

  const updateQuestion = async () => {
    try {
      await axios.put(
        `${API}/coding-questions/${editingQ._id}`,
        editingQ
      );

      setEditingQ(null);
      fetchQuestions();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const badge = (text, color) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {text}
    </span>
  );

  const inputClass =
    "w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none";

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coding Questions</h2>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">Loading questions...</p>
      )}

      {/* GRID LIST */}
      <div className="grid gap-5">
        {questions.map((q) => (
          <div
            key={q._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >

            {/* TITLE */}
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-800">
                {q.title}
              </h3>

              {badge(
                q.difficulty,
                q.difficulty === "easy"
                  ? "bg-green-100 text-green-700"
                  : q.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mt-2 text-sm">
              {q.description}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {badge(`📌 ${q.topic}`, "bg-blue-100 text-blue-700")}
              {badge(`🧩 ${q.subtopic}`, "bg-purple-100 text-purple-700")}
            </div>

            {/* CODE */}
            <div className="mt-4 bg-gray-900 text-green-300 p-4 rounded-xl text-sm overflow-auto">
              <pre>{q.starterCode}</pre>
            </div>

            {/* TEST CASES */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Test Cases</h4>

              <div className="space-y-1 text-sm text-gray-700">
                {q.testCases?.map((tc, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-50 px-3 py-1 rounded"
                  >
                    <span>
                      <b>Input:</b> {tc.input}
                    </span>
                    <span>
                      <b>Output:</b> {tc.output}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingQ(q)}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteQuestion(q._id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingQ && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Edit Question
            </h2>

            <div className="space-y-3">

              <input
                className={inputClass}
                value={editingQ.title}
                onChange={(e) =>
                  setEditingQ({ ...editingQ, title: e.target.value })
                }
              />

              <textarea
                className={inputClass}
                rows={3}
                value={editingQ.description}
                onChange={(e) =>
                  setEditingQ({
                    ...editingQ,
                    description: e.target.value,
                  })
                }
              />

              <textarea
                className={inputClass + " font-mono"}
                rows={6}
                value={editingQ.starterCode}
                onChange={(e) =>
                  setEditingQ({
                    ...editingQ,
                    starterCode: e.target.value,
                  })
                }
              />

              {/* TEST CASES */}
              <div className="space-y-2">
                {editingQ.testCases?.map((tc, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="border p-2 rounded w-1/2"
                      value={tc.input}
                      onChange={(e) => {
                        const updated = [...editingQ.testCases];
                        updated[i].input = e.target.value;
                        setEditingQ({
                          ...editingQ,
                          testCases: updated,
                        });
                      }}
                    />

                    <input
                      className="border p-2 rounded w-1/2"
                      value={tc.output}
                      onChange={(e) => {
                        const updated = [...editingQ.testCases];
                        updated[i].output = e.target.value;
                        setEditingQ({
                          ...editingQ,
                          testCases: updated,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditingQ(null)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={updateQuestion}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ViewCodingQuestions;