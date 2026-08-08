import React, {
  useEffect,
  useState
} from "react";
import {
  FaClipboardList,
  FaUsers,
  FaCheckCircle,
  FaSearch,
  FaUserGraduate
} from "react-icons/fa";

import {
  MdAssignmentTurnedIn
} from "react-icons/md";

import {
  HiOutlineAcademicCap
} from "react-icons/hi";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const AssignQuiz = () => {
  const [quizzes, setQuizzes] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [selectedQuiz, setSelectedQuiz] =
    useState("");

  const [
    selectedStudents,
    setSelectedStudents
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [quizRes, studentRes] =
        await Promise.all([
          axios.get(`${API}/quiz`),

          axios.get(
            `${API}/user/students`
          )
        ]);
      console.log("Quiz=",quizRes.data)
      setQuizzes(
        quizRes.data || []
      );
     console.log("students=",studentRes.data.students)
      setStudents(
        studentRes.data.students || []
      );

    } catch (err) {
      console.error(err);

      alert(
        "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= SELECT STUDENT =================
  const toggleStudent = (id) => {
    const exists =
      selectedStudents.includes(id);

    if (exists) {
      setSelectedStudents(
        selectedStudents.filter(
          (s) => s !== id
        )
      );
    } else {
      setSelectedStudents([
        ...selectedStudents,
        id
      ]);
    }
  };

  // ================= ASSIGN =================
  const handleAssign =
    async () => {
      if (!selectedQuiz) {
        return alert(
          "Select quiz"
        );
      }

      if (
        selectedStudents.length ===
        0
      ) {
        return alert(
          "Select students"
        );
      }

      try {
        await axios.put(
          `${API}/quiz/${selectedQuiz}`,
          {
            quizType:
              "assigned",

            students:
              selectedStudents
          }
        );

        alert(
          "Quiz assigned successfully"
        );

        setSelectedQuiz("");

        setSelectedStudents([]);

      } catch (err) {
        console.error(err);

        alert(
          "Assignment failed"
        );
      }
    };

 return (
  <div className="max-w-7xl mx-auto p-6">

    {/* HEADER */}
    <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl mb-8">

      <div className="flex justify-between items-center flex-wrap gap-4">

        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MdAssignmentTurnedIn />
            Assign Quiz
          </h1>

          <p className="mt-2 text-blue-100">
            Assign assessments to selected students
          </p>
        </div>

        <div className="bg-white/20 px-5 py-3 rounded-2xl backdrop-blur">
          <p className="text-sm">
            Students Selected
          </p>

          <h2 className="text-3xl font-bold">
            {selectedStudents.length}
          </h2>
        </div>

      </div>
    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-3 gap-5 mb-8">

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Total Quizzes
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {quizzes.length}
            </h2>
          </div>

          <FaClipboardList
            className="text-indigo-600"
            size={32}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Students
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {students.length}
            </h2>
          </div>

          <FaUsers
            className="text-green-600"
            size={32}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Selected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {selectedStudents.length}
            </h2>
          </div>

          <FaCheckCircle
            className="text-blue-600"
            size={32}
          />
        </div>
      </div>

    </div>

    {/* MAIN GRID */}
    <div className="grid lg:grid-cols-3 gap-6">

      {/* QUIZ SELECTION */}
      <div className="lg:col-span-1">

        <div className="bg-white rounded-3xl shadow border p-6">

          <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
            <HiOutlineAcademicCap />
            Select Quiz
          </h3>

          <select
            value={selectedQuiz}
            onChange={(e) =>
              setSelectedQuiz(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">
              Choose Quiz
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

          {selectedQuiz && (
            <div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-xl">

              <p className="text-sm text-gray-600">
                Selected Quiz
              </p>

              <p className="font-semibold text-blue-700">
                {
                  quizzes.find(
                    (q) =>
                      q._id ===
                      selectedQuiz
                  )?.title
                }
              </p>

            </div>
          )}

        </div>

      </div>

      {/* STUDENTS */}
      <div className="lg:col-span-2">

        <div className="bg-white rounded-3xl shadow border">

          <div className="p-6 border-b">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl flex items-center gap-2">
                <FaUserGraduate />
                Students
              </h3>

              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                {selectedStudents.length} Selected
              </div>

            </div>

          </div>

          <div className="max-h-[500px] overflow-y-auto">

            {students.map((student) => {

              const selected =
                selectedStudents.includes(
                  student._id
                );

              return (
                <div
                  key={student._id}
                  onClick={() =>
                    toggleStudent(
                      student._id
                    )
                  }
                  className={`p-5 border-b cursor-pointer transition-all duration-200 flex justify-between items-center ${
                    selected
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        selected
                          ? "bg-green-600"
                          : "bg-indigo-600"
                      }`}
                    >
                      {student.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <h4 className="font-semibold">
                        {student.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {student.email}
                      </p>

                      <p className="text-xs text-gray-400">
                        {student.userId}
                      </p>
                    </div>

                  </div>

                  <div>
                    {selected ? (
                      <FaCheckCircle
                        size={24}
                        className="text-green-600"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    )}
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </div>

    </div>

    {/* ACTION BAR */}
    <div className="mt-8 bg-white rounded-3xl shadow border p-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h4 className="font-semibold">
            Ready to Assign
          </h4>

          <p className="text-sm text-gray-500">
            Quiz will be assigned to{" "}
            {selectedStudents.length}
            {" "}students
          </p>
        </div>

        <button
          onClick={handleAssign}
          disabled={
            !selectedQuiz ||
            selectedStudents.length === 0
          }
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Assign Quiz
        </button>

      </div>

    </div>

  </div>
);
};

export default AssignQuiz;