import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiMoon,
  FiSun,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import TeacherSidebar from "../components/TeacherSidebar";
import AddQuestion from "../components/AddQuestion";
import ViewQuestions from "../components/ViewQuestions";
import CreateQuiz from "../components/CreateQuiz";
import AssignQuiz from "../components/AssignQuiz";
import AddCodingQuestion from "../components/AddCodingQuestion";
import ViewCodingQuestions from "../components/ViewCodingQuestions";
import ViewQuiz from "../components/ViewQuiz";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // ================= THEME =================
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ================= SIDEBAR =================
  const [collapsed, setCollapsed] = useState(false);

  // ================= ACTIVE TAB =================
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("teacherTab") || "add"
  );

  useEffect(() => {
    localStorage.setItem("teacherTab", activeTab);
  }, [activeTab]);

  // ================= AUTH =================
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const teacher = {
    name: "Teacher",
    email: "teacher@mail.com",
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ================= TITLE =================
  const getTitle = () => {
    const titles = {
      add: "Add Question",
      view: "View Questions",
      quiz: "Create Quiz",
      viewquiz: "View Quiz",
      assign: "Assign Quiz",
      addcoding: "Add Coding Question",
      viewcoding: "View Coding Questions",
    };
    return titles[activeTab] || "Dashboard";
  };

  // ================= CONTENT =================
  const renderTab = () => {
    const components = {
      add: <AddQuestion />,
      view: <ViewQuestions />,
      addcoding: <AddCodingQuestion />,
      viewcoding: <ViewCodingQuestions />,
      quiz: <CreateQuiz />,
      viewquiz: <ViewQuiz />,
      assign: <AssignQuiz />,
    };
    return components[activeTab] || (
      <div className="text-gray-500">Not Found</div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">

      {/* ================= SIDEBAR ================= */}
      <TeacherSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teacher={teacher}
        theme={theme}
        toggleTheme={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
        handleLogout={handleLogout}
      />

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FiMenu />
            </button>

            <div>
              <h1 className="text-lg font-semibold">{getTitle()}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Teacher Dashboard / {getTitle()}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* USER */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <FiUser />
              <span className="text-sm">{teacher.name}</span>
            </div>

            {/* THEME */}
            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 min-h-full transition-all">

            {/* PAGE CONTENT */}
            <div key={activeTab} className="animate-fadeIn">
              {renderTab()}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;