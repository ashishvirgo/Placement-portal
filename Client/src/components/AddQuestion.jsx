import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaQuestionCircle,
  FaBook,
  FaLayerGroup,
  FaUpload,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaInfoCircle,
  FaImage,
} from "react-icons/fa";
const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const AddQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    question: "",
    imageFile: null,
    imagePreview: "",
    type: "single",
    difficulty: "easy",
    options: [
      { text: "", image: "" },
      { text: "", image: "" }
    ],
    answers: [],
    explanation: ""
  });

  // ================= FETCH SUBJECTS =================
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API}/subjects`);
        setSubjects(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  // ================= HELPERS =================
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index].text = value;
    updateField("options", updated);
  };

  const handleAnswerChange = (index) => {
    if (!form.options[index]?.text) return;

    if (form.type === "single") {
      updateField("answers", [index]);
    } else {
      let updated = [...form.answers];
      updated.includes(index)
        ? (updated = updated.filter((i) => i !== index))
        : updated.push(index);

      updateField("answers", updated);
    }
  };

  const addOption = () => {
    updateField("options", [
      ...form.options,
      { text: "", image: "" }
    ]);
  };

  const removeOption = (index) => {
    if (form.options.length <= 2) return;
    updateField(
      "options",
      form.options.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (file) => {
    updateField("imageFile", file);
    if (file) {
      updateField("imagePreview", URL.createObjectURL(file));
    }
  };

  // ================= VALIDATION =================
  const isValid = () => {
    if (
      !form.subject ||
      !form.topic.trim() ||
      !form.subtopic.trim() ||
      !form.question.trim()
    )
      return false;

    if (["single", "multiple"].includes(form.type)) {
      if (form.options.some((o) => !o.text.trim())) return false;
      if (!form.answers.length) return false;
    }

    if (form.type === "fill" && !form.answers[0]) return false;
    if (form.type === "boolean" && form.answers.length === 0) return false;

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const formData = new FormData();

    formData.append("subject", form.subject);
    formData.append("topic", form.topic);
    formData.append("subtopic", form.subtopic);
    formData.append("question", form.question);
    formData.append("type", form.type);
    formData.append("difficulty", form.difficulty);
    formData.append("explanation", form.explanation);

    formData.append("options", JSON.stringify(form.options));

    formData.append(
      "correctAnswer",
      JSON.stringify(
        form.type === "single"
          ? form.answers[0]
          : form.type === "multiple"
          ? form.answers
          : form.answers[0]
      )
    );

    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    try {
      setSubmitting(true);

      await axios.post(`${API}/questions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("✅ Question Added Successfully");

      // RESET
      setForm({
        subject: "",
        topic: "",
        subtopic: "",
        question: "",
        imageFile: null,
        imagePreview: "",
        type: "single",
        difficulty: "easy",
        options: [
          { text: "", image: "" },
          { text: "", image: "" }
        ],
        answers: [],
        explanation: ""
      });

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add question");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= UI =================
  return (
  <div className="min-h-screen bg-slate-100 p-6">
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FaQuestionCircle className="text-blue-600" />
          Add New Question
        </h1>

        <p className="text-slate-500 mt-2">
          Create and manage questions for quizzes, assignments, and examinations.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

          {/* QUESTION INFORMATION */}
          <div className="p-8 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
              <FaBook className="text-blue-600" />
              Question Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">
                    {loadingSubjects ? "Loading..." : "Select Subject"}
                  </option>

                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Question Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                      answers: [],
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="fill">Fill in the Blank</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Topic
                </label>

                <input
                  value={form.topic}
                  onChange={(e) => updateField("topic", e.target.value)}
                  placeholder="Enter topic"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sub Topic
                </label>

                <input
                  value={form.subtopic}
                  onChange={(e) => updateField("subtopic", e.target.value)}
                  placeholder="Enter subtopic"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* DIFFICULTY */}
          <div className="p-8 border-b border-slate-200">
            <h2 className="text-xl font-semibold mb-6">
              Difficulty Level
            </h2>

            <div className="grid grid-cols-3 gap-4">

              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => updateField("difficulty", level)}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    form.difficulty === level
                      ? level === "easy"
                        ? "bg-green-50 border-green-500"
                        : level === "medium"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-red-50 border-red-500"
                      : "border-slate-300 hover:border-blue-400"
                  }`}
                >
                  <div className="font-semibold capitalize">
                    {level}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* QUESTION */}
          <div className="p-8 border-b border-slate-200">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Question Content
            </h2>

            <textarea
              rows={5}
              value={form.question}
              onChange={(e) =>
                updateField("question", e.target.value)
              }
              placeholder="Enter your question..."
              className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* IMAGE */}
          <div className="p-8 border-b border-slate-200">

            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <FaImage />
              Question Image
            </h2>

            <label className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

              <FaUpload className="text-4xl text-blue-600 mb-4" />

              <span className="font-medium">
                Upload Question Image
              </span>

              <span className="text-sm text-slate-500">
                JPG, PNG, JPEG
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e.target.files[0])
                }
              />
            </label>

            {form.imagePreview && (
              <div className="mt-6">
                <img
                  src={form.imagePreview}
                  alt=""
                  className="h-56 rounded-xl border shadow"
                />
              </div>
            )}
          </div>

          {/* OPTIONS */}
          {(form.type === "single" ||
            form.type === "multiple") && (
            <div className="p-8 border-b border-slate-200">

              <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                <FaLayerGroup />
                Answer Options
              </h2>

              <div className="space-y-4">

                {form.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4"
                  >
                    <input
                      type={
                        form.type === "single"
                          ? "radio"
                          : "checkbox"
                      }
                      checked={form.answers.includes(i)}
                      onChange={() =>
                        handleAnswerChange(i)
                      }
                    />

                    <input
                      value={opt.text}
                      onChange={(e) =>
                        handleOptionChange(
                          i,
                          e.target.value
                        )
                      }
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 px-4 py-3 border rounded-lg bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => removeOption(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addOption}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium"
                >
                  <FaPlus />
                  Add Option
                </button>
              </div>
            </div>
          )}

          {/* BOOLEAN */}
          {form.type === "boolean" && (
            <div className="p-8 border-b">
              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() =>
                    updateField("answers", [true])
                  }
                  className={`px-6 py-3 rounded-xl border ${
                    form.answers[0] === true
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  True
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateField("answers", [false])
                  }
                  className={`px-6 py-3 rounded-xl border ${
                    form.answers[0] === false
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  False
                </button>

              </div>
            </div>
          )}

          {/* FILL */}
          {form.type === "fill" && (
            <div className="p-8 border-b">
              <input
                value={form.answers[0] || ""}
                onChange={(e) =>
                  updateField("answers", [e.target.value])
                }
                placeholder="Correct Answer"
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />
            </div>
          )}

          {/* EXPLANATION */}
          <div className="p-8">

            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <FaInfoCircle />
              Explanation
            </h2>

            <textarea
              rows={5}
              value={form.explanation}
              onChange={(e) =>
                updateField(
                  "explanation",
                  e.target.value
                )
              }
              placeholder="Provide detailed explanation..."
              className="w-full p-4 rounded-xl border border-slate-300"
            />
          </div>

          {/* FOOTER */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">

            <button
              disabled={!isValid() || submitting}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {submitting ? (
                "Saving Question..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaCheckCircle />
                  Save Question
                </span>
              )}
            </button>

          </div>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddQuestion;