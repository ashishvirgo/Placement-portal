import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaClipboardList,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaUpload,
  FaSearch,
  FaArrowRight,
  FaEdit,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";

const StudentNewDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // =====================================================
  // DEMO DATA
  // =====================================================

  const student = {
    name: "Rahul Sharma",
    rollNo: "CSE21001",
    branch: "Computer Science & Engineering",
    batch: "2023-2027",
    semester: "VII Semester",
    cgpa: "8.72",
    profileCompletion: 85,
    resumeUploaded: true,
  };

  const stats = [
    {
      title: "Eligible Drives",
      value: "12",
      description: "Companies you are eligible for",
      icon: <FaBriefcase />,
    },
    {
      title: "Applications",
      value: "08",
      description: "Applications submitted",
      icon: <FaClipboardList />,
    },
    {
      title: "Shortlisted",
      value: "03",
      description: "Companies shortlisted",
      icon: <FaUser />,
    },
    {
      title: "Selected",
      value: "01",
      description: "Offer received",
      icon: <FaCheckCircle />,
    },
  ];

  const placementDrives = [
    {
      id: 1,
      company: "TCS",
      position: "Software Engineer",
      package: "7.5 LPA",
      location: "Noida",
      deadline: "10 Aug 2026",
      driveDate: "12 Aug 2026",
      eligibility: "CGPA ≥ 7.0",
      status: "Eligible",
    },
    {
      id: 2,
      company: "Infosys",
      position: "Systems Engineer",
      package: "6.5 LPA",
      location: "Pune",
      deadline: "14 Aug 2026",
      driveDate: "16 Aug 2026",
      eligibility: "CGPA ≥ 7.0",
      status: "Eligible",
    },
    {
      id: 3,
      company: "Accenture",
      position: "Associate Software Engineer",
      package: "6 LPA",
      location: "Bengaluru",
      deadline: "18 Aug 2026",
      driveDate: "20 Aug 2026",
      eligibility: "CGPA ≥ 7.5",
      status: "Eligible",
    },
    {
      id: 4,
      company: "Deloitte",
      position: "Analyst",
      package: "8 LPA",
      location: "Gurugram",
      deadline: "22 Aug 2026",
      driveDate: "24 Aug 2026",
      eligibility: "CGPA ≥ 8.0",
      status: "Eligible",
    },
  ];

  const applications = [
    {
      company: "TCS",
      position: "Software Engineer",
      appliedOn: "05 Aug 2026",
      status: "Shortlisted",
    },
    {
      company: "Infosys",
      position: "Systems Engineer",
      appliedOn: "04 Aug 2026",
      status: "Under Review",
    },
    {
      company: "Accenture",
      position: "ASE",
      appliedOn: "01 Aug 2026",
      status: "Shortlisted",
    },
    {
      company: "Wipro",
      position: "Project Engineer",
      appliedOn: "28 Jul 2026",
      status: "Rejected",
    },
  ];

  const interviews = [
    {
      company: "TCS",
      position: "Software Engineer",
      round: "Technical Interview",
      date: "12 Aug 2026",
      time: "10:00 AM",
      mode: "Online",
    },
    {
      company: "Accenture",
      position: "ASE",
      round: "HR Interview",
      date: "20 Aug 2026",
      time: "02:00 PM",
      mode: "Offline",
    },
  ];

  const notifications = [
    {
      title: "TCS technical interview scheduled",
      message: "Your interview is scheduled for 12 Aug 2026.",
      time: "10 minutes ago",
      type: "interview",
    },
    {
      title: "Deloitte placement drive announced",
      message: "You are eligible to apply for this drive.",
      time: "1 hour ago",
      type: "drive",
    },
    {
      title: "Resume update required",
      message: "Add your latest project to improve your profile.",
      time: "3 hours ago",
      type: "profile",
    },
  ];

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";

      case "Shortlisted":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Under Review":
        return "bg-yellow-100 text-yellow-700";

      case "Eligible":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =====================================================
  // SIDEBAR
  // =====================================================

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: "profile",
      label: "My Profile",
      icon: <FaUser />,
    },
    {
      id: "resume",
      label: "My Resume",
      icon: <FaFileAlt />,
    },
    {
      id: "drives",
      label: "Placement Drives",
      icon: <FaBriefcase />,
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <FaClipboardList />,
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: <FaCalendarAlt />,
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

          {/* Title */}

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Student Placement Portal
            </h1>

            <p className="text-sm text-gray-500">
              Training & Placement Management System
            </p>
          </div>

          {/* Right */}

          <div className="flex items-center gap-6">

            {/* Notification */}

            <button
              onClick={() => setActiveTab("notifications")}
              className="relative text-gray-600 hover:text-blue-600"
            >
              <FaBell size={21} />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* Student */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                RS
              </div>

              <div>

                <p className="font-semibold text-gray-800">
                  {student.name}
                </p>

                <p className="text-xs text-gray-500">
                  {student.rollNo}
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

          {/* Profile Completion */}

          <div className="p-4 mt-4">

            <div className="bg-blue-50 rounded-xl p-4">

              <div className="flex justify-between">

                <span className="text-sm font-semibold">
                  Profile
                </span>

                <span className="text-sm font-bold text-blue-600">
                  {student.profileCompletion}%
                </span>

              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${student.profileCompletion}%`,
                  }}
                />

              </div>

              <button
                onClick={() => setActiveTab("profile")}
                className="text-xs text-blue-600 mt-3"
              >
                Complete Profile →
              </button>

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN
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
                  Welcome, {student.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Find opportunities and manage your placement journey.
                </p>

              </div>

              {/* =================================================
                  STUDENT BASIC INFORMATION
              ================================================= */}

              <div className="bg-white rounded-xl border p-5 mb-6">

                <div className="flex flex-col md:flex-row justify-between gap-5">

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                      RS
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {student.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {student.rollNo} • {student.branch}
                      </p>

                      <p className="text-sm text-gray-500">
                        Batch {student.batch} • {student.semester}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-8">

                    <div>

                      <p className="text-xs text-gray-500">
                        CGPA
                      </p>

                      <p className="text-2xl font-bold text-blue-600">
                        {student.cgpa}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        Resume
                      </p>

                      <p className="text-sm font-semibold text-green-600 mt-1">

                        <FaCheckCircle className="inline mr-1" />

                        Uploaded

                      </p>

                    </div>

                    <button
                      onClick={() => setActiveTab("profile")}
                      className="border px-4 py-2 rounded-lg text-blue-600"
                    >
                      <FaEdit className="inline mr-2" />
                      Edit Profile
                    </button>

                  </div>

                </div>

              </div>

              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}

              <div className="flex flex-wrap gap-3 mb-6">

                <button
                  onClick={() => setActiveTab("drives")}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <FaSearch />
                  Find Jobs
                </button>

                <button
                  onClick={() => setActiveTab("resume")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaUpload />
                  Update Resume
                </button>

                <button
                  onClick={() => setActiveTab("applications")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaClipboardList />
                  My Applications
                </button>

                <button
                  onClick={() => setActiveTab("interviews")}
                  className="bg-white border px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  Interviews
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

                    <div className="flex justify-between items-start">

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
                  ELIGIBLE DRIVES
              ================================================= */}

              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <div className="flex justify-between items-center mb-5">

                  <div>

                    <h3 className="text-lg font-bold">
                      Recommended Placement Drives
                    </h3>

                    <p className="text-sm text-gray-500">
                      Companies you are currently eligible for
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
                          Location
                        </th>

                        <th>
                          Deadline
                        </th>

                        <th>
                          Eligibility
                        </th>

                        <th>
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {placementDrives.map((drive) => (

                        <tr
                          key={drive.id}
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
                            {drive.location}
                          </td>

                          <td>
                            {drive.deadline}
                          </td>

                          <td>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                              {drive.status}
                            </span>

                          </td>

                          <td>

                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">
                              Apply
                            </button>

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
                        My Applications
                      </h3>

                      <p className="text-sm text-gray-500">
                        Recent placement applications
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

                    {applications.map((application, index) => (

                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-4 last:border-0"
                      >

                        <div>

                          <p className="font-semibold">
                            {application.company}
                          </p>

                          <p className="text-sm text-gray-500">
                            {application.position}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Applied {application.appliedOn}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status}
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
                        Your scheduled interviews
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
                              {item.company}
                            </p>

                            <p className="text-sm text-gray-500">
                              {item.position}
                            </p>

                          </div>

                          <FaCalendarAlt className="text-blue-600" />

                        </div>

                        <div className="flex justify-between mt-3 text-sm">

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
              PROFILE
          ================================================= */}

          {activeTab === "profile" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    My Profile
                  </h2>

                  <p className="text-gray-500">
                    Keep your placement profile updated.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                  Save Changes
                </button>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    value={student.name}
                    readOnly
                    className="w-full border rounded-lg px-4 py-2.5 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Roll Number
                  </label>

                  <input
                    value={student.rollNo}
                    readOnly
                    className="w-full border rounded-lg px-4 py-2.5 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Branch
                  </label>

                  <input
                    value={student.branch}
                    readOnly
                    className="w-full border rounded-lg px-4 py-2.5 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    CGPA
                  </label>

                  <input
                    value={student.cgpa}
                    className="w-full border rounded-lg px-4 py-2.5"
                    readOnly
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="student@example.com"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Mobile
                  </label>

                  <input
                    type="tel"
                    placeholder="9876543210"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    GitHub
                  </label>

                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    LinkedIn
                  </label>

                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />

                </div>

              </div>

            </div>

          )}

          {/* =================================================
              RESUME
          ================================================= */}

          {activeTab === "resume" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                My Resume
              </h2>

              <p className="text-gray-500 mt-1">
                Upload and manage your latest resume.
              </p>

              <div className="border-2 border-dashed rounded-xl p-10 mt-6 text-center">

                <FaFileAlt className="text-blue-600 text-5xl mx-auto" />

                <h3 className="font-bold text-lg mt-4">
                  Upload Resume
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  PDF format recommended, maximum 5 MB.
                </p>

                <input
                  type="file"
                  accept=".pdf"
                  className="mt-5"
                />

              </div>

              {student.resumeUploaded && (

                <div className="mt-6 border rounded-xl p-5 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                      <FaFileAlt />
                    </div>

                    <div>

                      <p className="font-semibold">
                        Rahul_Sharma_Resume.pdf
                      </p>

                      <p className="text-xs text-gray-500">
                        Uploaded on 05 Aug 2026
                      </p>

                    </div>

                  </div>

                  <button className="text-blue-600">
                    <FaDownload />
                  </button>

                </div>

              )}

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
                    Explore companies and apply for eligible positions.
                  </p>

                </div>

                <div className="relative">

                  <FaSearch className="absolute left-3 top-3 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search company..."
                    className="border rounded-lg pl-10 pr-4 py-2.5"
                  />

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {placementDrives.map((drive) => (

                  <div
                    key={drive.id}
                    className="border rounded-xl p-5 hover:shadow-md transition"
                  >

                    <div className="flex justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <FaBuilding />
                        </div>

                        <div>

                          <h3 className="font-bold text-lg">
                            {drive.company}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {drive.position}
                          </p>

                        </div>

                      </div>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs h-fit">
                        Eligible
                      </span>

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <div className="bg-gray-50 rounded-lg p-3">

                        <p className="text-xs text-gray-500">
                          Package
                        </p>

                        <p className="font-bold">
                          ₹{drive.package}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">

                        <p className="text-xs text-gray-500">
                          Location
                        </p>

                        <p className="font-bold">
                          {drive.location}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">

                        <p className="text-xs text-gray-500">
                          Deadline
                        </p>

                        <p className="font-bold">
                          {drive.deadline}
                        </p>

                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">

                        <p className="text-xs text-gray-500">
                          Drive Date
                        </p>

                        <p className="font-bold">
                          {drive.driveDate}
                        </p>

                      </div>

                    </div>

                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg mt-5 hover:bg-blue-700">
                      Apply Now
                    </button>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          {activeTab === "applications" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="mb-6">

                <h2 className="text-2xl font-bold">
                  My Applications
                </h2>

                <p className="text-gray-500">
                  Track the status of your placement applications.
                </p>

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
                        Applied On
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {applications.map((application, index) => (

                      <tr
                        key={index}
                        className="border-b last:border-0"
                      >

                        <td className="py-4 font-semibold">
                          {application.company}
                        </td>

                        <td>
                          {application.position}
                        </td>

                        <td>
                          {application.appliedOn}
                        </td>

                        <td>

                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusClass(
                              application.status
                            )}`}
                          >
                            {application.status}
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
              INTERVIEWS
          ================================================= */}

          {activeTab === "interviews" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                My Interviews
              </h2>

              <p className="text-gray-500">
                Upcoming placement interviews.
              </p>

              <div className="space-y-4 mt-6">

                {interviews.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex justify-between items-center"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt />
                      </div>

                      <div>

                        <h3 className="font-bold">
                          {item.company}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.position}
                        </p>

                        <p className="text-sm mt-1">
                          {item.round}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">
                        {item.date}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.time}
                      </p>

                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {item.mode}
                      </span>

                    </div>

                  </div>

                ))}

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
                Important placement updates.
              </p>

              <div className="space-y-4 mt-6">

                {notifications.map((notification, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex gap-4"
                  >

                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FaBell />
                    </div>

                    <div>

                      <p className="font-semibold">
                        {notification.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
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

export default StudentNewDashboard;