import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreateUser from "../components/CreateUser";
import ViewUsers from "../components/ViewUsers";
import BulkUsers from "../components/BulkUsers";
import Reports from "../components/Reports";
import Profile from "../components/Profile"
import ChangePassword from "../components/ChangePassword"
import AddSubject from "../components/AddSubject";
import ViewSubjects from "../components/ViewSubjects";

import AddQuiz from "../components/CreateQuiz";
import ViewQuiz from "../components/ViewQuiz";
import AssignQuiz from "../components/AssignQuiz";
import ResultView from "../components/ResultView"

import AdminSidebar from "../components/AdminSidebar";
import AddQuestion from "../components/AddQuestion";
import ViewQuestions from "../components/ViewQuestions";
import AddCodingQuestion from "../components/AddCodingQuestion";
import BlockedStudents from "../components/BlockedStudents";

const AdminDashboard = () => {
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
    localStorage.getItem("adminTab") || "viewUsers"
  );

  // Persist tab
  useEffect(() => {
    localStorage.setItem("adminTab", activeTab);
  }, [activeTab]);

  // ================= ADMIN DATA =================
  const admin =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Admin User",
      email: "admin@example.com",
      userId: "ADMIN001",
      role: "admin",
    };

  // ================= AUTH CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = JSON.parse(localStorage.getItem("user"))?.role;

    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ================= TAB RENDER =================
  const renderTab = () => {
    switch (activeTab) {
      // USER
      case "createUser":
        return <CreateUser />;
      case "viewUsers":
        return <ViewUsers />;
      case "bulkUsers":
        return <BulkUsers />;

      // SUBJECT
      case "addSubject":
        return <AddSubject />;
      case "viewSubjects":
        return <ViewSubjects />;

      // QUIZ
      case "addQuiz":
        return <AddQuiz />;
      case "viewQuiz":
        return <ViewQuiz />;
      case "assignQuiz":
        return <AssignQuiz />;
      
      // QUESTION
      case "addMCQ":
        return <AddQuestion/>;
      case "viewMCQ":
        return <ViewQuestions />;
      case "addCoding":
        return <AddCodingQuestion />; 
      case "profile":
        return <Profile />;
      case "changePassword":
        return <ChangePassword />;
      // RESULT
      case "viewResult":
        return <ResultView />;
      case "blockStudents":
        return <BlockedStudents/>  

      default:
        return (
          <div className="text-center text-gray-500">
            Invalid tab selected
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <div className="transition-all duration-300">
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          admin={admin}   // ✅ fixed
          theme={theme}
          toggleTheme={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
          handleLogout={handleLogout}
          isAdmin={true}
        />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white overflow-y-auto">

        {/* HEADER */}
        <div className="p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Welcome, {admin.name}
            </p>
          </div>

          {/* THEME BUTTON */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {renderTab()}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;