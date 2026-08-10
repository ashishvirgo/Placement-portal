
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiBriefcase,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiFileText,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
  FiXCircle,
  FiChevronRight,
  FiAward,
  FiAlertCircle,
} from "react-icons/fi";

const API =
  import.meta.env.VITE_BACKEND_API ||
  import.meta.env.VITE_API_URL;

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // =========================================================
  // DEMO DATA
  // Replace with API response
  // =========================================================

  const demoApplications = [
    {
      _id: "APP001",

      company: "TCS",
      logo: "T",
      role: "Graduate Engineer Trainee",

      package: "7.5 LPA",

      location: "Noida / Delhi NCR",

      appliedOn: "2026-08-04",

      driveDate: "2026-08-20",

      status: "Shortlisted",

      currentStage: "Technical Interview",

      totalStages: 5,
      completedStages: 3,

      eligibility: "Eligible",

      applicationId: "TCS-2026-001",

      recruiter: "TCS Campus Recruitment",

      description:
        "Software development and technology consulting role for engineering graduates.",

      stages: [
        {
          name: "Application Submitted",
          status: "completed",
          date: "04 Aug 2026",
        },
        {
          name: "Resume Screening",
          status: "completed",
          date: "06 Aug 2026",
        },
        {
          name: "Online Assessment",
          status: "completed",
          date: "10 Aug 2026",
          score: "78%",
        },
        {
          name: "Technical Interview",
          status: "current",
          date: "20 Aug 2026",
        },
        {
          name: "HR Interview",
          status: "pending",
        },
      ],
    },

    {
      _id: "APP002",

      company: "Infosys",
      logo: "I",
      role: "Systems Engineer",

      package: "6.5 LPA",

      location: "Pune / Bengaluru / Hyderabad",

      appliedOn: "2026-08-01",

      driveDate: "2026-08-18",

      status: "Assessment Scheduled",

      currentStage: "Online Assessment",

      totalStages: 4,
      completedStages: 2,

      eligibility: "Eligible",

      applicationId: "INFY-2026-002",

      recruiter: "Infosys Campus Hiring",

      description:
        "Entry-level software engineering role involving application development and testing.",

      stages: [
        {
          name: "Application Submitted",
          status: "completed",
          date: "01 Aug 2026",
        },
        {
          name: "Eligibility Verification",
          status: "completed",
          date: "03 Aug 2026",
        },
        {
          name: "Online Assessment",
          status: "current",
          date: "18 Aug 2026",
        },
        {
          name: "Interview",
          status: "pending",
        },
      ],
    },

    {
      _id: "APP003",

      company: "Accenture",
      logo: "A",
      role: "Associate Software Engineer",

      package: "7.2 LPA",

      location: "Gurugram",

      appliedOn: "2026-07-25",

      driveDate: "2026-08-12",

      status: "Selected",

      currentStage: "Offer Received",

      totalStages: 5,
      completedStages: 5,

      eligibility: "Eligible",

      applicationId: "ACC-2026-003",

      recruiter: "Accenture Campus Hiring",

      description:
        "Software engineering position focused on application development and cloud technologies.",

      stages: [
        {
          name: "Application Submitted",
          status: "completed",
          date: "25 Jul 2026",
        },
        {
          name: "Online Assessment",
          status: "completed",
          date: "29 Jul 2026",
          score: "84%",
        },
        {
          name: "Technical Interview",
          status: "completed",
          date: "04 Aug 2026",
        },
        {
          name: "HR Interview",
          status: "completed",
          date: "07 Aug 2026",
        },
        {
          name: "Offer Received",
          status: "completed",
          date: "09 Aug 2026",
        },
      ],
    },

    {
      _id: "APP004",

      company: "Wipro",
      logo: "W",
      role: "Project Engineer",

      package: "5.8 LPA",

      location: "Noida",

      appliedOn: "2026-07-20",

      driveDate: "2026-08-05",

      status: "Rejected",

      currentStage: "Application Closed",

      totalStages: 4,
      completedStages: 3,

      eligibility: "Eligible",

      applicationId: "WIP-2026-004",

      recruiter: "Wipro Campus Recruitment",

      description:
        "Technology role involving software development and enterprise applications.",

      stages: [
        {
          name: "Application Submitted",
          status: "completed",
          date: "20 Jul 2026",
        },
        {
          name: "Online Assessment",
          status: "completed",
          date: "25 Jul 2026",
          score: "61%",
        },
        {
          name: "Technical Interview",
          status: "completed",
          date: "02 Aug 2026",
        },
        {
          name: "Application Closed",
          status: "rejected",
          date: "05 Aug 2026",
        },
      ],
    },

    {
      _id: "APP005",

      company: "Capgemini",
      logo: "C",
      role: "Software Analyst",

      package: "6.0 LPA",

      location: "Noida",

      appliedOn: "2026-08-06",

      driveDate: "2026-08-25",

      status: "Applied",

      currentStage: "Resume Screening",

      totalStages: 5,
      completedStages: 1,

      eligibility: "Eligible",

      applicationId: "CAP-2026-005",

      recruiter: "Capgemini Campus Team",

      description:
        "Software analyst role involving application development and business technology solutions.",

      stages: [
        {
          name: "Application Submitted",
          status: "completed",
          date: "06 Aug 2026",
        },
        {
          name: "Resume Screening",
          status: "current",
        },
        {
          name: "Online Assessment",
          status: "pending",
        },
        {
          name: "Technical Interview",
          status: "pending",
        },
        {
          name: "HR Interview",
          status: "pending",
        },
      ],
    },
  ];

  // =========================================================
  // FETCH APPLICATIONS
  // =========================================================

  const fetchApplications = async () => {
    try {
      setError("");

      const userData =
        localStorage.getItem("user");

      if (!userData) {
        setApplications(demoApplications);
        return;
      }

      const user = JSON.parse(userData);

      if (!token || !API) {
        setApplications(demoApplications);
        return;
      }

      const response = await axios.get(
        `${API}/api/applications/student/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(
        response.data?.applications ||
          response.data ||
          []
      );
    } catch (err) {
      console.error(
        "Application fetch error:",
        err
      );

      // Demo fallback
      setApplications(demoApplications);

      setError(
        "Unable to load live applications. Showing sample data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchApplications();
  };

  // =========================================================
  // STATUS HELPERS
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selected":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <FiCheckCircle />,
        };

      case "Rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <FiXCircle />,
        };

      case "Shortlisted":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: <FiAward />,
        };

      case "Assessment Scheduled":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: <FiCalendar />,
        };

      case "Applied":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: <FiClock />,
        };

      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <FiBriefcase />,
        };
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.company
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        application.role
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    applications,
    search,
    statusFilter,
  ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const stats = {
    total: applications.length,

    applied: applications.filter(
      (item) => item.status === "Applied"
    ).length,

    shortlisted: applications.filter(
      (item) =>
        item.status === "Shortlisted" ||
        item.status ===
          "Assessment Scheduled"
    ).length,

    selected: applications.filter(
      (item) => item.status === "Selected"
    ).length,

    rejected: applications.filter(
      (item) => item.status === "Rejected"
    ).length,
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // APPLICATION DETAILS MODAL
  // =========================================================

  const ApplicationDetails = ({
    application,
  }) => {
    if (!application) return null;

    const status = getStatusStyle(
      application.status
    );

    return (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/60
          flex
          items-center
          justify-center
          p-4
        "
      >
        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-hidden
            shadow-2xl
          "
        >

          {/* Modal Header */}

          <div
            className="
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              p-6
              text-white
            "
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-white
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                  "
                >
                  {application.logo ||
                    application.company?.charAt(
                      0
                    )}
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {application.company}
                  </h2>

                  <p className="text-blue-100">
                    {application.role}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/20
                  hover:bg-white/30
                  flex
                  items-center
                  justify-center
                "
              >
                <FiXCircle />
              </button>

            </div>

          </div>

          {/* Modal Body */}

          <div
            className="
              p-6
              overflow-y-auto
              max-h-[70vh]
            "
          >

            {/* Basic Information */}

            <div className="grid md:grid-cols-4 gap-4 mb-7">

              <InfoBox
                icon={<FiAward />}
                label="Package"
                value={application.package}
              />

              <InfoBox
                icon={<FiMapPin />}
                label="Location"
                value={application.location}
              />

              <InfoBox
                icon={<FiCalendar />}
                label="Drive Date"
                value={formatDate(
                  application.driveDate
                )}
              />

              <InfoBox
                icon={<FiFileText />}
                label="Application ID"
                value={
                  application.applicationId
                }
              />

            </div>

            {/* Status */}

            <div className="mb-7">

              <h3 className="text-lg font-bold mb-4">
                Current Status
              </h3>

              <div
                className={`
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  font-semibold
                  ${status.bg}
                  ${status.text}
                `}
              >
                {status.icon}
                {application.status}
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Current stage:{" "}
                <strong>
                  {application.currentStage}
                </strong>
              </p>

            </div>

            {/* Timeline */}

            <div>

              <h3 className="text-lg font-bold mb-5">
                Application Progress
              </h3>

              <div className="space-y-5">

                {application.stages?.map(
                  (stage, index) => {

                    const completed =
                      stage.status ===
                      "completed";

                    const current =
                      stage.status ===
                      "current";

                    const rejected =
                      stage.status ===
                      "rejected";

                    return (
                      <div
                        key={index}
                        className="flex gap-4"
                      >

                        <div className="flex flex-col items-center">

                          <div
                            className={`
                              w-10
                              h-10
                              rounded-full
                              flex
                              items-center
                              justify-center
                              ${
                                completed
                                  ? "bg-green-100 text-green-600"
                                  : current
                                  ? "bg-blue-100 text-blue-600"
                                  : rejected
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-400"
                              }
                            `}
                          >

                            {completed ? (
                              <FiCheckCircle />
                            ) : rejected ? (
                              <FiXCircle />
                            ) : current ? (
                              <FiClock />
                            ) : (
                              <span>
                                {index + 1}
                              </span>
                            )}

                          </div>

                          {index <
                            application.stages
                              .length -
                              1 && (
                            <div
                              className={`
                                w-0.5
                                h-10
                                ${
                                  completed
                                    ? "bg-green-300"
                                    : "bg-gray-200"
                                }
                              `}
                            />
                          )}

                        </div>

                        <div className="pb-2">

                          <h4 className="font-semibold">
                            {stage.name}
                          </h4>

                          {stage.date && (
                            <p className="text-xs text-gray-500 mt-1">
                              {stage.date}
                            </p>
                          )}

                          {stage.score && (
                            <p className="text-sm text-blue-600 font-semibold mt-1">
                              Assessment Score:{" "}
                              {stage.score}
                            </p>
                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* Description */}

            {application.description && (
              <div className="mt-7">

                <h3 className="text-lg font-bold mb-2">
                  Job Description
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {application.description}
                </p>

              </div>
            )}

          </div>

          {/* Footer */}

          <div
            className="
              p-5
              border-t
              flex
              justify-end
              gap-3
            "
          >

            <button
              onClick={() =>
                setSelectedApplication(null)
              }
              className="
                px-5
                py-2.5
                bg-gray-100
                hover:bg-gray-200
                rounded-lg
                font-medium
              "
            >
              Close
            </button>

          </div>

        </div>
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">

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
            Loading your applications...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div
        className="
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          rounded-3xl
          p-7
          text-white
          shadow-xl
        "
      >

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

          <div>

            <h1 className="text-3xl font-bold">
              My Applications
            </h1>

            <p className="mt-2 text-blue-100">
              Track all your placement
              applications and interview stages.
            </p>

          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-white/20
              hover:bg-white/30
              backdrop-blur-sm
              font-medium
            "
          >
            <FiRefreshCw
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div
          className="
            bg-yellow-50
            border
            border-yellow-200
            text-yellow-700
            p-4
            rounded-xl
            flex
            items-center
            gap-3
          "
        >
          <FiAlertCircle />
          {error}
        </div>
      )}

      {/* Statistics */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <StatCard
          title="Total"
          value={stats.total}
          icon={<FiBriefcase />}
          color="blue"
        />

        <StatCard
          title="Applied"
          value={stats.applied}
          icon={<FiFileText />}
          color="yellow"
        />

        <StatCard
          title="Shortlisted"
          value={stats.shortlisted}
          icon={<FiAward />}
          color="purple"
        />

        <StatCard
          title="Selected"
          value={stats.selected}
          icon={<FiCheckCircle />}
          color="green"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<FiXCircle />}
          color="red"
        />

      </div>

      {/* Search & Filter */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          p-4
          shadow
          border
          border-gray-100
          dark:border-slate-700
          flex
          flex-col
          md:flex-row
          gap-4
        "
      >

        <div className="flex-1 relative">

          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700
              dark:bg-slate-800
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            dark:border-slate-700
            dark:bg-slate-800
            outline-none
            min-w-[190px]
          "
        >
          <option value="All">
            All Applications
          </option>

          <option value="Applied">
            Applied
          </option>

          <option value="Assessment Scheduled">
            Assessment Scheduled
          </option>

          <option value="Shortlisted">
            Shortlisted
          </option>

          <option value="Selected">
            Selected
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

      </div>

      {/* Applications */}

      {filteredApplications.length === 0 ? (
        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow
            p-12
            text-center
          "
        >

          <FiBriefcase
            size={45}
            className="
              mx-auto
              text-gray-300
            "
          />

          <h3 className="text-xl font-bold mt-4">
            No Applications Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try changing your search or filter.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {filteredApplications.map(
            (application) => {

              const status =
                getStatusStyle(
                  application.status
                );

              const progress =
                application.totalStages
                  ? Math.round(
                      (application.completedStages /
                        application.totalStages) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={application._id}
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-2xl
                    shadow-lg
                    border
                    border-gray-100
                    dark:border-slate-700
                    p-5
                    hover:shadow-xl
                    transition
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      gap-5
                    "
                  >

                    {/* Company */}

                    <div className="flex items-center gap-4 lg:w-[28%]">

                      <div
                        className="
                          w-16
                          h-16
                          rounded-2xl
                          bg-gradient-to-br
                          from-blue-100
                          to-indigo-100
                          text-blue-700
                          flex
                          items-center
                          justify-center
                          text-2xl
                          font-bold
                          flex-shrink-0
                        "
                      >
                        {application.logo ||
                          application.company?.charAt(
                            0
                          )}
                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                          {application.company}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {application.role}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">

                          <span className="flex items-center gap-1">
                            <FiMapPin />
                            {application.location}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Package */}

                    <div className="lg:w-[13%]">

                      <p className="text-xs text-gray-500">
                        Package
                      </p>

                      <p className="font-bold text-green-600 mt-1">
                        {application.package}
                      </p>

                    </div>

                    {/* Applied */}

                    <div className="lg:w-[15%]">

                      <p className="text-xs text-gray-500">
                        Applied On
                      </p>

                      <p className="font-semibold text-sm mt-1">
                        {formatDate(
                          application.appliedOn
                        )}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">

                        Drive:{" "}
                        {formatDate(
                          application.driveDate
                        )}

                      </p>

                    </div>

                    {/* Status */}

                    <div className="lg:w-[18%]">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-semibold
                          ${status.bg}
                          ${status.text}
                        `}
                      >
                        {status.icon}
                        {application.status}
                      </span>

                      <p className="text-xs text-gray-500 mt-2">
                        {application.currentStage}
                      </p>

                    </div>

                    {/* Progress */}

                    <div className="lg:w-[16%]">

                      <div className="flex justify-between text-xs mb-1">

                        <span className="text-gray-500">
                          Progress
                        </span>

                        <span className="font-semibold">
                          {progress}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className={`
                            h-full
                            rounded-full
                            ${
                              application.status ===
                              "Rejected"
                                ? "bg-red-500"
                                : application.status ===
                                  "Selected"
                                ? "bg-green-500"
                                : "bg-blue-600"
                            }
                          `}
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Action */}

                    <div className="lg:w-[10%] flex lg:justify-end">

                      <button
                        onClick={() =>
                          setSelectedApplication(
                            application
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2.5
                          rounded-xl
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          text-sm
                          font-medium
                          transition
                        "
                      >

                        <FiEye />

                        View

                      </button>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* Footer Summary */}

      <div
        className="
          bg-blue-50
          dark:bg-slate-900
          border
          border-blue-100
          dark:border-slate-700
          rounded-2xl
          p-5
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
      >

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FiTrendingUp />
          </div>

          <div>

            <h3 className="font-bold">
              Keep applying!
            </h3>

            <p className="text-sm text-gray-500">
              More quality applications increase
              your placement opportunities.
            </p>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-medium
          "
        >
          Explore Placement Drives
          <FiChevronRight />
        </button>

      </div>

      {/* Details Modal */}

      {selectedApplication && (
        <ApplicationDetails
          application={
            selectedApplication
          }
        />
      )}

    </div>
  );
};

// =============================================================
// STAT CARD
// =============================================================

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {
    blue: "bg-blue-100 text-blue-600",
    yellow:
      "bg-yellow-100 text-yellow-600",
    purple:
      "bg-purple-100 text-purple-600",
    green:
      "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        p-5
        shadow
        border
        border-gray-100
        dark:border-slate-700
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-gray-500">
            {title}
          </p>

          <p className="text-3xl font-bold mt-1">
            {value}
          </p>

        </div>

        <div
          className={`
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            ${colors[color]}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

// =============================================================
// INFO BOX
// =============================================================

const InfoBox = ({
  icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        bg-gray-50
        dark:bg-slate-800
        rounded-xl
        p-4
      "
    >

      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs text-gray-500">
          {label}
        </span>
      </div>

      <p className="font-semibold mt-2 text-sm break-words">
        {value || "N/A"}
      </p>

    </div>
  );
};

export default MyApplications;

