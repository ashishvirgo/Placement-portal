
import React from "react";

import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiLock,
  FiFileText,
  FiBriefcase,
  FiClipboard,
  FiBookOpen,
  FiCode,
  FiBarChart2,
  FiCheckCircle,
  FiAward,
  FiMessageSquare,
} from "react-icons/fi";

import { MdOutlineQuiz } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";

const Sidebar = ({
  collapsed,
  setCollapsed,
  activeTab,
  setActiveTab,
  student,
  handleLogout,
}) => {
  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <FiUser size={20} />,
    },
    {
      key: "profile",
      label: "My Profile",
      icon: <FiUser size={20} />,
    },

    {
      key: "resume",
      label: "My Resume",
      icon: <FiFileText size={20} />,
    },

    {
      key: "drive",
      label: "Placement Drives",
      icon: <FiBriefcase size={20} />,
    },

    {
      key: "applications",
      label: "My Applications",
      icon: <FiClipboard size={20} />,
    },

    {
      key: "Placement-Preparation",
      label: "Placement Preparation",
      icon: <HiOutlineAcademicCap size={22} />,
    },

    {
      key: "test",
      label: "Mock Tests",
      icon: <MdOutlineQuiz size={22} />,
    },

    {
      key: "interview",
      label: "AI Mock Interview",
      icon: <FiMessageSquare size={20} />,
    },

    {
      key: "coding",
      label: "Coding Practice",
      icon: <FiCode size={20} />,
    },

    {
      key: "assigned",
      label: "Assigned Tests",
      icon: <FiCheckCircle size={20} />,
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
        flex flex-col
        h-screen
        flex-shrink-0
      `}
    >
      {/* =====================================================
          TOP SECTION
      ===================================================== */}

      <div className="flex-1 overflow-y-auto">

        {/* Logo / Header */}

        <div
          className={`
            flex items-center
            ${collapsed ? "justify-center" : "justify-between"}
            px-4 py-5
            border-b border-gray-200
            dark:border-slate-700
          `}
        >

          {!collapsed && (
            <div className="flex items-center gap-3">

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-white
                  flex items-center
                  justify-center
                  shadow-lg
                "
              >
                <FiBriefcase size={23} />
              </div>

              <div>

                <h2
                  className="
                    font-bold
                    text-lg
                    text-gray-800
                    dark:text-white
                  "
                >
                  Student Placement Portal
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Training & Placement
                </p>

              </div>

            </div>
          )}

          {/* Collapse Button */}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-slate-800
              text-gray-600
              dark:text-gray-300
              transition
            "
            title={
              collapsed
                ? "Expand Sidebar"
                : "Collapse Sidebar"
            }
          >
            <FiMenu size={22} />
          </button>

        </div>

        {/* =====================================================
            STUDENT INFORMATION
        ===================================================== */}

        {!collapsed && (
          <div
            className="
              mx-4
              mt-5
              mb-6
              p-4
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              shadow-lg
            "
          >

            <div className="flex items-center gap-3">

              {/* Avatar */}

              <div
                className="
                  h-12
                  w-12
                  rounded-full
                  bg-white/20
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <FiUser size={22} />
              </div>

              {/* Student */}

              <div className="overflow-hidden">

                <h3 className="font-semibold truncate">
                  {student?.name || "Student"}
                </h3>

                <p className="text-xs text-blue-100 truncate">
                  {student?.email || ""}
                </p>

                {student?.userId && (
                  <p className="text-xs text-blue-200 mt-1">
                    ID: {student.userId}
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            PLACEMENT MENU
        ===================================================== */}

        <nav className="px-3">

          {!collapsed && (
            <p
              className="
                px-3
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-gray-400
                dark:text-gray-500
              "
            >
              Placement
            </p>
          )}

          <ul className="space-y-1">

            {tabs.map((tab) => (

              <li key={tab.key}>

                <button
                  onClick={() =>
                    setActiveTab(tab.key)
                  }
                  title={
                    collapsed
                      ? tab.label
                      : ""
                  }
                  className={`
                    w-full
                    flex
                    items-center
                    ${
                      collapsed
                        ? "justify-center"
                        : "gap-3"
                    }
                    px-4
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    font-medium

                    ${
                      activeTab === tab.key
                        ? `
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-600
                          text-white
                          shadow-lg
                        `
                        : `
                          text-gray-700
                          dark:text-gray-300
                          hover:bg-gray-100
                          dark:hover:bg-slate-800
                        `
                    }
                  `}
                >

                  {/* Icon */}

                  <span
                    className={`
                      flex-shrink-0
                      ${
                        activeTab ===
                        tab.key
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    `}
                  >
                    {tab.icon}
                  </span>

                  {/* Label */}

                  {!collapsed && (
                    <span className="truncate">
                      {tab.label}
                    </span>
                  )}

                </button>

              </li>

            ))}

          </ul>

        </nav>

      </div>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div
        className="
          p-4
          border-t
          border-gray-200
          dark:border-slate-700
        "
      >

       

        {/* Logout */}

        <button
          onClick={handleLogout}
          title={
            collapsed
              ? "Logout"
              : ""
          }
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500
            hover:bg-red-600
            text-white
            font-medium
            transition-all
            shadow-lg
          "
        >

          <FiLogOut size={20} />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;

