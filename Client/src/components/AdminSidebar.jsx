import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaUserCog,
  FaPlus,
  FaEye,
  FaFileImport,
  FaKey,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  admin,
  handleLogout,
  collapsed,
  setCollapsed,
  isAdmin,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(true);
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false);
  const [quizMenuOpen, setQuizMenuOpen] = useState(false);
  const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
  const [resultMenuOpen, setResultMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    if (["createUser", "viewUsers", "bulkUsers"].includes(activeTab)) {
      setUserMenuOpen(true);
    }

    if (["addSubject", "viewSubjects"].includes(activeTab)) {
      setSubjectMenuOpen(true);
    }

    if (["addQuiz", "viewQuiz", "assignQuiz"].includes(activeTab)) {
      setQuizMenuOpen(true);
    }

    if (["profile", "changePassword"].includes(activeTab)) {
      setAccountMenuOpen(true);
    }
  }, [activeTab]);

  const MenuItem = ({
    icon,
    title,
    active,
    onClick,
    expandable,
    open,
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
      ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <span className="text-lg">{icon}</span>

      {!collapsed && (
        <>
          <span className="ml-3 flex-1 text-left">{title}</span>

          {expandable &&
            (open ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronRight size={12} />
            ))}
        </>
      )}
    </button>
  );

  const SubMenuButton = ({ label, icon, tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-all
      ${
        activeTab === tab
          ? "bg-slate-700 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  return (
    <aside
      className={`h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        {!collapsed && (
          <div>
            <h2 className="text-white font-bold text-lg">
              Placement Portal
            </h2>
            <p className="text-xs text-slate-400">
              Administration
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-300 hover:text-white"
        >
          <FaBars size={18} />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-800">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {admin?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          {!collapsed && (
            <div>
              <h4 className="text-white font-medium">
                {admin?.name}
              </h4>
              <p className="text-xs text-slate-400">
                {admin?.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* USER MANAGEMENT */}
        {isAdmin && (
          <div>
            <MenuItem
              icon={<FaUsers />}
              title="User Management"
              active={["createUser", "viewUsers", "bulkUsers"].includes(
                activeTab
              )}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              expandable
              open={userMenuOpen}
            />

            {!collapsed && userMenuOpen && (
              <div className="ml-4 mt-2 space-y-1">
                <SubMenuButton
                  label="Create User"
                  icon={<FaPlus />}
                  tab="createUser"
                />

                <SubMenuButton
                  label="View Users"
                  icon={<FaEye />}
                  tab="viewUsers"
                />

                <SubMenuButton
                  label="Bulk Upload"
                  icon={<FaFileImport />}
                  tab="bulkUsers"
                />
              </div>
            )}
          </div>
        )}

        {/* SUBJECTS */}
        <div>
          <MenuItem
            icon={<FaBook />}
            title="Subjects"
            active={["addSubject", "viewSubjects"].includes(
              activeTab
            )}
            onClick={() =>
              setSubjectMenuOpen(!subjectMenuOpen)
            }
            expandable
            open={subjectMenuOpen}
          />

          {!collapsed && subjectMenuOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <SubMenuButton
                label="Add Subject"
                icon={<FaPlus />}
                tab="addSubject"
              />

              <SubMenuButton
                label="View Subjects"
                icon={<FaEye />}
                tab="viewSubjects"
              />
            </div>
          )}
        </div>

        {/* QUIZ MANAGEMENT */}
        <div>
          <MenuItem
            icon={<FaClipboardList />}
            title="Quiz Management"
            active={["addQuiz", "viewQuiz", "assignQuiz"].includes(
              activeTab
            )}
            onClick={() => setQuizMenuOpen(!quizMenuOpen)}
            expandable
            open={quizMenuOpen}
          />

          {!collapsed && quizMenuOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <SubMenuButton
                label="Create Quiz"
                icon={<FaPlus />}
                tab="addQuiz"
              />

              <SubMenuButton
                label="View Quiz"
                icon={<FaEye />}
                tab="viewQuiz"
              />

              <SubMenuButton
                label="Assign Quiz"
                icon={<FaClipboardList />}
                tab="assignQuiz"
              />
            </div>
          )}
        </div>
        {/* QUESTION MANAGEMENT */}
        <div>
          <MenuItem
            icon={<FaClipboardList />}
            title="Question Management"
            active={["addQuestion", "viewQuestion", "addCoding", "viewCoding"].includes(
              activeTab
            )}
            onClick={() => setQuestionMenuOpen(!questionMenuOpen)}
            expandable
            open={questionMenuOpen}
          />

          {!collapsed && questionMenuOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <SubMenuButton
                label="Create MCQ"
                icon={<FaPlus />}
                tab="addMCQ"
              />

              <SubMenuButton
                label="View MCQ"
                icon={<FaEye />}
                tab="viewMCQ"
              />

              <SubMenuButton
                label="Add Coding"
                icon={<FaClipboardList />}
                tab="addCoding"
              />
              <SubMenuButton
                label="View Coding"
                icon={<FaClipboardList />}
                tab="viewCoding"
              />
            </div>
          )}
        </div>

        {/* Result MANAGEMENT */}
        <div>
          <MenuItem
            icon={<FaClipboardList />}
            title="Result Management"
            active={["result"].includes(
              activeTab
            )}
            onClick={() => setResultMenuOpen(!resultMenuOpen)}
            expandable
            open={resultMenuOpen}
          />

          {!collapsed && resultMenuOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <SubMenuButton
                label="View Result"
                icon={<FaPlus />}
                tab="viewResult"
              />
              <SubMenuButton
                label="Blocked Students"
                icon={<FaPlus />}
                tab="blockStudents"
              />

              

            </div>
          )}
        </div>

        {/* ACCOUNT */}
        <div>
          <MenuItem
            icon={<FaUserCog />}
            title="Account"
            active={["profile", "changePassword"].includes(
              activeTab
            )}
            onClick={() =>
              setAccountMenuOpen(!accountMenuOpen)
            }
            expandable
            open={accountMenuOpen}
          />

          {!collapsed && accountMenuOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <SubMenuButton
                label="Profile"
                icon={<FaUser />}
                tab="profile"
              />

              <SubMenuButton
                label="Change Password"
                icon={<FaKey />}
                tab="changePassword"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />

          {!collapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;