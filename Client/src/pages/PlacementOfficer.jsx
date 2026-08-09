import React, { useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaClipboardCheck,
  FaUserCheck,
  FaChartLine,
  FaCalendarAlt,
  FaBell,
  FaPlus,
  FaEye,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const PlacementOfficer = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    {
      title: "Total Students",
      value: "1248",
      icon: <FaUsers />,
      description: "Registered students",
    },
    {
      title: "Companies",
      value: "86",
      icon: <FaBuilding />,
      description: "Active companies",
    },
    {
      title: "Placement Drives",
      value: "42",
      icon: <FaBriefcase />,
      description: "This academic year",
    },
    {
      title: "Students Placed",
      value: "684",
      icon: <FaUserCheck />,
      description: "54.8% placement",
    },
  ];

  const upcomingDrives = [
    {
      company: "TCS",
      job: "Software Engineer",
      package: "7.5 LPA",
      date: "12 Aug 2026",
      eligible: "CSE, IT, AIML",
      status: "Upcoming",
    },
    {
      company: "Infosys",
      job: "Systems Engineer",
      package: "6.5 LPA",
      date: "16 Aug 2026",
      eligible: "CSE, IT, ECE",
      status: "Upcoming",
    },
    {
      company: "Accenture",
      job: "Associate Software Engineer",
      package: "6.0 LPA",
      date: "20 Aug 2026",
      eligible: "CSE, IT, DS",
      status: "Upcoming",
    },
    {
      company: "Deloitte",
      job: "Analyst",
      package: "8.0 LPA",
      date: "24 Aug 2026",
      eligible: "CSE, IT",
      status: "Upcoming",
    },
  ];

  const recentApplications = [
    {
      student: "Rahul Sharma",
      rollNo: "CSE21001",
      company: "TCS",
      status: "Shortlisted",
    },
    {
      student: "Priya Singh",
      rollNo: "CSE21014",
      company: "Infosys",
      status: "Applied",
    },
    {
      student: "Aman Kumar",
      rollNo: "CSE21025",
      company: "Accenture",
      status: "Selected",
    },
    {
      student: "Neha Gupta",
      rollNo: "CSE21031",
      company: "Deloitte",
      status: "Rejected",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";

      case "Shortlisted":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Placement Officer
            </h1>
            <p className="text-sm text-gray-500">
              Placement Management Portal
            </p>
          </div>

          <div className="flex items-center gap-5">

            <button className="relative text-gray-600 hover:text-blue-600">
              <FaBell size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                4
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                PO
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Placement Officer
                </p>
                <p className="text-xs text-gray-500">
                  Training & Placement
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-73px)] border-r">

          <nav className="p-4 space-y-2">

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChartLine />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("companies")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "companies"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaBuilding />
              Companies
            </button>

            <button
              onClick={() => setActiveTab("drives")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "drives"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaBriefcase />
              Placement Drives
            </button>

            <button
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "students"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUsers />
              Students
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "applications"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaClipboardCheck />
              Applications
            </button>

            <button
              onClick={() => setActiveTab("interviews")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "interviews"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaCalendarAlt />
              Interviews
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "reports"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChartLine />
              Reports
            </button>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">

          {activeTab === "dashboard" && (
            <>
              {/* Welcome */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Placement Dashboard
                </h2>

                <p className="text-gray-500 mt-1">
                  Monitor and manage campus placement activities.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mb-6">

                <button
                  onClick={() => setActiveTab("drives")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <FaPlus />
                  Create Placement Drive
                </button>

                <button
                  onClick={() => setActiveTab("companies")}
                  className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  <FaPlus />
                  Add Company
                </button>

                <button
                  onClick={() => setActiveTab("reports")}
                  className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  <FaChartLine />
                  View Reports
                </button>

              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-5 border"
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

                      <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Placement Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">

                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h3 className="font-bold text-lg">
                        Placement Overview
                      </h3>

                      <p className="text-sm text-gray-500">
                        Current academic year
                      </p>
                    </div>

                    <FaChartLine className="text-blue-600" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-800">
                        1248
                      </p>
                      <p className="text-sm text-gray-500">
                        Registered
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-800">
                        684
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-800">
                        54.8%
                      </p>
                      <p className="text-sm text-gray-500">
                        Placement Rate
                      </p>
                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Overall Placement
                      </span>

                      <span className="text-sm font-bold">
                        54.8%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: "54.8%" }}
                      />
                    </div>

                  </div>

                </div>

                {/* Package */}
                <div className="bg-white rounded-xl shadow-sm border p-6">

                  <h3 className="font-bold text-lg">
                    Package Statistics
                  </h3>

                  <div className="mt-6 space-y-5">

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
                        Lowest Package
                      </p>

                      <p className="text-3xl font-bold text-gray-700">
                        ₹3.5 LPA
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Upcoming Drives */}
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

                <div className="flex justify-between items-center mb-5">

                  <div>
                    <h3 className="text-lg font-bold">
                      Upcoming Placement Drives
                    </h3>

                    <p className="text-sm text-gray-500">
                      Scheduled company recruitment drives
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
                        <th className="py-3">Company</th>
                        <th>Position</th>
                        <th>Package</th>
                        <th>Date</th>
                        <th>Eligibility</th>
                        <th>Status</th>
                        <th>Action</th>
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

                          <td>{drive.job}</td>

                          <td className="font-semibold">
                            {drive.package}
                          </td>

                          <td>
                            {drive.date}
                          </td>

                          <td className="text-sm">
                            {drive.eligible}
                          </td>

                          <td>
                            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                              {drive.status}
                            </span>
                          </td>

                          <td>
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEye />
                            </button>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-xl shadow-sm border p-6">

                <div className="flex justify-between items-center mb-5">

                  <div>
                    <h3 className="text-lg font-bold">
                      Recent Applications
                    </h3>

                    <p className="text-sm text-gray-500">
                      Latest student placement applications
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("applications")}
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
                        <th className="py-3">Student</th>
                        <th>Roll No</th>
                        <th>Company</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {recentApplications.map((application, index) => (
                        <tr
                          key={index}
                          className="border-b last:border-0"
                        >

                          <td className="py-4 font-medium">
                            {application.student}
                          </td>

                          <td>
                            {application.rollNo}
                          </td>

                          <td>
                            {application.company}
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

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </>
          )}

          {/* Companies */}
          {activeTab === "companies" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Company Management
              </h2>

              <p className="text-gray-500 mb-6">
                Add, update and manage recruiting companies.
              </p>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus />
                Add Company
              </button>
            </div>
          )}

          {/* Drives */}
          {activeTab === "drives" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Placement Drives
              </h2>

              <p className="text-gray-500 mb-6">
                Create and manage company placement drives.
              </p>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus />
                Create Drive
              </button>
            </div>
          )}

          {/* Students */}
          {activeTab === "students" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Student Management
              </h2>

              <p className="text-gray-500">
                View student profiles, eligibility and placement status.
              </p>
            </div>
          )}

          {/* Applications */}
          {activeTab === "applications" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Applications
              </h2>

              <p className="text-gray-500">
                Manage student applications and shortlisting.
              </p>
            </div>
          )}

          {/* Interviews */}
          {activeTab === "interviews" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Interview Management
              </h2>

              <p className="text-gray-500">
                Schedule and manage student interviews.
              </p>
            </div>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">
                Placement Reports
              </h2>

              <p className="text-gray-500">
                Generate branch-wise, company-wise and batch-wise reports.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default PlacementOfficer;