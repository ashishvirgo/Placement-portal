import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const ViewQuestions = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  const [editingQ, setEditingQ] = useState(null);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // ================= FETCH SUBJECTS =================
  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(`${API}/subjects`);
      setSubjects(res.data || []);
    };
    fetchSubjects();
  }, []);

  // ================= FETCH QUESTIONS =================
  useEffect(() => {
    if (selectedSubject) fetchQuestions();
  }, [page, limit, selectedSubject]);
  
  const editQuestion = (q) => {
  setEditingQ({
    ...q,
    correctAnswer:
      q.type === "boolean"
        ? q.correctAnswer.toString() // for dropdown
        : q.correctAnswer
  });
};
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/questions?subject=${selectedSubject}&page=${page}&limit=${limit}&search=${search}`
      );

      setQuestions(res.data.questions || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  //###########editQuestion####################
  const updateQuestion = async () => {
  try {
    let payload = { ...editingQ };

    if (editingQ.type === "single") {
      payload.correctAnswer = Number(editingQ.correctAnswer);
    }

    if (editingQ.type === "multiple") {
      payload.correctAnswer = editingQ.correctAnswer.map(Number);
    }

    if (editingQ.type === "boolean") {
      payload.correctAnswer = editingQ.correctAnswer === "true";
    }

    await axios.put(`${API}/questions/${editingQ._id}`, payload);

    setEditingQ(null);
    fetchQuestions();
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};
  // ================= DELETE =================
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    await axios.delete(`${API}/questions/${id}`);
    fetchQuestions();
  };

  // ================= ANSWER =================
  const getAnswerText = (q) => {
    if (q.type === "single") return q.options?.[q.correctAnswer]?.text;

    if (q.type === "multiple")
      return q.correctAnswer?.map((i) => q.options?.[i]?.text).join(", ");

    if (q.type === "boolean") return q.correctAnswer ? "True" : "False";

    return q.correctAnswer;
  };

  const difficultyColor = {
    easy: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    hard: "bg-red-200 text-red-800"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-bold mb-4">All Questions</h2>

      {/* SUBJECT */}
      <select
        value={selectedSubject}
        onChange={(e) => {
          setSelectedSubject(e.target.value);
          setPage(1);
        }}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {!selectedSubject && (
        <p className="text-center text-gray-500">
          Please select subject
        </p>
      )}

      {selectedSubject && (
        <>
          {/* SEARCH + LIMIT */}
          <div className="flex justify-between mb-4 gap-4">

            {/* SEARCH */}
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={() => {
                  setPage(1);
                  fetchQuestions();
                }}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Search
              </button>
            </div>

            {/* SHOW DROPDOWN */}
            <div className="flex items-center gap-2">
              <label className="text-sm">Show:</label>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border p-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

          </div>

          {/* LOADING */}
          {loading && <p>Loading...</p>}

          {/* LIST */}
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q._id} className="p-4 border rounded bg-gray-50">

                <h3 className="font-semibold text-lg mb-2">
                  {q.question}
                </h3>

                {q.image && (
                  <img
                    src={`http://localhost:5002${q.image}`}
                    className="max-h-60 mb-3 rounded"
                  />
                )}

                {/* TAGS */}
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                    Topic: {q.topic}
                  </span>

                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      difficultyColor[q.difficulty]
                    }`}
                  >
                    Difficulty:  {q.difficulty}
                  </span>
                </div>

                {/* OPTIONS */}
                {(q.type === "single" || q.type === "multiple") &&
                  q.options.map((opt, i) => (
                    <div key={i}>
                      {i + 1}. {opt.text}
                    </div>
                  ))}

                {/* ANSWER */}
                <p className="text-green-600 mt-2 font-semibold">
                  Answer: {getAnswerText(q)}
                </p>

                {/* ACTION */}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => editQuestion(q)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
      {editingQ && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-xl">

      <h2 className="text-xl font-bold mb-4">Edit Question</h2>

      {/* QUESTION */}
      <textarea
        className="w-full border p-2 mb-3"
        value={editingQ.question}
        onChange={(e) =>
          setEditingQ({ ...editingQ, question: e.target.value })
        }
      />

      {/* TYPE BASED OPTIONS */}
      {(editingQ.type === "single" ||
        editingQ.type === "multiple") &&
        editingQ.options.map((opt, i) => (
          <input
            key={i}
            className="w-full border p-2 mb-2"
            value={opt.text}
            onChange={(e) => {
              const updated = [...editingQ.options];
              updated[i].text = e.target.value;
              setEditingQ({ ...editingQ, options: updated });
            }}
          />
        ))}

      {/* ANSWER */}
      <input
        className="w-full border p-2 mb-3"
        placeholder="Correct Answer"
        value={editingQ.correctAnswer}
        onChange={(e) =>
          setEditingQ({
            ...editingQ,
            correctAnswer: e.target.value
          })
        }
      />

      {/* BUTTONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setEditingQ(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={updateQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ViewQuestions;