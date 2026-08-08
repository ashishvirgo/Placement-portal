import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const AddCodingQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    title: "",
    description: "",
    difficulty: "easy",
    starterCode: "",
    testCases: [{ input: "", output: "" }],
    explanation: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/subjects`)
      .then((res) => setSubjects(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingSubjects(false));
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...form.testCases];
    updated[index][field] = value;
    setForm({ ...form, testCases: updated });
  };

  const addTestCase = () => {
    setForm((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "" }],
    }));
  };

  const removeTestCase = (index) => {
    if (form.testCases.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index),
    }));
  };

  const isValid = () => {
    return (
      form.subject &&
      form.topic &&
      form.subtopic &&
      form.title &&
      form.description &&
      form.starterCode.trim() &&
      form.testCases.every((tc) => tc.input && tc.output)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return alert("Please fill all required fields");

    try {
      setSubmitting(true);
      await axios.post(`${API}/coding-questions`, form);

      alert("Coding Question Added Successfully 🎉");

      setForm({
        subject: "",
        topic: "",
        subtopic: "",
        title: "",
        description: "",
        difficulty: "easy",
        starterCode: "",
        testCases: [{ input: "", output: "" }],
        explanation: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding question");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none";

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* HEADER */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-2xl font-bold">Add Coding Question</h2>
          <p className="text-sm opacity-90">
            Create structured coding problems with test cases
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-4">

            <select
              className={inputClass}
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
            >
              <option value="">
                {loadingSubjects ? "Loading subjects..." : "Select Subject"}
              </option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              className={inputClass}
              placeholder="Topic"
              value={form.topic}
              onChange={(e) => updateField("topic", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Subtopic"
              value={form.subtopic}
              onChange={(e) => updateField("subtopic", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />

            <select
              className={inputClass}
              value={form.difficulty}
              onChange={(e) => updateField("difficulty", e.target.value)}
            >
              <option value="easy">🟢 Easy</option>
              <option value="medium">🟡 Medium</option>
              <option value="hard">🔴 Hard</option>
            </select>

            <textarea
              className={inputClass + " h-40 font-mono"}
              placeholder="Starter Code"
              value={form.starterCode}
              onChange={(e) => updateField("starterCode", e.target.value)}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">

            <textarea
              className={inputClass + " h-40"}
              placeholder="Problem Description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />

            <textarea
              className={inputClass + " h-28"}
              placeholder="Explanation (optional)"
              value={form.explanation}
              onChange={(e) => updateField("explanation", e.target.value)}
            />

            {/* TEST CASES */}
            <div className="bg-gray-50 p-4 rounded-xl border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Test Cases</h3>

                <button
                  type="button"
                  onClick={addTestCase}
                  className="text-blue-600 font-medium"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {form.testCases.map((tc, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border"
                  >
                    <input
                      className="border p-2 rounded"
                      placeholder="Input"
                      value={tc.input}
                      onChange={(e) =>
                        handleTestCaseChange(i, "input", e.target.value)
                      }
                    />

                    <div className="flex gap-2">
                      <input
                        className="border p-2 rounded w-full"
                        placeholder="Output"
                        value={tc.output}
                        onChange={(e) =>
                          handleTestCaseChange(i, "output", e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => removeTestCase(i)}
                        className="text-red-500 font-bold px-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            {submitting ? "Saving..." : "Publish Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCodingQuestion;