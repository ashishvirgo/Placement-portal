import React, { useState } from "react";
import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaCalendarAlt,
  FaBell,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Demo statistics
  const stats = [
    {
      title: "Active Jobs",
      value: "08",
      icon: <FaBriefcase />,
      description: "Currently active",
    },
    {
      title: "Total Applicants",
      value: "486",
      icon: <FaUsers />,
      description: "Applications received",
    },
    {
      title: "Shortlisted",
      value: "124",
      icon: <FaUserCheck />,
      description: "Candidates shortlisted",
    },
    {
      title: "Interviews",
      value: "36",
      icon: <FaCalendarAlt />,
      description: "Upcoming interviews",
    },
  ];

  // Demo jobs
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      location: "Noida",
      package: "8 LPA",
      applicants: 126,
      shortlisted: 32,
      deadline: "15 Aug 2026",
      status: "Active",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      location: "Gurugram",
      package: "10 LPA",
      applicants: 84,
      shortlisted: 21,
      deadline: "18 Aug 2026",
      status: "Active",
    },
    {
      id: 3,
      title: "Data Analyst",
      location: "Bengaluru",
      package: "7 LPA",
      applicants: 98,
      shortlisted: 25,
      deadline: "22 Aug 2026",
      status: "Active",
    },
    {
      id: 4,
      title: "Associate Consultant",
      location: "Pune",
      package: "9 LPA",
      applicants: 178,
      shortlisted: 46,
      deadline: "25 Aug 2026",
      status: "Active",
    },
  ];

  // Demo applicants
  const applicants = [
    {
      name: "Rahul Sharma",
      rollNo: "CSE21001",
      branch: "CSE",
      cgpa: "8.7",
      job: "Software Engineer",
      status: "Shortlisted",
    },
    {
      name: "Priya Singh",
      rollNo: "CSE21014",
      branch: "CSE",
      cgpa: "9.1",
      job: "Full Stack Developer",
      status: "Under Review",
    },
    {
      name: "Aman Kumar",
      rollNo: "CSE21025",
      branch: "AIML",
      cgpa: "8.9",
      job: "Data Analyst",
      status: "Selected",
    },
    {
      name: "Neha Gupta",
      rollNo: "CSE21031",
      branch: "IT",
      cgpa: "8.3",
      job: "Software Engineer",
      status: "Rejected",
    },
  ];

  // Demo interviews
  const interviews = [
    {
      candidate: "Rahul Sharma",
      job: "Software Engineer",
      date: "12 Aug 2026",
      time: "10:00 AM",
      round: "Technical Round",
    },
    {
      candidate: "Priya Singh",
      job: "Full Stack Developer",
      date: "12 Aug 2026",
      time: "11:30 AM",
      round: "Technical Round",
    },
    {
      candidate: "Aman Kumar",
      job: "Data Analyst",
      date: "13 Aug 2026",
      time: "02:00 PM",
      round: "HR Round",
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

      case "Under Review":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <header className="bg-white border-b sticky top-0 z-40">

        <div className="px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recruiter Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Campus Recruitment Management
            </p>
          </div>

          <div className="flex items-center gap-6">

            {/* Notification */}

            <button className="relative text-gray-600 hover:text-blue-600">

              <FaBell size={20} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>

            </button>

            {/* Recruiter Profile */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                RC
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Recruitment Team
                </p>

                <p className="text-xs text-gray-500">
                  ABC Technologies
                </p>
              </div>

            </div>

          </div>

        </div>

      </header>

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

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
              <FaBuilding />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "jobs"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaBriefcase />
              My Jobs
            </button>

            <button
              onClick={() => setActiveTab("applicants")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "applicants"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUsers />
              Applicants
            </button>

            <button
              onClick={() => setActiveTab("shortlisted")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "shortlisted"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUserCheck />
              Shortlisted
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
              onClick={() => setActiveTab("selected")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                activeTab === "selected"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaCheckCircle />
              Selected Students
            </button>

          </nav>

        </aside>

        {/* ================= MAIN ================= */}

        <main className="flex-1 p-6">

          {/* ================= DASHBOARD ================= */}

          {activeTab === "dashboard" && (
            <>

              {/* Welcome */}

              <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome, Recruitment Team
                </h2>

                <p className="text-gray-500 mt-1">
                  Manage your campus recruitment activities.
                </p>

              </div>

              {/* Quick Actions */}

              <div className="flex flex-wrap gap-3 mb-6">

                <button
                  onClick={() => setActiveTab("create-job")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaPlus />
                  Create Job
                </button>

                <button
                  onClick={() => setActiveTab("applicants")}
                  className="bg-white border hover:bg-gray-50 px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaUsers />
                  View Applicants
                </button>

                <button
                  onClick={() => setActiveTab("interviews")}
                  className="bg-white border hover:bg-gray-50 px-5 py-2.5 rounded-lg flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  Schedule Interview
                </button>

              </div>

              {/* ================= STATS ================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

                {stats.map((item, index) => (

                  <div
                    key={index}
                    className="bg-white rounded-xl border shadow-sm p-5"
                  >

                    <div className="flex justify-between">

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

              {/* ================= JOBS ================= */}

              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <div className="flex justify-between items-center mb-5">

                  <div>

                    <h3 className="text-lg font-bold">
                      Active Jobs
                    </h3>

                    <p className="text-sm text-gray-500">
                      Your currently active recruitment positions
                    </p>

                  </div>

                  <button
                    onClick={() => setActiveTab("jobs")}
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

                        <th className="py-3">Position</th>
                        <th>Location</th>
                        <th>Package</th>
                        <th>Applicants</th>
                        <th>Shortlisted</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {jobs.map((job) => (

                        <tr
                          key={job.id}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >

                          <td className="py-4 font-semibold">
                            {job.title}
                          </td>

                          <td>
                            {job.location}
                          </td>

                          <td className="font-semibold">
                            ₹{job.package}
                          </td>

                          <td>
                            {job.applicants}
                          </td>

                          <td>
                            {job.shortlisted}
                          </td>

                          <td>
                            {job.deadline}
                          </td>

                          <td>

                            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              {job.status}
                            </span>

                          </td>

                          <td>

                            <div className="flex gap-3">

                              <button className="text-blue-600 hover:text-blue-800">
                                <FaEye />
                              </button>

                              <button className="text-gray-600 hover:text-gray-800">
                                <FaEdit />
                              </button>

                              <button className="text-red-600 hover:text-red-800">
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* ================= LOWER SECTION ================= */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Applicants */}

                <div className="bg-white rounded-xl border shadow-sm p-6">

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <h3 className="text-lg font-bold">
                        Recent Applicants
                      </h3>

                      <p className="text-sm text-gray-500">
                        Latest applications received
                      </p>

                    </div>

                    <button
                      onClick={() => setActiveTab("applicants")}
                      className="text-blue-600"
                    >
                      <FaArrowRight />
                    </button>

                  </div>

                  <div className="space-y-4">

                    {applicants.map((student, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-4 last:border-0"
                      >

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                            {student.name.charAt(0)}
                          </div>

                          <div>

                            <p className="font-semibold">
                              {student.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {student.rollNo} • {student.branch}
                            </p>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-sm font-medium">
                            CGPA {student.cgpa}
                          </p>

                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusClass(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Interviews */}

                <div className="bg-white rounded-xl border shadow-sm p-6">

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <h3 className="text-lg font-bold">
                        Upcoming Interviews
                      </h3>

                      <p className="text-sm text-gray-500">
                        Scheduled candidate interviews
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

                    {interviews.map((interview, index) => (

                      <div
                        key={index}
                        className="border rounded-lg p-4"
                      >

                        <div className="flex justify-between">

                          <div>

                            <p className="font-semibold">
                              {interview.candidate}
                            </p>

                            <p className="text-sm text-gray-500">
                              {interview.job}
                            </p>

                          </div>

                          <FaCalendarAlt className="text-blue-600" />

                        </div>

                        <div className="flex justify-between mt-3 text-sm">

                          <span>
                            {interview.date}
                          </span>

                          <span>
                            {interview.time}
                          </span>

                        </div>

                        <div className="mt-2">

                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {interview.round}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </>
          )}

          {/* ================= JOBS ================= */}

          {activeTab === "jobs" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    My Jobs
                  </h2>

                  <p className="text-gray-500">
                    Manage your recruitment positions
                  </p>

                </div>

                <button
                  onClick={() => setActiveTab("create-job")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaPlus />
                  Create Job
                </button>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {jobs.map((job) => (

                  <div
                    key={job.id}
                    className="border rounded-xl p-5 hover:shadow-md"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold text-lg">
                          {job.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {job.location}
                        </p>

                      </div>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs h-fit">
                        Active
                      </span>

                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-5 text-center">

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold">
                          {job.applicants}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applicants
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold">
                          {job.shortlisted}
                        </p>
                        <p className="text-xs text-gray-500">
                          Shortlisted
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-bold">
                          ₹{job.package}
                        </p>
                        <p className="text-xs text-gray-500">
                          Package
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-2 mt-5">

                      <button className="flex-1 border py-2 rounded-lg">
                        <FaEye className="inline mr-2" />
                        View
                      </button>

                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                        <FaEdit className="inline mr-2" />
                        Edit
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ================= APPLICANTS ================= */}

          {activeTab === "applicants" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Applicants
              </h2>

              <p className="text-gray-500 mb-6">
                Review and manage candidate applications.
              </p>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b text-left text-sm text-gray-500">

                      <th className="py-3">Student</th>
                      <th>Roll No</th>
                      <th>Branch</th>
                      <th>CGPA</th>
                      <th>Job</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {applicants.map((student, index) => (

                      <tr key={index} className="border-b">

                        <td className="py-4 font-semibold">
                          {student.name}
                        </td>

                        <td>
                          {student.rollNo}
                        </td>

                        <td>
                          {student.branch}
                        </td>

                        <td>
                          {student.cgpa}
                        </td>

                        <td>
                          {student.job}
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

          {/* ================= SHORTLISTED ================= */}

          {activeTab === "shortlisted" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Shortlisted Candidates
              </h2>

              <p className="text-gray-500 mt-1">
                Candidates selected for the next recruitment stage.
              </p>

              <div className="mt-6 p-5 bg-blue-50 rounded-lg">

                <div className="flex items-center gap-3">

                  <FaUserCheck className="text-blue-600 text-xl" />

                  <div>

                    <p className="font-bold">
                      124 Candidates Shortlisted
                    </p>

                    <p className="text-sm text-gray-500">
                      Across all active jobs
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* ================= INTERVIEWS ================= */}

          {activeTab === "interviews" && (

            <div className="bg-white rounded-xl border p-6">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Interview Schedule
                  </h2>

                  <p className="text-gray-500">
                    Manage candidate interviews.
                  </p>

                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  <FaPlus className="inline mr-2" />
                  Schedule Interview
                </button>

              </div>

              <div className="space-y-4">

                {interviews.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-bold">
                        {item.candidate}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.job}
                      </p>

                      <p className="text-sm mt-2">
                        {item.date} • {item.time}
                      </p>

                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {item.round}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ================= SELECTED ================= */}

          {activeTab === "selected" && (

            <div className="bg-white rounded-xl border p-6">

              <h2 className="text-2xl font-bold">
                Selected Students
              </h2>

              <p className="text-gray-500 mt-1">
                Candidates selected through your recruitment process.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="bg-green-50 p-5 rounded-xl">

                  <FaCheckCircle className="text-green-600 text-2xl" />

                  <p className="text-3xl font-bold mt-3">
                    48
                  </p>

                  <p className="text-gray-500">
                    Selected
                  </p>

                </div>

                <div className="bg-blue-50 p-5 rounded-xl">

                  <FaUserCheck className="text-blue-600 text-2xl" />

                  <p className="text-3xl font-bold mt-3">
                    124
                  </p>

                  <p className="text-gray-500">
                    Shortlisted
                  </p>

                </div>

                <div className="bg-yellow-50 p-5 rounded-xl">

                  <FaClock className="text-yellow-600 text-2xl" />

                  <p className="text-3xl font-bold mt-3">
                    36
                  </p>

                  <p className="text-gray-500">
                    Interviews Pending
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* ================= CREATE JOB ================= */}

          {activeTab === "create-job" && (

            <div className="bg-white rounded-xl border p-6 max-w-4xl">

              <h2 className="text-2xl font-bold">
                Create Job
              </h2>

              <p className="text-gray-500 mb-6">
                Create a new campus recruitment position.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Job Title
                  </label>

                  <input
                    type="text"
                    placeholder="Software Engineer"
                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Job Location
                  </label>

                  <input
                    type="text"
                    placeholder="Noida"
                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Package (LPA)
                  </label>

                  <input
                    type="number"
                    placeholder="8"
                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Minimum CGPA
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    placeholder="7.0"
                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Application Deadline
                  </label>

                  <input
                    type="date"
                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Job Type
                  </label>

                  <select className="w-full border rounded-lg px-4 py-2.5">
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Internship + Full Time</option>
                  </select>

                </div>

              </div>

              <div className="mt-5">

                <label className="block text-sm font-medium mb-2">
                  Job Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Enter job description..."
                  className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="mt-6 flex gap-3">

                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg">
                  Create Job
                </button>

                <button
                  onClick={() => setActiveTab("jobs")}
                  className="border px-6 py-2.5 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

        </main>

      </div>

    </div>
  );
};

export default RecruiterDashboard;