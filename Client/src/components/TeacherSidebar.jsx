import React from "react";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  FileText,
  Send,
  Moon,
  Sun,
  LogOut,
  Menu,
  UserCircle2,
  Code2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const TeacherSidebar = ({
  collapsed,
  setCollapsed,
  activeTab,
  setActiveTab,
  teacher,
  theme,
  toggleTheme,
  handleLogout,
}) => {
  const menuItems = [
    {
      key: "add",
      label: "Add Question",
      icon: PlusCircle,
    },
    {
      key: "view",
      label: "Question Bank",
      icon: ClipboardList,
    },
    {
      key: "addcoding",
      label: "Add Coding",
      icon: Code2,
    },
    {
      key: "viewcoding",
      label: "Coding Bank",
      icon: Code2,
    },
    {
      key: "quiz",
      label: "Create Quiz",
      icon: FileText,
    },
    {
      key: "viewquiz",
      label: "Manage Quiz",
      icon: BookOpen,
    },
    {
      key: "assign",
      label: "Assign Quiz",
      icon: Send,
    },
  ];

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-72"}
        h-screen
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-700
        shadow-2xl
        flex flex-col
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <LayoutDashboard size={24} />
              </div>

              <div>
                <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                  Teacher Panel
                </h2>

                <p className="text-xs text-gray-500">
                  Assessment System
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
              transition
            "
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Teacher Profile */}
      {!collapsed && (
        <div className="m-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
              <UserCircle2 size={34} />
            </div>

            <div className="overflow-hidden">
              <h3 className="font-semibold truncate">
                {teacher?.name}
              </h3>

              <p className="text-sm text-blue-100 truncate">
                {teacher?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`
                    relative w-full flex items-center
                    ${collapsed ? "justify-center" : "justify-between"}
                    px-4 py-3 rounded-xl
                    transition-all duration-200
                    group

                    ${
                      activeTab === item.key
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />

                    {!collapsed && (
                      <span className="font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!collapsed &&
                    activeTab === item.key && (
                      <ChevronRight size={18} />
                    )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
        
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="
            w-full flex items-center
            justify-center gap-3
            px-4 py-3 rounded-xl
            bg-gray-100 dark:bg-slate-800
            hover:bg-gray-200 dark:hover:bg-slate-700
            transition
          "
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}

          {!collapsed && (
            <span>
              {theme === "dark"
                ? "Light Mode"
                : "Dark Mode"}
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
            text-white
            font-medium
            transition
            shadow-lg
          "
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;