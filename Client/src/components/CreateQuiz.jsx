import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaBook, 
  FaTags, 
  FaChartBar, 
  FaClock, 
  FaMinusCircle, 
  FaSearch, 
  FaPlus, 
  FaCheckCircle, 
  FaQuestionCircle,
  FaCode,
  FaLightbulb
} from "react-icons/fa";
import { MdTitle, MdCategory } from "react-icons/md";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizType, setQuizType] = useState("sample");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [duration, setDuration] = useState(30);
  const [negativeMarking, setNegativeMarking] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH SUBJECTS =================
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${API}/subjects`);
      setSubjects(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH QUESTIONS =================
  const fetchQuestions = async () => {
    try {
      if (!subject) {
        return alert("Please select subject");
      }

      setLoading(true);

      // ================= MCQ =================
      const mcqRes = await axios.get(`${API}/questions`, {
        params: { subject, topic, difficulty },
      });
       console.log("mcqRes=",mcqRes);
      // ================= CODING =================
      const codingRes = await axios.get(`${API}/coding-questions`, {
        params: { subject, topic, difficulty },
      });

      const mcqQuestions = mcqRes.data.questions || mcqRes.data || [];
      const codingQuestions = codingRes.data.questions || codingRes.data || [];

      const filteredMCQ = mcqQuestions.filter(
        (q) => q.subject === subject || q.subject?._id === subject
      );

      const filteredCoding = codingQuestions.filter(
        (q) => q.subject === subject || q.subject?._id === subject
      );

      const combined = [...filteredMCQ, ...filteredCoding];
      setQuestions(combined);
      setSelectedQuestions([]);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE QUESTION =================
  const toggleQuestion = (q) => {
    const exists = selectedQuestions.find((x) => x._id === q._id);

    if (exists) {
      setSelectedQuestions(selectedQuestions.filter((x) => x._id !== q._id));
      return;
    }

    if (selectedQuestions.length >= numQuestions) {
      return alert(`Maximum ${numQuestions} questions allowed`);
    }

    setSelectedQuestions([
      ...selectedQuestions,
      {
        ...q,
        marks: 1,
        questionType: q.question ? "Question" : "CodingQuestion",
      },
    ]);
  };

  // ================= UPDATE MARKS =================
  const updateMarks = (id, value) => {
    setSelectedQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, marks: Number(value) } : q
      )
    );
  };

  // ================= CREATE QUIZ =================
  const handleCreate = async () => {
    if (!title.trim()) return alert("Enter quiz title");
    if (!subject) return alert("Select subject");
    if (selectedQuestions.length === 0) return alert("Select at least one question");

    const payload = {
      title,
      subject,
      topic,
      difficulty,
      duration,
      negativeMarking,
      quizType,
      questions: selectedQuestions.map((q) => ({
        questionId: q._id,
        questionType: q.questionType,
        marks: q.marks,
      })),
    };

    try {
      await axios.post(`${API}/quiz`, payload);
      alert("Quiz Created Successfully");

      // RESET
      setTitle("");
      setTopic("");
      setDifficulty("");
      setSelectedQuestions([]);
      setSelectedStudents([]);
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaLightbulb className="text-4xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Create New Quiz</h1>
              <p className="text-indigo-100 mt-1">Design a powerful assessment in minutes</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN - FORM */}
            <div className="space-y-8">
              {/* TITLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MdTitle className="text-xl text-indigo-600" />
                  QUIZ TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mid-Term Computer Science"
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* QUIZ TYPE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MdCategory className="text-xl text-indigo-600" />
                  QUIZ TYPE
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setQuizType("sample");
                      setSelectedStudents([]);
                    }}
                    className={`flex-1 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                      quizType === "sample"
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaBook /> Sample Quiz
                  </button>
                  <button
                    onClick={() => setQuizType("assigned")}
                    className={`flex-1 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                      quizType === "assigned"
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaCheckCircle /> Assigned Quiz
                  </button>
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaBook className="text-xl text-indigo-600" />
                  SUBJECT
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* TOPIC & DIFFICULTY */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaTags className="text-xl text-indigo-600" />
                    TOPIC
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Arrays"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaChartBar className="text-xl text-indigo-600" />
                    DIFFICULTY
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* SETTINGS GRID */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaQuestionCircle className="text-xl text-indigo-600" />
                    QUESTIONS
                  </label>
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaClock className="text-xl text-indigo-600" />
                    DURATION
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">min</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaMinusCircle className="text-xl text-indigo-600" />
                    NEGATIVE
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={negativeMarking}
                    onChange={(e) => setNegativeMarking(Number(e.target.value))}
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* LOAD BUTTON */}
              <button
                onClick={fetchQuestions}
                disabled={loading || !subject}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 transition-all text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 text-lg active:scale-[0.985]"
              >
                <FaSearch />
                {loading ? "LOADING QUESTIONS..." : "LOAD AVAILABLE QUESTIONS"}
              </button>
            </div>

            {/* RIGHT COLUMN - QUESTIONS PREVIEW */}
            <div>
              <div className="sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FaQuestionCircle className="text-indigo-600" />
                    Available Questions
                  </h3>
                  <div className="text-sm text-gray-500">
                    Selected: <span className="font-mono font-bold text-indigo-600">{selectedQuestions.length}</span>/{numQuestions}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-5 max-h-[620px] overflow-y-auto custom-scroll">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4" />
                      Loading questions...
                    </div>
                  ) : questions.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <FaSearch className="mx-auto text-5xl mb-4 opacity-40" />
                      <p>No questions found</p>
                      <p className="text-sm mt-1">Try adjusting filters</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {questions.map((q) => {
                        const isSelected = selectedQuestions.find((x) => x._id === q._id);
                        return (
                          <div
                            key={q._id}
                            onClick={() => toggleQuestion(q)}
                            className={`group border rounded-2xl p-5 transition-all cursor-pointer hover:shadow-md ${
                              isSelected
                                ? "bg-emerald-50 border-emerald-400 shadow-sm"
                                : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                                isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                              }`}>
                                {isSelected ? <FaCheckCircle size={14} /> : <FaPlus size={14} />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium line-clamp-2 text-gray-800">
                                  {q.question || q.title}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  <div className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                    {q.topic || "General"}
                                  </div>
                                  <div className={`inline-flex items-center px-3 py-1 text-xs rounded-full text-white ${
                                    q.difficulty === "easy" ? "bg-emerald-500" :
                                    q.difficulty === "medium" ? "bg-amber-500" : "bg-rose-500"
                                  }`}>
                                    {q.difficulty}
                                  </div>
                                  <div className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-violet-100 text-violet-700">
                                    {q.question ? (
                                      <>MCQ <FaQuestionCircle className="ml-1" /></>
                                    ) : (
                                      <>Coding <FaCode className="ml-1" /></>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="ml-auto pl-4 border-l border-gray-200">
                                  <label className="text-xs text-gray-500 block mb-1">Marks</label>
                                  <input
                                    type="number"
                                    min={1}
                                    value={isSelected.marks}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      updateMarks(q._id, e.target.value);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-16 text-center py-2 text-lg font-semibold border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CREATE BUTTON */}
          <button
            onClick={handleCreate}
            className="mt-12 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 rounded-3xl text-xl font-semibold shadow-xl shadow-emerald-500/30 transition-all active:scale-[0.985] flex items-center justify-center gap-3"
          >
            <FaCheckCircle className="text-2xl" />
            CREATE QUIZ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;