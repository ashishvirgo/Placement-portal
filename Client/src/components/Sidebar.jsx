import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMenu,
  FiLogOut,
  FiMoon,
  FiSun,
  FiUser,
  FiLock,
  FiCode,
  FiClipboard,
  FiBarChart2,
} from "react-icons/fi";

import { MdOutlineQuiz } from "react-icons/md";

import { HiOutlineAcademicCap } from "react-icons/hi";

const Sidebar = ({
  collapsed,
  setCollapsed,
  activeTab,
  setActiveTab,
  student,
  theme,
  toggleTheme,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const tabs = [
    {
      key: "profile",
      label: "My Profile",
      icon: <FiUser size={20} />,
    },
    {
      key: "resume",
      label: "My Resume",
      icon: <FiUser size={20} />,
    },
    {
      key: "Exam-Info",
      label: "Exam Info",
      icon: <MdOutlineQuiz size={20} />,
    },
     {
      key: "Chapter-wise-Syllabus",
      label: "Chapter wise Syllabus",
      icon: <MdOutlineQuiz size={20} />,
    },
    {
      key: "test",
      label: "Mock Tests",
      icon: <MdOutlineQuiz size={20} />,
    },
    {
      key: "assigned",
      label: "Assigned Tests",
      icon: <FiClipboard size={20} />,
    },
    {
      key: "result",
      label: "Results",
      icon: <FiBarChart2 size={20} />,
    },
    
    {
      key: "password",
      label: "Change Password",
      icon: <FiLock size={20} />,
    },
  ];

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-72"}
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-700
        shadow-xl
        transition-all duration-300
        flex flex-col justify-between
        h-screen
      `}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-5 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <HiOutlineAcademicCap size={26} />
                </div>

                <div>
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    Student Placement Portal
                  </h2>

                  <p className="text-xs text-gray-500">
                    Training and Placement 
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="
                p-2 rounded-lg
                hover:bg-gray-100
                dark:hover:bg-slate-800
                text-gray-600
                dark:text-gray-300
              "
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>

        {/* Student Info */}
        {!collapsed && (
          <div className="mx-4 mt-5 mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <FiUser size={22} />
              </div>

              <div className="overflow-hidden">
                <h3 className="font-semibold truncate">
                  {student?.name}
                </h3>

                <p className="text-xs text-blue-100 truncate">
                  {student?.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="px-3">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    w-full flex items-center
                    ${collapsed ? "justify-center" : "gap-3"}
                    px-4 py-3 rounded-xl
                    transition-all duration-200
                    font-medium

                    ${
                      activeTab === tab.key
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  {tab.icon}

                  {!collapsed && (
                    <span>{tab.label}</span>
                  )}
                </button>
              </li>
            ))}

            {/* Coding Test */}
            <li>
              <button
                onClick={() => navigate("/coding")}
                className="
                  w-full flex items-center
                  gap-3 px-4 py-3 rounded-xl
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition-all
                "
              >
                <FiCode size={20} />

                {!collapsed && (
                  <span>Coding Test</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            w-full flex items-center
            justify-center gap-3
            px-4 py-3 rounded-xl
            bg-gray-100 dark:bg-slate-800
            hover:bg-gray-200 dark:hover:bg-slate-700
            transition-all
            text-gray-700 dark:text-gray-300
          "
        >
          {theme === "light" ? (
            <FiMoon size={20} />
          ) : (
            <FiSun size={20} />
          )}

          {!collapsed && (
            <span>
              {theme === "light"
                ? "Dark Mode"
                : "Light Mode"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center
            justify-center gap-3
            px-4 py-3 rounded-xl
            bg-red-500 hover:bg-red-600
            text-white font-medium
            transition-all shadow-lg
          "
        >
          <FiLogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;