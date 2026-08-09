import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaClipboardList,
  FaUserCheck,
  FaCalendarAlt,
  FaBell,
  FaChartBar,
  FaPlus,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileAlt,
  FaSearch,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";

const PlacementCoordinatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // -------------------------------------------------
  // DEMO DATA
  // Replace these with API data later
  // -------------------------------------------------

  const stats = [
    {
      title: "Department Students",
      value: "324",
      description: "Registered for placement",
      icon: <FaUsers />,
    },
    {
      title: "Eligible Students",
      value: "286",
      description: "Eligible for current drives",
      icon: <FaUserCheck />,
    },
    {
      title: "Active Drives",
      value: "12",
      description: "Currently active",
      icon: <FaBriefcase />,
    },
    {
      title: "Students Placed",
      value: "168",
      description: "Current academic year",
      icon: <FaCheckCircle />,
    },
  ];

  const upcomingDrives = [
    {
      company: "TCS",
      position: "Software Engineer",
      date: "12 Aug 2026",
      package: "7.5 LPA",
      eligible: 186,
      registered: 164,
      status: "Upcoming",
    },
    {
      company: "Infosys",
      position: "Systems Engineer",
      date: "16 Aug 2026",
      package: "6.5 LPA",
      eligible: 214,
      registered: 198,
      status: "Upcoming",
    },
    {
      company: "Accenture",
      position: "ASE",
      date: "20 Aug 2026",
      package: "6 LPA",
      eligible: 175,
      registered: 152,
      status: "Upcoming",
    },
    {
      company: "Deloitte",
      position: "Analyst",
      date: "24 Aug 2026",
      package: "8 LPA",
      eligible: 142,
      registered: 127,
      status: "Upcoming",
    },
  ];

  const studentApplications = [
    {
      name: "Rahul Sharma",
      rollNo: "CSE21001",
      cgpa: "8.7",
      company: "TCS",
      position: "Software Engineer",
      status: "Shortlisted",
    },
    {
      name: "Priya Singh",
      rollNo: "CSE21014",
      cgpa: "9.1",
      company: "Infosys",
      position: "Systems Engineer",
      status: "Applied",
    },
    {
      name: "Aman Kumar",
      rollNo: "CSE21025",
      cgpa: "8.9",
      company: "Accenture",
      position: "ASE",
      status: "Selected",
    },
    {
      name: "Neha Gupta",
      rollNo: "CSE21031",
      cgpa: "8.3",
      company: "Deloitte",
      position: "Analyst",
      status: "Rejected",
    },
  ];

  const interviews = [
    {
      student: "Rahul Sharma",
      company: "TCS",
      round: "Technical",
      date: "12 Aug 2026",
      time: "10:00 AM",
      mode: "Online",
    },
    {
      student: "Priya Singh",
      company: "Infosys",
      round: "Technical",
      date: "16 Aug 2026",
      time: "11:30 AM",
      mode: "Online",
    },
    {
      student: "Aman Kumar",
      company: "Accenture",
      round: "HR",
      date: "20 Aug 2026",
      time: "02:00 PM",
      mode: "Offline",
    },
  ];

  const notifications = [
    {
      title: "TCS registration deadline tomorrow",
      time: "10 minutes ago",
      type: "warning",
    },
    {
      title: "15 students shortlisted by Infosys",
      time: "1 hour ago",
      type: "success",
    },
    {
      title: "Deloitte drive schedule updated",
      time: "3 hours ago",
      type: "info",
    },
  ];

  // -------------------------------------------------
  // STATUS CLASS
  // -------------------------------------------------

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";

      case "Shortlisted":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Applied":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // -------------------------------------------------
  // SIDEBAR ITEM
  // -------------------------------------------------

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: "students",
      label: "Students",
      icon: <FaUsers />,
    },
    {
      id: "companies",
      label: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: "drives",
      label: "Placement Drives",
      icon: <FaBriefcase />,
    },
    {
      id: "eligibility",
      label: "Eligibility",
      icon: <FaUserCheck />,
    },
    {
      id: "applications",
      label: "Applications",
      icon: <FaClipboardList />,
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: <FaCalendarAlt />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FaChartBar />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FaBell />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-white border-b sticky top-0 z-50">

        <div className="px-6 py-4 flex items-center justify-between">

          {/* Logo / Title */}

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Placement Coordinator
            </h1>

            <p className="text-sm text-gray-500">
              Department Placement Management
            </p>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-6">

            {/* Notification */}

            <button
              onClick={() => setActiveTab("notifications")}
              className="relative text-gray-600 hover:text-blue-600"
            >
              <FaBell size={21} />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                PC
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Placement Coordinator
                </p>

                <p className="text-xs text-gray-500">
                  CSE Department
                </p>
              </div>

            </div>

          </div>

        </div>

      </header>

      <div className="flex">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">

          <nav className="p-4 space-y-1">

            {menuItems.map((item) => (

              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >

                <span>
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>

              </button>

            ))}

          </nav>

        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="flex-1 p-6">

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {activeTab === "dashboard" && (

            <>

              {/* Welcome */}

              <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                  Placement Overview
                </h2>

                <p className="text-gray-500 mt-1">
                  Monitor placement activities for your department.
                </p>

              </div>

              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}

              <div className="flex flex-wrap gap-3 mb-6">

                <button
                  onClick={() => setActiveTab("drives")}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <FaPlus />
                  Register Drive
                </button>

                <button
                  onClick={() => setActiveTab("eligibility")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                >
                  <FaUserCheck />
                  Check Eligibility
                </button>

                <button
                  onClick={() => setActiveTab("applications")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                >
                  <FaClipboardList />
                  Applications
                </button>

                <button
                  onClick={() => setActiveTab("reports")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                >
                  <FaDownload />
                  Reports
                </button>

              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

                {stats.map((item, index) => (

                  <div
                    key={index}
                    className="bg-white rounded-xl border shadow-sm p-5"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-sm text-gray-500">
                          {item.title}
                        </p>

                        <h3 className="text-3xl font-bold text-gray-800 mt-2">
                          {item.value}
                        </h3>

                        <p className="text-xs text-gray-500 mt-2">
                          {item.description}
                        </p>

                      </div>

                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                        {item.icon}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* =================================================
                  PLACEMENT PROGRESS
              ================================================= */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                <div className="lg:col-span-2 bg-white rounded-xl border p-6">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-lg font-bold">
                        Department Placement Progress
                      </h3>

                      <p className="text-sm text-gray-500">
                        Academic Year 2026-27
                      </p>

                    </div>

                    <FaChartBar className="text-blue-600 text-xl" />

                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div className="bg-gray-50 rounded-lg p-4 text-center">

                      <p className="text-2xl font-bold">
                        324
                      </p>

                      <p className="text-sm text-gray-500">
                        Registered
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 text-center">

                      <p className="text-2xl font-bold">
                        286
                      </p>

                      <p className="text-sm text-gray-500">
                        Eligible
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 text-center">

                      <p className="text-2xl font-bold text-green-600">
                        168
                      </p>

                      <p className="text-sm text-gray-500">
                        Placed
                      </p>

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium">
                        Placement Percentage
                      </span>

                      <span className="font-bold text-sm">
                        51.85%
                      </span>

                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full">

                      <div
                        className="h-3 bg-blue-600 rounded-full"
                        style={{ width: "51.85%" }}
                      />

                    </div>

                  </div>

                </div>

                {/* Package Statistics */}

                <div className="bg-white rounded-xl border p-6">

                  <h3 className="text-lg font-bold">
                    Package Statistics
                  </h3>

                  <div className="space-y-5 mt-6">

                    <div>

                      <p className="text-sm text-gray-500">
                        Highest Package
                      </p>

                      <p className="text-3xl font-bold text-green-600">
                        ₹32 LPA
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Average Package
                      </p>

                      <p className="text-3xl font-bold text-blue-600">
                        ₹7.8 LPA
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Students Placed
                      </p>

                      <p className="text-3xl font-bold">
                        168
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  UPCOMING DRIVES
              ================================================= */}

              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <div className="flex justify-between items-center mb-5">

                  <div>

                    <h3 className="text-lg font-bold">
                      Upcoming Placement Drives
                    </h3>

                    <p className="text-sm text-gray-500">
                      Drives relevant to your department
                    </p>

                  </div>

                  <button
                    onClick={() => setActiveTab("drives")}
                    className="text-blue-600 flex items-center gap-2 text-sm"
                  >
                    View All
                    <FaArrowRight />
                  </button>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b text-left text-sm text-gray-500">

                        <th className="py-3">
                          Company
                        </th>

                        <th>
                          Position
                        </th>

                        <th>
                          Package
                        </th>

                        <th>
                          Drive Date
                        </th>

                        <th>
                          Eligible
                        </th>

                        <th>
                          Registered
                        </th>

                        <th>
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {upcomingDrives.map((drive, index) => (

                        <tr
                          key={index}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >

                          <td className="py-4 font-semibold">
                            {drive.company}
                          </td>

                          <td>
                            {drive.position}
                          </td>

                          <td className="font-semibold">
                            ₹{drive.package}
                          </td>

                          <td>
                            {drive.date}
                          </td>

                          <td>
                            {drive.eligible}
                          </td>

                          <td>
                            {drive.registered}
                          </td>

                          <td>

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                              {drive.status}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* =================================================
                  APPLICATIONS + INTERVIEWS
              ================================================= */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Applications */}

                <div className="bg-white rounded-xl border p-6">

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <h3 className="text-lg font-bold">
                        Recent Applications
                      </h3>

                      <p className="text-sm text-gray-500">
                        Latest student applications
                      </p>

                    </div>

                    <button
                      onClick={() => setActiveTab("applications")}
                      className="text-blue-600"
                    >
                      <FaArrowRight />
                    </button>

                  </div>

                  <div className="space-y-4">

                    {studentApplications.map((student, index) => (

                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-4 last:border-0"
                      >

                        <div>

                          <p className="font-semibold">
                            {student.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {student.rollNo} • CGPA {student.cgpa}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {student.company}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Interviews */}

                <div className="bg-white rounded-xl border p-6">

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <h3 className="text-lg font-bold">
                        Upcoming Interviews
                      </h3>

                      <p className="text-sm text-gray-500">
                        Interview schedule
                      </p>

                    </div>

                    <button
                      onClick={() => setActiveTab("interviews")}
                      className="text-blue-600"
                    >
                      <FaArrowRight />
                    </button>

                  </div>

                  <div className="space-y-4">

                    {interviews.map((item, index) => (

                      <div
                        key={index}
                        className="border rounded-lg p-4"
                      >

                        <div className="flex justify-between">

                          <div>

                            <p className="font-semibold">
                              {item.student}
                            </p>

                            <p className="text-sm text-gray-500">
                              {item.company}
                            </p>

                          </div>

                          <FaCalendarAlt className="text-blue-600" />

                        </div>

                        <div className="flex justify-between text-sm mt-3">

                          <span>
                            {item.date}
                          </span>

                          <span>
                            {item.time}
                          </span>

                        </div>

                        <div className="mt-2">

                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {item.round}
                          </span>

                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full ml-2">
                            {item.mode}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </>

          )}

          {/* =================================================
              STUDENTS
          ================================================= */}

          {activeTab === "students" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Department Students
                  </h2>

                  <p className="text-gray-500">
                    Manage students registered for placements.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FaDownload className="inline mr-2" />
                  Export
                </button>

              </div>

              <div className="flex gap-3 mb-5">

                <div className="relative flex-1">

                  <FaSearch className="absolute left-3 top-3 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full border rounded-lg py-2.5 pl-10 pr-4"
                  />

                </div>

                <select className="border rounded-lg px-4">
                  <option>All Students</option>
                  <option>Eligible</option>
                  <option>Placed</option>
                  <option>Not Placed</option>
                </select>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b text-left text-sm text-gray-500">

                      <th className="py-3">
                        Roll No
                      </th>

                      <th>
                        Name
                      </th>

                      <th>
                        Branch
                      </th>

                      <th>
                        CGPA
                      </th>

                      <th>
                        Backlogs
                      </th>

                      <th>
                        Placement Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {studentApplications.map((student, index) => (

                      <tr key={index} className="border-b">

                        <td className="py-4">
                          {student.rollNo}
                        </td>

                        <td className="font-semibold">
                          {student.name}
                        </td>

                        <td>
                          CSE
                        </td>

                        <td>
                          {student.cgpa}
                        </td>

                        <td>
                          0
                        </td>

                        <td>

                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>

                        </td>

                        <td>

                          <button className="text-blue-600">
                            <FaEye />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

          {/* =================================================
              COMPANIES
          ================================================= */}

          {activeTab === "companies" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Companies
              </h2>

              <p className="text-gray-500 mt-1">
                Companies participating in campus recruitment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                {["TCS", "Infosys", "Accenture", "Deloitte", "Wipro", "Capgemini"].map(
                  (company) => (

                    <div
                      key={company}
                      className="border rounded-xl p-5 hover:shadow-md"
                    >

                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <FaBuilding />
                      </div>

                      <h3 className="font-bold text-lg mt-4">
                        {company}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Active Recruiter
                      </p>

                      <button className="text-blue-600 text-sm mt-4">
                        View Details →
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

          {/* =================================================
              DRIVES
          ================================================= */}

          {activeTab === "drives" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Placement Drives
                  </h2>

                  <p className="text-gray-500">
                    Manage department placement drives.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FaPlus className="inline mr-2" />
                  Register Drive
                </button>

              </div>

              <div className="space-y-4">

                {upcomingDrives.map((drive, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-bold text-lg">
                        {drive.company}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {drive.position} • ₹{drive.package}
                      </p>

                      <p className="text-sm mt-2">
                        Drive Date: {drive.date}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-semibold">
                        {drive.registered}/{drive.eligible}
                      </p>

                      <p className="text-xs text-gray-500">
                        Registered
                      </p>

                      <button className="text-blue-600 text-sm mt-2">
                        Manage
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* =================================================
              ELIGIBILITY
          ================================================= */}

          {activeTab === "eligibility" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Eligibility Management
              </h2>

              <p className="text-gray-500 mt-1">
                Check students eligible for company drives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                <div className="border rounded-xl p-5">

                  <p className="text-sm text-gray-500">
                    Total Students
                  </p>

                  <p className="text-3xl font-bold mt-2">
                    324
                  </p>

                </div>

                <div className="border rounded-xl p-5">

                  <p className="text-sm text-gray-500">
                    Eligible
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    286
                  </p>

                </div>

                <div className="border rounded-xl p-5">

                  <p className="text-sm text-gray-500">
                    Not Eligible
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    38
                  </p>

                </div>

              </div>

              <button className="mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg">
                Calculate Eligibility
              </button>

            </div>

          )}

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          {activeTab === "applications" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Student Applications
                  </h2>

                  <p className="text-gray-500">
                    Track applications submitted to companies.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FaDownload className="inline mr-2" />
                  Export
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b text-left text-sm text-gray-500">

                      <th className="py-3">
                        Student
                      </th>

                      <th>
                        Roll No
                      </th>

                      <th>
                        Company
                      </th>

                      <th>
                        Position
                      </th>

                      <th>
                        CGPA
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {studentApplications.map((student, index) => (

                      <tr key={index} className="border-b">

                        <td className="py-4 font-semibold">
                          {student.name}
                        </td>

                        <td>
                          {student.rollNo}
                        </td>

                        <td>
                          {student.company}
                        </td>

                        <td>
                          {student.position}
                        </td>

                        <td>
                          {student.cgpa}
                        </td>

                        <td>

                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

          {/* =================================================
              INTERVIEWS
          ================================================= */}

          {activeTab === "interviews" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Interview Schedule
                  </h2>

                  <p className="text-gray-500">
                    Coordinate student interviews.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FaPlus className="inline mr-2" />
                  Schedule
                </button>

              </div>

              <div className="space-y-4">

                {interviews.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex justify-between"
                  >

                    <div>

                      <h3 className="font-bold">
                        {item.student}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.company} • {item.round}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-semibold">
                        {item.date}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.time} • {item.mode}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* =================================================
              REPORTS
          ================================================= */}

          {activeTab === "reports" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Placement Reports
              </h2>

              <p className="text-gray-500 mt-1">
                Generate department placement reports.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                <button className="border rounded-xl p-5 text-left hover:bg-gray-50">

                  <FaFileAlt className="text-blue-600 text-2xl" />

                  <h3 className="font-bold mt-3">
                    Student Placement Report
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Complete student placement details.
                  </p>

                </button>

                <button className="border rounded-xl p-5 text-left hover:bg-gray-50">

                  <FaChartBar className="text-green-600 text-2xl" />

                  <h3 className="font-bold mt-3">
                    Company-wise Report
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Placement statistics by company.
                  </p>

                </button>

                <button className="border rounded-xl p-5 text-left hover:bg-gray-50">

                  <FaUsers className="text-purple-600 text-2xl" />

                  <h3 className="font-bold mt-3">
                    Branch-wise Report
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Placement statistics by branch.
                  </p>

                </button>

              </div>

            </div>

          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab === "notifications" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

              <p className="text-gray-500">
                Recent placement updates.
              </p>

              <div className="mt-6 space-y-4">

                {notifications.map((notification, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex items-center gap-4"
                  >

                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                      <FaBell />

                    </div>

                    <div className="flex-1">

                      <p className="font-semibold">
                        {notification.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </main>

      </div>

    </div>
  );
};

export default PlacementCoordinatorDashboard;