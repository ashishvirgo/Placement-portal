import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiShield,
  FiBookOpen,
  FiAward,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import MCQTests from "../components/MCQTests";
import AssignedTests from "../components/AssignedTests";
import Results from "../components/Results";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import PlacementPreparation from "./PlacementPreparation";
import AIInterview from "../components/AIInterview";
import PlacementDrive from "../components/PlacementDrive"
import MyResume from "../components/MyResume"
import StudentDashboard1 from "../components/StudentDashboard1";
import MyApplications from "../components/MyApplications";
const StudentDashboard = () => {
  const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("test");
  const [student, setStudent] = useState(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) navigate("/");
  }, [navigate]);


  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setStudent({
        name: user.name,
        userId: user.userId,
        email: user.email,
        role: user.role,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <StudentDashboard1/>;
      case "applications":
        return <MyApplications/>;
      case "Placement-Preparation":
        return <PlacementPreparation/>;
      case "test":
        return <MCQTests navigate={navigate} />;

      case "assigned":
        return <AssignedTests />;

      case "resume":
        return <MyResume />;  
        
      case "interview":
        return <AIInterview />;

      case "drive":
        return <PlacementDrive />;

      case "result":
        return <Results />;

      case "profile":
        return <Profile student={student} />;

      case "password":
        return <ChangePassword />;

      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            Page not found
          </div>
        );
    }
  };

  if (!student) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        theme={theme}
        toggleTheme={() =>
          setTheme(
            theme === "light"
              ? "dark"
              : "light"
          )
        }
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-8">
        
        {/* Welcome Banner */}
        {/* <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl mb-8">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">
                Welcome Back, {student.name}
              </h1>

              <p className="mt-2 text-blue-100">
                Continue your learning journey and
                complete your assessments.
              </p>
            </div>

            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-sm">
              <FiUser />
            </div>
          </div>
        </div> */}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                <FiUser />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  User ID
                </p>
                <h3 className="font-bold text-lg dark:text-white">
                  {student.userId}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                <FiMail />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <h3 className="font-semibold dark:text-white break-all">
                  {student.email}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                <FiShield />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Role
                </p>

                <h3 className="font-bold text-lg dark:text-white capitalize">
                  {student.role}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Header */}
        {/* <div className="flex items-center gap-3 mb-6">
          <FiBookOpen className="text-blue-600 text-2xl" />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Learning Workspace
          </h2>

          <FiAward className="text-yellow-500 text-2xl" />
        </div> */}

        {/* Dynamic Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-5 lg:p-8 border border-gray-100 dark:border-gray-700">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;