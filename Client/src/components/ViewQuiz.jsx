import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTrash,
  FaBook,
  FaLayerGroup,
  FaQuestionCircle,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";

import { MdQuiz } from "react-icons/md";

const API =
  import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  // ================= FETCH =================
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/quiz`);
      setQuizzes(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // ================= DELETE =================
  const deleteQuiz = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;

    try {
      await axios.delete(`${API}/quiz/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= UPDATE =================
  const updateQuiz = async () => {
    try {
      await axios.put(
        `${API}/quiz/${editingQuiz._id}`,
        editingQuiz
      );

      setEditingQuiz(null);
      fetchQuizzes();
      alert("Quiz updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const getImage = (img) =>
    img?.startsWith("http")
      ? img
      : `http://localhost:5002/${img?.replace(/^\/+/, "")}`;

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">

  <div className="max-w-7xl mx-auto">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <MdQuiz className="text-blue-600" />
          Quiz Management
        </h1>

        <p className="text-gray-500 mt-2">
          View, Edit and Manage all quizzes
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg px-6 py-4">

        <p className="text-gray-500 text-sm">
          Total Quizzes
        </p>

        <h2 className="text-3xl font-bold text-blue-600">
          {quizzes.length}
        </h2>

      </div>

    </div>
    </div>

      <h2 className="text-2xl font-bold mb-6">
        All Quizzes
      </h2>

      {loading && (
        <div className="flex justify-center py-20">

<div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 border-t-transparent"/>

</div>
      )}

      {!loading && quizzes.length === 0 && (
        <p>No quizzes found</p>
      )}

      <div className="space-y-5">

        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border rounded-xl p-5 bg-gray-50">
        
            {/* HEADER */}
            <div className="flex justify-between">

              <div>
                <h3 className="text-xl font-bold">
                  {quiz.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {quiz.subject?.name} | {quiz.topic}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    setExpanded(expanded === quiz._id ? null : quiz._id)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {expanded === quiz._id ? "Hide" : "View"}
                </button>

                <button
                  onClick={() => setEditingQuiz(quiz)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuiz(quiz._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            </div>

            {/* QUESTIONS */}
            {expanded === quiz._id && (
              <div className="mt-4 space-y-4">

                {quiz.questions.map((q, i) => {
                  const question = q.questionId;

                  return (
                    <div key={i} className="bg-white border rounded-xl p-4">

                      {/* QUESTION */}
                      <h3 className="font-bold">
                        Q{i + 1}. {question?.question}
                      </h3>

                      {/* IMAGE */}
                      {question?.image && (
                        <img
                          src={getImage(question.image)}
                          className="mt-2 max-h-52 rounded"
                        />
                      )}

                      {/* OPTIONS */}
                      {question?.options?.map((opt, idx) => (
                        <div key={idx} className="text-sm mt-1">
                          {idx + 1}. {opt.text}
                        </div>
                      ))}

                      {/* CORRECT ANSWER */}
                      <div className="mt-3 bg-green-50 p-3 rounded">

                        <p className="font-semibold text-green-700">
                          Correct Answer
                        </p>

                        {/* SINGLE */}
                        {question.type === "single" && (
                          <p>
                            {question.options?.[
                              question.correctAnswer
                            ]?.text}
                          </p>
                        )}

                        {/* MULTIPLE */}
                        {question.type === "multiple" && (
                          <div>
                            {question.correctAnswer?.map((ans, idx) => (
                              <p key={idx}>
                                • {question.options?.[ans]?.text}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* BOOLEAN */}
                        {question.type === "boolean" && (
                          <p>
                            {question.correctAnswer ? "True" : "False"}
                          </p>
                        )}

                        {/* FILL */}
                        {question.type === "fill" && (
                          <p>{question.correctAnswer}</p>
                        )}
                      </div>

                      {/* EXPLANATION */}
                      {question?.explanation && (
                        <div className="mt-3 bg-yellow-50 p-3 rounded">
                          <p className="font-semibold">Explanation</p>
                          <p className="whitespace-pre-wrap">
                            {question.explanation}
                          </p>
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            )}

          </div>
        ))}

      </div>

      {/* EDIT MODAL (unchanged) */}
      {/* EDIT MODAL */}
{editingQuiz && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Edit Quiz
        </h2>

        <button
          onClick={() => setEditingQuiz(null)}
          className="text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Title */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Quiz Title
        </label>

        <input
          type="text"
          value={editingQuiz.title || ""}
          onChange={(e) =>
            setEditingQuiz({
              ...editingQuiz,
              title: e.target.value,
            })
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
        />
      </div>

      {/* Duration */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Duration (Minutes)
        </label>

        <input
          type="number"
          value={editingQuiz.duration || ""}
          onChange={(e) =>
            setEditingQuiz({
              ...editingQuiz,
              duration: Number(e.target.value),
            })
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
        />
      </div>

      {/* Negative Marking */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Negative Marking
        </label>

        <input
          type="number"
          step="0.25"
          value={editingQuiz.negativeMarking ?? 0}
          onChange={(e) =>
            setEditingQuiz({
              ...editingQuiz,
              negativeMarking: Number(e.target.value),
            })
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setEditingQuiz(null)}
          className="
            px-5
            py-3
            rounded-xl
            bg-gray-200
            hover:bg-gray-300
          "
        >
          Cancel
        </button>

        <button
          onClick={updateQuiz}
          className="
            px-5
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
          "
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

export default ViewQuiz;