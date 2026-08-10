
import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiAward,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
  FiFilter,
  FiExternalLink,
  FiX,
} from "react-icons/fi";

const PlacementDrive = ({ student }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [branchFilter, setBranchFilter] =
    useState("All");
  const [selectedDrive, setSelectedDrive] =
    useState(null);
  const [showDetails, setShowDetails] =
    useState(false);

  /*
   * Demo data
   * Replace this with API data from:
   * GET /api/placement/drives
   */

  const [drives, setDrives] = useState([
    {
      id: 1,
      company: "TCS",
      logo: "https://ui-avatars.com/api/?name=TCS&background=2563eb&color=fff&size=150",
      role: "Graduate Engineer Trainee",
      package: "7.2 LPA",
      location: "Noida / Pune / Bangalore",
      driveDate: "2026-08-18",
      applicationDeadline: "2026-08-14",
      type: "Full Time",
      workMode: "Hybrid",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "CSE-AIML",
        "CSE-DS",
      ],
      minCGPA: 6.0,
      backlogsAllowed: false,
      skills: [
        "Java",
        "SQL",
        "Data Structures",
        "OOP",
      ],
      description:
        "TCS is hiring fresh engineering graduates for software development and technology roles.",
      selectionProcess: [
        "Online Aptitude Test",
        "Coding Test",
        "Technical Interview",
        "HR Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 120,
    },

    {
      id: 2,
      company: "Infosys",
      logo: "https://ui-avatars.com/api/?name=Infosys&background=0f766e&color=fff&size=150",
      role: "Systems Engineer",
      package: "6.5 LPA",
      location: "Bangalore / Pune / Hyderabad",
      driveDate: "2026-08-22",
      applicationDeadline: "2026-08-17",
      type: "Full Time",
      workMode: "On-site",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "CSE-AIML",
        "CSE-DS",
        "Electronics & Communication Engineering",
      ],
      minCGPA: 6.5,
      backlogsAllowed: false,
      skills: [
        "Java",
        "Python",
        "SQL",
        "Problem Solving",
      ],
      description:
        "Infosys is looking for engineering graduates with strong programming and analytical skills.",
      selectionProcess: [
        "Online Assessment",
        "Coding Round",
        "Technical Interview",
        "HR Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 80,
    },

    {
      id: 3,
      company: "Accenture",
      logo: "https://ui-avatars.com/api/?name=Accenture&background=7c3aed&color=fff&size=150",
      role: "Associate Software Engineer",
      package: "7.0 LPA",
      location: "Noida / Gurgaon",
      driveDate: "2026-08-25",
      applicationDeadline: "2026-08-20",
      type: "Full Time",
      workMode: "Hybrid",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "CSE-AIML",
        "CSE-DS",
      ],
      minCGPA: 6.0,
      backlogsAllowed: false,
      skills: [
        "Java",
        "Python",
        "React",
        "SQL",
        "Cloud",
      ],
      description:
        "Join Accenture as an Associate Software Engineer and work on enterprise technology projects.",
      selectionProcess: [
        "Cognitive Assessment",
        "Technical Assessment",
        "Communication Assessment",
        "Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 60,
    },

    {
      id: 4,
      company: "Wipro",
      logo: "https://ui-avatars.com/api/?name=Wipro&background=059669&color=fff&size=150",
      role: "Project Engineer",
      package: "5.8 LPA",
      location: "Noida / Bangalore",
      driveDate: "2026-08-28",
      applicationDeadline: "2026-08-22",
      type: "Full Time",
      workMode: "Hybrid",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "Electronics & Communication Engineering",
      ],
      minCGPA: 6.0,
      backlogsAllowed: false,
      skills: [
        "C++",
        "Java",
        "SQL",
        "DSA",
      ],
      description:
        "Wipro is hiring fresh graduates for software engineering and technology roles.",
      selectionProcess: [
        "Aptitude Test",
        "Coding Test",
        "Technical Interview",
        "HR Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 100,
    },

    {
      id: 5,
      company: "Deloitte",
      logo: "https://ui-avatars.com/api/?name=Deloitte&background=111827&color=fff&size=150",
      role: "Analyst",
      package: "8.0 LPA",
      location: "Gurgaon / Hyderabad",
      driveDate: "2026-09-02",
      applicationDeadline: "2026-08-27",
      type: "Full Time",
      workMode: "Hybrid",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "CSE-AIML",
        "CSE-DS",
      ],
      minCGPA: 7.0,
      backlogsAllowed: false,
      skills: [
        "Python",
        "SQL",
        "Data Analytics",
        "Communication",
      ],
      description:
        "Deloitte is looking for analytical and technically strong graduates for technology consulting roles.",
      selectionProcess: [
        "Online Assessment",
        "Technical Round",
        "Managerial Round",
        "HR Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 40,
    },

    {
      id: 6,
      company: "Capgemini",
      logo: "https://ui-avatars.com/api/?name=Capgemini&background=2563eb&color=fff&size=150",
      role: "Software Engineer",
      package: "6.0 LPA",
      location: "Noida / Mumbai",
      driveDate: "2026-09-05",
      applicationDeadline: "2026-08-30",
      type: "Full Time",
      workMode: "On-site",
      experience: "Fresher",
      branches: [
        "Computer Science & Engineering",
        "Information Technology",
        "CSE-AIML",
      ],
      minCGPA: 6.0,
      backlogsAllowed: false,
      skills: [
        "Java",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      description:
        "Capgemini is recruiting fresh engineers for software development and IT services.",
      selectionProcess: [
        "Aptitude",
        "Coding",
        "Technical Interview",
        "HR Interview",
      ],
      applied: false,
      status: "Open",
      vacancies: 75,
    },
  ]);

  /*
   * Student data
   *
   * These values should eventually come from
   * StudentProfile API.
   */

  const studentData = {
    name: student?.name || "Student",
    branch:
      student?.branch ||
      "Computer Science & Engineering",
    cgpa: Number(student?.cgpa || 7.8),
    backlogs: Number(
      student?.backlogs || 0
    ),
  };

  /*
   * Check eligibility
   */

  const checkEligibility = (drive) => {
    const branchEligible =
      drive.branches.includes(
        studentData.branch
      );

    const cgpaEligible =
      studentData.cgpa >= drive.minCGPA;

    const backlogEligible =
      drive.backlogsAllowed ||
      studentData.backlogs === 0;

    return (
      branchEligible &&
      cgpaEligible &&
      backlogEligible
    );
  };

  /*
   * Filter drives
   */

  const filteredDrives = useMemo(() => {
    return drives.filter((drive) => {
      const matchesSearch =
        drive.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        drive.role
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        drive.skills.some((skill) =>
          skill
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "All" ||
        drive.status === statusFilter;

      const matchesBranch =
        branchFilter === "All" ||
        drive.branches.includes(
          branchFilter
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBranch
      );
    });
  }, [
    drives,
    search,
    statusFilter,
    branchFilter,
  ]);

  /*
   * Apply for drive
   *
   * Replace with:
   * POST /api/placement/drives/:id/apply
   */

  const handleApply = async (drive) => {
    const eligible =
      checkEligibility(drive);

    if (!eligible) {
      alert(
        "You are not eligible for this placement drive."
      );
      return;
    }

    try {
      /*
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/placement/drives/${drive.id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
      */

      setDrives((previous) =>
        previous.map((item) =>
          item.id === drive.id
            ? {
                ...item,
                applied: true,
              }
            : item
        )
      );

      setSelectedDrive({
        ...drive,
        applied: true,
      });

      alert(
        `Application submitted successfully for ${drive.company}.`
      );
    } catch (error) {
      console.error(error);
      alert(
        "Unable to submit application."
      );
    }
  };

  /*
   * Open details
   */

  const openDetails = (drive) => {
    setSelectedDrive(drive);
    setShowDetails(true);
  };

  /*
   * Format date
   */

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
   * Statistics
   */

  const totalDrives = drives.length;

  const eligibleDrives =
    drives.filter(checkEligibility).length;

  const appliedDrives =
    drives.filter(
      (drive) => drive.applied
    ).length;

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <p className="text-blue-100">
              Placement Cell
            </p>

            <h1 className="text-3xl lg:text-4xl font-bold mt-1">
              Placement Drives
            </h1>

            <p className="mt-3 text-blue-100 max-w-2xl">
              Discover upcoming campus placement
              opportunities, check your eligibility
              and apply directly.
            </p>

          </div>

          <div className="flex items-center justify-center">

            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">

              <FiBriefcase size={38} />

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          STUDENT ELIGIBILITY CARD
      ================================================= */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

              <FiUsers size={25} />

            </div>

            <div>

              <h2 className="font-bold text-lg dark:text-white">
                {studentData.name}
              </h2>

              <p className="text-sm text-gray-500">
                {studentData.branch}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

            <div>

              <p className="text-xs text-gray-500">
                CGPA
              </p>

              <p className="text-xl font-bold text-blue-600">
                {studentData.cgpa}
              </p>

            </div>

            <div>

              <p className="text-xs text-gray-500">
                Backlogs
              </p>

              <p className="text-xl font-bold text-green-600">
                {studentData.backlogs}
              </p>

            </div>

            <div>

              <p className="text-xs text-gray-500">
                Eligible Drives
              </p>

              <p className="text-xl font-bold text-purple-600">
                {eligibleDrives}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Drives
              </p>

              <h3 className="text-3xl font-bold mt-2 dark:text-white">
                {totalDrives}
              </h3>

            </div>

            <FiBriefcase className="text-blue-600 text-3xl" />

          </div>

        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Eligible Drives
              </p>

              <h3 className="text-3xl font-bold mt-2 text-green-600">
                {eligibleDrives}
              </h3>

            </div>

            <FiCheckCircle className="text-green-600 text-3xl" />

          </div>

        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Applications
              </p>

              <h3 className="text-3xl font-bold mt-2 text-purple-600">
                {appliedDrives}
              </h3>

            </div>

            <FiAward className="text-purple-600 text-3xl" />

          </div>

        </div>

      </div>

      {/* =================================================
          SEARCH & FILTER
      ================================================= */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">

        <div className="grid lg:grid-cols-3 gap-4">

          <div className="lg:col-span-1 relative">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search company, role or skill..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
          >

            <option value="All">
              All Status
            </option>

            <option value="Open">
              Open
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

          <select
            value={branchFilter}
            onChange={(e) =>
              setBranchFilter(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
          >

            <option value="All">
              All Branches
            </option>

            {Object.keys(
              {
                "Computer Science & Engineering": true,
                "Information Technology": true,
                "CSE-AIML": true,
                "CSE-DS": true,
                "Electronics & Communication Engineering": true,
                "Electrical Engineering": true,
                "Mechanical Engineering": true,
                "Civil Engineering": true,
                "Chemical Engineering": true,
              }
            ).map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* =================================================
          DRIVE LIST
      ================================================= */}

      <div className="space-y-5">

        {filteredDrives.length === 0 ? (

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-12 text-center">

            <FiBriefcase
              size={45}
              className="mx-auto text-gray-400"
            />

            <h3 className="text-xl font-bold mt-4 dark:text-white">
              No Placement Drives Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          filteredDrives.map(
            (drive) => {

              const eligible =
                checkEligibility(
                  drive
                );

              return (
                <div
                  key={drive.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-xl transition border border-gray-100 dark:border-slate-700 overflow-hidden"
                >

                  <div className="p-6">

                    {/* Top */}

                    <div className="flex flex-col lg:flex-row justify-between gap-5">

                      <div className="flex gap-4">

                        <img
                          src={drive.logo}
                          alt={drive.company}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h2 className="text-xl font-bold dark:text-white">
                              {drive.company}
                            </h2>

                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                              {drive.status}
                            </span>

                            {drive.applied && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                Applied
                              </span>
                            )}

                          </div>

                          <h3 className="font-semibold text-blue-600 mt-1">
                            {drive.role}
                          </h3>

                        </div>

                      </div>

                      {/* Package */}

                      <div className="lg:text-right">

                        <p className="text-xs text-gray-500">
                          Package
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                          {drive.package}
                        </p>

                      </div>

                    </div>

                    {/* Information */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                      <div className="flex gap-3">

                        <FiMapPin className="text-blue-600 mt-1" />

                        <div>

                          <p className="text-xs text-gray-500">
                            Location
                          </p>

                          <p className="text-sm font-medium dark:text-gray-200">
                            {drive.location}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-3">

                        <FiCalendar className="text-purple-600 mt-1" />

                        <div>

                          <p className="text-xs text-gray-500">
                            Drive Date
                          </p>

                          <p className="text-sm font-medium dark:text-gray-200">
                            {formatDate(
                              drive.driveDate
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-3">

                        <FiClock className="text-orange-600 mt-1" />

                        <div>

                          <p className="text-xs text-gray-500">
                            Apply Before
                          </p>

                          <p className="text-sm font-medium dark:text-gray-200">
                            {formatDate(
                              drive.applicationDeadline
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-3">

                        <FiDollarSign className="text-green-600 mt-1" />

                        <div>

                          <p className="text-xs text-gray-500">
                            Work Mode
                          </p>

                          <p className="text-sm font-medium dark:text-gray-200">
                            {drive.workMode}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Skills */}

                    <div className="mt-5">

                      <p className="text-sm font-semibold dark:text-gray-300">
                        Required Skills
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">

                        {drive.skills.map(
                          (skill) => (

                            <span
                              key={skill}
                              className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-full text-xs"
                            >
                              {skill}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    {/* Eligibility */}

                    <div
                      className={`mt-5 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        eligible
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-red-50 dark:bg-red-900/20"
                      }`}
                    >

                      <div className="flex gap-3">

                        {eligible ? (
                          <FiCheckCircle className="text-green-600 mt-1" />
                        ) : (
                          <FiAlertCircle className="text-red-600 mt-1" />
                        )}

                        <div>

                          <p
                            className={`font-semibold ${
                              eligible
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {eligible
                              ? "You are eligible"
                              : "You are not eligible"}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">

                            Minimum CGPA:{" "}
                            {drive.minCGPA}
                            {" • "}
                            Backlogs:{" "}
                            {drive.backlogsAllowed
                              ? "Allowed"
                              : "Not Allowed"}

                          </p>

                        </div>

                      </div>

                      <div className="text-sm text-gray-500">

                        {drive.vacancies} vacancies

                      </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap gap-3 mt-6">

                      <button
                        onClick={() =>
                          openDetails(
                            drive
                          )
                        }
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 font-semibold"
                      >

                        View Details

                        <FiExternalLink />

                      </button>

                      <button
                        onClick={() =>
                          handleApply(
                            drive
                          )
                        }
                        disabled={
                          !eligible ||
                          drive.applied
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold ${
                          drive.applied
                            ? "bg-green-600"
                            : eligible
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >

                        {drive.applied ? (
                          <>
                            <FiCheckCircle />

                            Applied

                          </>
                        ) : (
                          <>
                            Apply Now

                            <FiChevronRight />

                          </>
                        )}

                      </button>

                    </div>

                  </div>

                </div>
              );
            }
          )
        )}

      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {showDetails &&
        selectedDrive && (

          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

            <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">

              {/* Header */}

              <div className="p-6 border-b dark:border-slate-700 flex justify-between gap-4">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      selectedDrive.logo
                    }
                    alt={
                      selectedDrive.company
                    }
                    className="w-14 h-14 rounded-xl"
                  />

                  <div>

                    <h2 className="text-2xl font-bold dark:text-white">
                      {
                        selectedDrive.company
                      }
                    </h2>

                    <p className="text-blue-600 font-semibold">
                      {
                        selectedDrive.role
                      }
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowDetails(
                      false
                    )
                  }
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center dark:text-white"
                >

                  <FiX />

                </button>

              </div>

              {/* Body */}

              <div className="p-6 overflow-y-auto max-h-[70vh]">

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Package
                    </p>

                    <p className="font-bold text-xl text-green-600">
                      {
                        selectedDrive.package
                      }
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="font-semibold dark:text-white">
                      {
                        selectedDrive.location
                      }
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Drive Date
                    </p>

                    <p className="font-semibold dark:text-white">
                      {formatDate(
                        selectedDrive.driveDate
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Application Deadline
                    </p>

                    <p className="font-semibold dark:text-white">
                      {formatDate(
                        selectedDrive.applicationDeadline
                      )}
                    </p>

                  </div>

                </div>

                {/* Description */}

                <div className="mt-7">

                  <h3 className="font-bold text-lg dark:text-white">
                    About the Role
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {
                      selectedDrive.description
                    }
                  </p>

                </div>

                {/* Eligibility */}

                <div className="mt-7">

                  <h3 className="font-bold text-lg dark:text-white">
                    Eligibility
                  </h3>

                  <div className="grid md:grid-cols-3 gap-3 mt-3">

                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">

                      <p className="text-xs text-gray-500">
                        Minimum CGPA
                      </p>

                      <p className="font-bold text-blue-600">
                        {
                          selectedDrive.minCGPA
                        }
                      </p>

                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">

                      <p className="text-xs text-gray-500">
                        Backlogs
                      </p>

                      <p className="font-bold text-purple-600">
                        {
                          selectedDrive.backlogsAllowed
                            ? "Allowed"
                            : "Not Allowed"
                        }
                      </p>

                    </div>

                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">

                      <p className="text-xs text-gray-500">
                        Experience
                      </p>

                      <p className="font-bold text-green-600">
                        {
                          selectedDrive.experience
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* Branches */}

                <div className="mt-7">

                  <h3 className="font-bold text-lg dark:text-white">
                    Eligible Branches
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {selectedDrive.branches.map(
                      (item) => (

                        <span
                          key={item}
                          className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm dark:text-gray-200"
                        >
                          {item}
                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* Selection Process */}

                <div className="mt-7">

                  <h3 className="font-bold text-lg dark:text-white">
                    Selection Process
                  </h3>

                  <div className="mt-3 space-y-3">

                    {selectedDrive.selectionProcess.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-3"
                        >

                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>

                          <span className="dark:text-gray-200">
                            {item}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="p-5 border-t dark:border-slate-700 flex justify-end gap-3">

                <button
                  onClick={() =>
                    setShowDetails(
                      false
                    )
                  }
                  className="px-5 py-3 rounded-xl border dark:border-slate-600 dark:text-white"
                >
                  Close
                </button>

                <button
                  onClick={() =>
                    handleApply(
                      selectedDrive
                    )
                  }
                  disabled={
                    !checkEligibility(
                      selectedDrive
                    ) ||
                    selectedDrive.applied
                  }
                  className={`px-6 py-3 rounded-xl text-white font-semibold ${
                    selectedDrive.applied
                      ? "bg-green-600"
                      : checkEligibility(
                          selectedDrive
                        )
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400"
                  }`}
                >

                  {selectedDrive.applied
                    ? "Already Applied"
                    : "Apply for Drive"}

                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
};

export default PlacementDrive;

