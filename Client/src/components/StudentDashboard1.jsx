
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiBell,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiBookOpen,
  FiCode,
  FiBriefcase,
  FiAward,
  FiTarget,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiVideo,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

const StudentDashboard1 = () => {
  const [student, setStudent] = useState(null);

  // =========================================================
  // DEMO DATA
  // Replace these values with API data later
  // =========================================================

  const [dashboardData, setDashboardData] = useState({
    pri: 72,
    cgpa: 8.24,
    backlogs: 1,

    placementStatus: "Placement Ready",

    codingScore: 68,
    amcatScore: 74,
    aiInterviewScore: 78,

    githubProjects: 4,
    fsdProjects: 2,
    internships: 1,

    areaOfImprovement: [
      {
        title: "Coding & DSA",
        score: 62,
        target: 80,
        message:
          "Improve problem solving and practice medium/hard DSA problems.",
        icon: <FiCode />,
        color: "blue",
      },
      {
        title: "AMCAT / Aptitude",
        score: 68,
        target: 80,
        message:
          "Practice quantitative aptitude, logical reasoning and verbal ability.",
        icon: <FiBarChart2 />,
        color: "purple",
      },
      {
        title: "AI Mock Interview",
        score: 72,
        target: 85,
        message:
          "Improve communication, confidence and technical explanations.",
        icon: <FiVideo />,
        color: "orange",
      },
      {
        title: "Projects",
        score: 70,
        target: 85,
        message:
          "Add more industry-oriented full-stack and AI projects to GitHub.",
        icon: <FiBriefcase />,
        color: "green",
      },
    ],

    notifications: [
      {
        id: 1,
        title: "New Placement Drive",
        message:
          "TCS placement drive registration is now open.",
        type: "placement",
        time: "10 minutes ago",
        unread: true,
      },
      {
        id: 2,
        title: "AI Mock Interview",
        message:
          "Your AI mock interview assessment is pending.",
        type: "interview",
        time: "1 hour ago",
        unread: true,
      },
      {
        id: 3,
        title: "Coding Assessment",
        message:
          "Complete your weekly coding challenge.",
        type: "coding",
        time: "3 hours ago",
        unread: true,
      },
      {
        id: 4,
        title: "Profile Update",
        message:
          "Add your GitHub and LinkedIn profiles.",
        type: "profile",
        time: "Yesterday",
        unread: false,
      },
    ],
  });

  // =========================================================
  // LOAD USER
  // =========================================================

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);

        setStudent(user);
      }
    } catch (error) {
      console.error(
        "Unable to load student:",
        error
      );
    }
  }, []);

  // =========================================================
  // HELPERS
  // =========================================================

  const getPRIStatus = (score) => {
    if (score >= 85) {
      return {
        label: "Excellent",
        text: "text-green-600",
        bg: "bg-green-100",
      };
    }

    if (score >= 70) {
      return {
        label: "Placement Ready",
        text: "text-blue-600",
        bg: "bg-blue-100",
      };
    }

    if (score >= 50) {
      return {
        label: "Needs Improvement",
        text: "text-orange-600",
        bg: "bg-orange-100",
      };
    }

    return {
      label: "Not Ready",
      text: "text-red-600",
      bg: "bg-red-100",
    };
  };

  const priStatus = getPRIStatus(
    dashboardData.pri
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case "placement":
        return <FiBriefcase />;

      case "interview":
        return <FiVideo />;

      case "coding":
        return <FiCode />;

      case "profile":
        return <FiUser />;

      default:
        return <FiBell />;
    }
  };

  const getProgressColor = (score) => {
    if (score >= 80) {
      return "bg-green-500";
    }

    if (score >= 60) {
      return "bg-blue-500";
    }

    if (score >= 40) {
      return "bg-orange-500";
    }

    return "bg-red-500";
  };

  // =========================================================
  // REFRESH DEMO DATA
  // =========================================================

  const refreshDashboard = () => {
    // Replace this function with API call
    // Example:
    //
    // axios.get(`${API}/student/dashboard`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })

    console.log(
      "Dashboard refresh requested"
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-gray-500">
            Loading dashboard...
          </p>

        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN DASHBOARD
  // =========================================================

  return (
    <div className="space-y-7">

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-blue-700
          via-indigo-700
          to-purple-700
          p-7
          md:p-9
          text-white
          shadow-xl
        "
      >

        <div
          className="
            absolute
            -right-20
            -top-20
            w-72
            h-72
            bg-white/10
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -left-20
            -bottom-32
            w-72
            h-72
            bg-purple-400/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          "
        >

          <div>

            <p className="text-blue-200 mb-1">
              Student Placement Portal
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back,{" "}
              {student.name || "Student"}!
            </h1>

            <p className="mt-3 text-blue-100 max-w-2xl">
              Track your placement preparation,
              improve your skills and become
              industry ready.
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-3
              bg-white/10
              backdrop-blur-md
              px-5
              py-4
              rounded-2xl
              border
              border-white/20
            "
          >

            <FiTarget
              className="text-yellow-300"
              size={30}
            />

            <div>

              <p className="text-sm text-blue-100">
                Placement Status
              </p>

              <p className="font-bold">
                {dashboardData.placementStatus}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          TOP STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* PRI */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
          "
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-sm text-gray-500">
                Placement Readiness Index
              </p>

              <div className="flex items-end gap-2 mt-2">

                <h2 className="text-4xl font-bold text-blue-600">
                  {dashboardData.pri}
                </h2>

                <span className="text-gray-400 mb-1">
                  /100
                </span>

              </div>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FiTarget size={23} />
            </div>

          </div>

          <div className="mt-4">

            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${dashboardData.pri}%`,
                }}
              />

            </div>

          </div>

          <div className="mt-3">

            <span
              className={`
                inline-flex
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${priStatus.bg}
                ${priStatus.text}
              `}
            >
              {priStatus.label}
            </span>

          </div>

        </div>

        {/* CGPA */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
          "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Current CGPA
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-2">
                {dashboardData.cgpa}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FiAward size={23} />
            </div>

          </div>

          <div className="mt-5">

            <div className="flex justify-between text-xs text-gray-500 mb-1">

              <span>
                Academic Performance
              </span>

              <span>
                {(
                  (dashboardData.cgpa / 10) *
                  100
                ).toFixed(0)}
                %
              </span>

            </div>

            <div className="w-full h-2.5 bg-gray-200 rounded-full">

              <div
                className="h-full bg-purple-600 rounded-full"
                style={{
                  width: `${Math.min(
                    dashboardData.cgpa * 10,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* BACKLOGS */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
          "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Current Backlogs
              </p>

              <h2
                className={`
                  text-4xl
                  font-bold
                  mt-2
                  ${
                    dashboardData.backlogs > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                `}
              >
                {dashboardData.backlogs}
              </h2>

            </div>

            <div
              className={`
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                ${
                  dashboardData.backlogs > 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }
              `}
            >
              {dashboardData.backlogs > 0 ? (
                <FiAlertCircle size={23} />
              ) : (
                <FiCheckCircle size={23} />
              )}
            </div>

          </div>

          <p className="text-xs text-gray-500 mt-5">

            {dashboardData.backlogs > 0
              ? "Clear your backlogs to improve placement eligibility."
              : "Excellent! You have no active backlogs."}

          </p>

        </div>

        {/* INTERNSHIP */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            p-6
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
          "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Internships
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {dashboardData.internships}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <FiBriefcase size={23} />
            </div>

          </div>

          <p className="text-xs text-gray-500 mt-5">
            Paid internships can improve your
            placement readiness score.
          </p>

        </div>

      </div>

      {/* =====================================================
          PRI BREAKDOWN + NOTIFICATIONS
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* PRI BREAKDOWN */}

        <div
          className="
            xl:col-span-2
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
            p-6
          "
        >

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Placement Readiness Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your current placement preparation
                performance
              </p>

            </div>

            <button
              onClick={refreshDashboard}
              className="
                p-2
                rounded-lg
                bg-gray-100
                dark:bg-slate-800
                hover:bg-gray-200
                dark:hover:bg-slate-700
              "
              title="Refresh"
            >
              <FiRefreshCw />
            </button>

          </div>

          <div className="space-y-6">

            {/* CGPA */}

            <ProgressRow
              title="Academic CGPA"
              score={Math.round(
                dashboardData.cgpa * 10
              )}
              icon={<FiAward />}
              color="purple"
            />

            {/* Coding */}

            <ProgressRow
              title="Coding / DSA"
              score={dashboardData.codingScore}
              icon={<FiCode />}
              color="blue"
            />

            {/* AMCAT */}

            <ProgressRow
              title="AMCAT / Aptitude"
              score={dashboardData.amcatScore}
              icon={<FiBarChart2 />}
              color="orange"
            />

            {/* AI Interview */}

            <ProgressRow
              title="AI Mock Interview"
              score={
                dashboardData.aiInterviewScore
              }
              icon={<FiVideo />}
              color="green"
            />

            {/* Projects */}

            <ProgressRow
              title="Projects & GitHub"
              score={
                Math.min(
                  dashboardData.githubProjects *
                    15 +
                    dashboardData.fsdProjects *
                      10,
                  100
                )
              }
              icon={<FiBriefcase />}
              color="indigo"
            />

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow-lg
            border
            border-gray-100
            dark:border-slate-700
            p-6
          "
        >

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">

                <FiBell />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Notifications
                </h2>

                <p className="text-xs text-gray-500">
                  Latest updates
                </p>

              </div>

            </div>

            <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">

              {
                dashboardData.notifications.filter(
                  (item) => item.unread
                ).length
              }

            </span>

          </div>

          <div className="space-y-3">

            {dashboardData.notifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-4
                    rounded-xl
                    border
                    transition
                    cursor-pointer
                    hover:shadow-sm
                    ${
                      notification.unread
                        ? "bg-blue-50 border-blue-100 dark:bg-slate-800"
                        : "bg-gray-50 border-gray-100 dark:bg-slate-800"
                    }
                  `}
                >

                  <div className="flex gap-3">

                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-white
                        dark:bg-slate-700
                        flex
                        items-center
                        justify-center
                        text-blue-600
                        flex-shrink-0
                      "
                    >
                      {getNotificationIcon(
                        notification.type
                      )}
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-2">

                        <h4 className="font-semibold text-sm text-gray-800 dark:text-white">

                          {notification.title}

                        </h4>

                        {notification.unread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                        )}

                      </div>

                      <p className="text-xs text-gray-500 mt-1">

                        {notification.message}

                      </p>

                      <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">

                        <FiClock size={11} />

                        {notification.time}

                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          <button
            className="
              w-full
              mt-4
              py-2.5
              rounded-lg
              border
              border-gray-200
              dark:border-slate-700
              text-sm
              font-medium
              text-blue-600
              hover:bg-blue-50
              dark:hover:bg-slate-800
              flex
              items-center
              justify-center
              gap-2
            "
          >
            View All Notifications
            <FiChevronRight />
          </button>

        </div>

      </div>

      {/* =====================================================
          AREAS OF IMPROVEMENT
      ====================================================== */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          shadow-lg
          border
          border-gray-100
          dark:border-slate-700
          p-6
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <FiTrendingUp size={22} />
          </div>

          <div>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Areas of Improvement
            </h2>

            <p className="text-sm text-gray-500">
              Focus on these areas to increase
              your PRI
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          {dashboardData.areaOfImprovement.map(
            (area, index) => (
              <div
                key={index}
                className="
                  border
                  border-gray-200
                  dark:border-slate-700
                  rounded-2xl
                  p-5
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex justify-between items-start">

                  <div
                    className={`
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      ${
                        area.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : area.color === "purple"
                          ? "bg-purple-100 text-purple-600"
                          : area.color === "orange"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >
                    {area.icon}
                  </div>

                  <span className="text-lg font-bold text-gray-700 dark:text-white">
                    {area.score}
                  </span>

                </div>

                <h3 className="font-bold text-gray-800 dark:text-white mt-4">
                  {area.title}
                </h3>

                <div className="mt-3">

                  <div className="flex justify-between text-xs text-gray-500 mb-1">

                    <span>
                      Current
                    </span>

                    <span>
                      Target {area.target}
                    </span>

                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full">

                    <div
                      className={`
                        h-full
                        rounded-full
                        ${getProgressColor(
                          area.score
                        )}
                      `}
                      style={{
                        width: `${area.score}%`,
                      }}
                    />

                  </div>

                </div>

                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  {area.message}
                </p>

                <button
                  className="
                    mt-4
                    text-sm
                    text-blue-600
                    font-semibold
                    flex
                    items-center
                    gap-1
                    hover:gap-2
                    transition-all
                  "
                >
                  Improve Now
                  <FiChevronRight />
                </button>

              </div>
            )
          )}

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <QuickAction
            icon={<FiCode />}
            title="Coding Test"
          />

          <QuickAction
            icon={<FiVideo />}
            title="AI Interview"
          />

          <QuickAction
            icon={<FiFileText />}
            title="Resume"
          />

          <QuickAction
            icon={<FiBookOpen />}
            title="Preparation"
          />

          <QuickAction
            icon={<FiBriefcase />}
            title="Placement Drives"
          />

          <QuickAction
            icon={<FiCalendar />}
            title="My Applications"
          />

        </div>

      </div>

    </div>
  );
};

// =============================================================
// PROGRESS ROW COMPONENT
// =============================================================

const ProgressRow = ({
  title,
  score,
  icon,
  color,
}) => {

  const colorClasses = {
    blue: "bg-blue-600 text-blue-600",
    purple: "bg-purple-600 text-purple-600",
    orange: "bg-orange-500 text-orange-500",
    green: "bg-green-600 text-green-600",
    indigo: "bg-indigo-600 text-indigo-600",
  };

  const selected =
    colorClasses[color] ||
    colorClasses.blue;

  const [
    progressColor,
    textColor,
  ] = selected.split(" ");

  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <div className="flex items-center gap-3">

          <div
            className={`
              w-9
              h-9
              rounded-lg
              bg-gray-100
              dark:bg-slate-800
              ${textColor}
              flex
              items-center
              justify-center
            `}
          >
            {icon}
          </div>

          <span className="font-medium text-gray-700 dark:text-gray-200">
            {title}
          </span>

        </div>

        <span className="font-bold text-gray-800 dark:text-white">
          {score}%
        </span>

      </div>

      <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

        <div
          className={`h-full ${progressColor} rounded-full transition-all`}
          style={{
            width: `${Math.min(
              Math.max(score, 0),
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
};

// =============================================================
// QUICK ACTION COMPONENT
// =============================================================

const QuickAction = ({
  icon,
  title,
}) => {

  return (
    <button
      className="
        bg-white
        dark:bg-slate-900
        border
        border-gray-200
        dark:border-slate-700
        rounded-xl
        p-4
        hover:shadow-lg
        hover:-translate-y-1
        transition
        text-center
      "
    >

      <div className="w-11 h-11 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">

        {icon}

      </div>

      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-3">
        {title}
      </p>

    </button>
  );
};

export default StudentDashboard1;
