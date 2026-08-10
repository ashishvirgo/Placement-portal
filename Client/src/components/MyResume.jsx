
import React, { useEffect, useState } from "react";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiSave,
  FiDownload,
  FiEye,
  FiFileText,
  FiAward,
  FiBriefcase,
  FiCode,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";

const MyResume = ({ student }) => {
  const [activeSection, setActiveSection] =
    useState("personal");

  const [showPreview, setShowPreview] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [resume, setResume] = useState({
    personal: {
      name: student?.name || "",
      email: student?.email || "",
      phone: "",
      location: "Ghaziabad, Uttar Pradesh",
      linkedin: "",
      github: "",
      portfolio: "",
      careerObjective:
        "Motivated engineering student seeking an opportunity to apply technical, problem-solving and software development skills in a growth-oriented organization.",
    },

    education: [
      {
        degree: "B.Tech",
        branch:
          "Computer Science & Engineering",
        college: "ABES Engineering College",
        startYear: "2023",
        endYear: "2027",
        cgpa: "",
      },
    ],

    skills: {
      programming: [
        "Java",
        "Python",
        "C++",
        "JavaScript",
      ],

      frontend: [
        "HTML",
        "CSS",
        "React.js",
      ],

      backend: [
        "Node.js",
        "Express.js",
      ],

      database: [
        "MongoDB",
        "MySQL",
      ],

      tools: [
        "Git",
        "GitHub",
        "VS Code",
      ],
    },

    internships: [],

    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        github: "",
        live: "",
      },
    ],

    certifications: [],

    achievements: [],

    codingProfiles: {
      github: "",
      leetcode: "",
      codechef: "",
      hackerrank: "",
      geeksforgeeks: "",
    },

    atsScore: 0,
  });

  /* =====================================================
     LOAD RESUME
  ===================================================== */

  useEffect(() => {
    const loadResume = async () => {
      try {
        /*
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/resume/my-resume`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setResume(data.resume);
        }
        */

        const savedResume =
          localStorage.getItem(
            "studentResume"
          );

        if (savedResume) {
          setResume(
            JSON.parse(savedResume)
          );
        }
      } catch (error) {
        console.error(
          "Resume loading error:",
          error
        );
      }
    };

    loadResume();
  }, []);

  /* =====================================================
     UPDATE PERSONAL INFORMATION
  ===================================================== */

  const updatePersonal = (
    field,
    value
  ) => {
    setResume((prev) => ({
      ...prev,

      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  /* =====================================================
     EDUCATION
  ===================================================== */

  const updateEducation = (
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const education = [
        ...prev.education,
      ];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...prev,
        education,
      };
    });
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,

      education: [
        ...prev.education,

        {
          degree: "",
          branch: "",
          college: "",
          startYear: "",
          endYear: "",
          cgpa: "",
        },
      ],
    }));
  };

  const removeEducation = (
    index
  ) => {
    setResume((prev) => ({
      ...prev,

      education:
        prev.education.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =====================================================
     SKILLS
  ===================================================== */

  const updateSkills = (
    category,
    value
  ) => {
    const skills = value
      .split(",")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);

    setResume((prev) => ({
      ...prev,

      skills: {
        ...prev.skills,
        [category]: skills,
      },
    }));
  };

  /* =====================================================
     INTERNSHIPS
  ===================================================== */

  const addInternship = () => {
    setResume((prev) => ({
      ...prev,

      internships: [
        ...prev.internships,

        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          technologies: "",
        },
      ],
    }));
  };

  const updateInternship = (
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const internships = [
        ...prev.internships,
      ];

      internships[index] = {
        ...internships[index],
        [field]: value,
      };

      return {
        ...prev,
        internships,
      };
    });
  };

  const removeInternship = (
    index
  ) => {
    setResume((prev) => ({
      ...prev,

      internships:
        prev.internships.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =====================================================
     PROJECTS
  ===================================================== */

  const addProject = () => {
    setResume((prev) => ({
      ...prev,

      projects: [
        ...prev.projects,

        {
          title: "",
          description: "",
          technologies: "",
          github: "",
          live: "",
        },
      ],
    }));
  };

  const updateProject = (
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const projects = [
        ...prev.projects,
      ];

      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...prev,
        projects,
      };
    });
  };

  const removeProject = (
    index
  ) => {
    setResume((prev) => ({
      ...prev,

      projects:
        prev.projects.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =====================================================
     CERTIFICATIONS
  ===================================================== */

  const addCertification = () => {
    setResume((prev) => ({
      ...prev,

      certifications: [
        ...prev.certifications,

        {
          name: "",
          organization: "",
          year: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const updateCertification = (
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const certifications = [
        ...prev.certifications,
      ];

      certifications[index] = {
        ...certifications[index],
        [field]: value,
      };

      return {
        ...prev,
        certifications,
      };
    });
  };

  const removeCertification = (
    index
  ) => {
    setResume((prev) => ({
      ...prev,

      certifications:
        prev.certifications.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =====================================================
     SAVE RESUME
  ===================================================== */

  const saveResume = async () => {
    try {
      setSaving(true);

      /*
      Backend API:

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },

          body: JSON.stringify(
            resume
          ),
        }
      );
      */

      localStorage.setItem(
        "studentResume",
        JSON.stringify(resume)
      );

      setTimeout(() => {
        setSaving(false);
        alert(
          "Resume saved successfully!"
        );
      }, 700);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  /* =====================================================
     ATS SCORE
  ===================================================== */

  const calculateATS = () => {
    let score = 0;

    if (
      resume.personal.name
    )
      score += 10;

    if (
      resume.personal.email
    )
      score += 5;

    if (
      resume.personal.phone
    )
      score += 5;

    if (
      resume.personal.careerObjective
    )
      score += 10;

    if (
      resume.education.length > 0
    )
      score += 10;

    if (
      Object.values(
        resume.skills
      ).some(
        (items) => items.length > 0
      )
    )
      score += 15;

    if (
      resume.internships.length > 0
    )
      score += 15;

    if (
      resume.projects.length > 0 &&
      resume.projects.some(
        (p) => p.title
      )
    )
      score += 15;

    if (
      resume.certifications.length >
      0
    )
      score += 5;

    if (
      resume.personal.github ||
      resume.personal.linkedin
    )
      score += 5;

    setResume((prev) => ({
      ...prev,
      atsScore: Math.min(
        score,
        100
      ),
    }));
  };

  /* =====================================================
     PRINT / DOWNLOAD
  ===================================================== */

  const downloadResume = () => {
    window.print();
  };

  /* =====================================================
     INPUT COMPONENT
  ===================================================== */

  const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          dark:border-slate-600
          bg-white
          dark:bg-slate-700
          text-gray-800
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );

  /* =====================================================
     TEXTAREA
  ===================================================== */

  const TextArea = ({
    label,
    value,
    onChange,
    placeholder,
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      <textarea
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        rows={4}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          dark:border-slate-600
          bg-white
          dark:bg-slate-700
          text-gray-800
          dark:text-white
          outline-none
          resize-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );

  /* =====================================================
     SECTION BUTTON
  ===================================================== */

  const SectionButton = ({
    id,
    label,
    icon,
  }) => (
    <button
      onClick={() =>
        setActiveSection(id)
      }
      className={`
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        font-medium
        transition
        whitespace-nowrap

        ${
          activeSection === id
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <p className="text-blue-100">
              Placement Profile
            </p>

            <h1 className="text-3xl lg:text-4xl font-bold mt-1">
              My Resume
            </h1>

            <p className="mt-3 text-blue-100">
              Build an ATS-friendly resume
              for your placement applications.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setShowPreview(true)
              }
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-white
                text-blue-600
                font-semibold
                hover:bg-blue-50
              "
            >
              <FiEye />
              Preview
            </button>

            <button
              onClick={saveResume}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-green-500
                hover:bg-green-600
                text-white
                font-semibold
              "
            >
              <FiSave />

              {saving
                ? "Saving..."
                : "Save Resume"}
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          ATS SCORE
      ================================================= */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">

              <FiCheckCircle size={26} />

            </div>

            <div>

              <h2 className="font-bold text-lg dark:text-white">
                Resume ATS Score
              </h2>

              <p className="text-sm text-gray-500">
                Improve your resume visibility
                for recruiters.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-5">

            <div className="text-center">

              <p className="text-4xl font-bold text-green-600">
                {resume.atsScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

            <button
              onClick={calculateATS}
              className="
                px-5
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
              "
            >
              Analyze Resume
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4 overflow-x-auto">

        <div className="flex gap-3">

          <SectionButton
            id="personal"
            label="Personal"
            icon={<FiUser />}
          />

          <SectionButton
            id="education"
            label="Education"
            icon={<FiBookOpen />}
          />

          <SectionButton
            id="skills"
            label="Skills"
            icon={<FiCode />}
          />

          <SectionButton
            id="internships"
            label="Internships"
            icon={<FiBriefcase />}
          />

          <SectionButton
            id="projects"
            label="Projects"
            icon={<FiCode />}
          />

          <SectionButton
            id="certifications"
            label="Certifications"
            icon={<FiAward />}
          />

          <SectionButton
            id="profiles"
            label="Coding Profiles"
            icon={<FiGithub />}
          />

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">

        {/* =================================================
            PERSONAL
        ================================================= */}

        {activeSection ===
          "personal" && (

          <div className="space-y-6">

            <div>

              <h2 className="text-2xl font-bold dark:text-white">
                Personal Information
              </h2>

              <p className="text-gray-500 mt-1">
                Basic information recruiters
                will see on your resume.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <Input
                label="Full Name"
                value={
                  resume.personal.name
                }
                onChange={(value) =>
                  updatePersonal(
                    "name",
                    value
                  )
                }
                placeholder="Your full name"
              />

              <Input
                label="Email"
                value={
                  resume.personal.email
                }
                onChange={(value) =>
                  updatePersonal(
                    "email",
                    value
                  )
                }
                placeholder="your@email.com"
                type="email"
              />

              <Input
                label="Phone"
                value={
                  resume.personal.phone
                }
                onChange={(value) =>
                  updatePersonal(
                    "phone",
                    value
                  )
                }
                placeholder="+91 XXXXX XXXXX"
              />

              <Input
                label="Location"
                value={
                  resume.personal.location
                }
                onChange={(value) =>
                  updatePersonal(
                    "location",
                    value
                  )
                }
                placeholder="City, State"
              />

              <Input
                label="LinkedIn"
                value={
                  resume.personal.linkedin
                }
                onChange={(value) =>
                  updatePersonal(
                    "linkedin",
                    value
                  )
                }
                placeholder="https://linkedin.com/in/..."
              />

              <Input
                label="GitHub"
                value={
                  resume.personal.github
                }
                onChange={(value) =>
                  updatePersonal(
                    "github",
                    value
                  )
                }
                placeholder="https://github.com/..."
              />

              <Input
                label="Portfolio"
                value={
                  resume.personal.portfolio
                }
                onChange={(value) =>
                  updatePersonal(
                    "portfolio",
                    value
                  )
                }
                placeholder="https://..."
              />

            </div>

            <TextArea
              label="Career Objective"
              value={
                resume.personal
                  .careerObjective
              }
              onChange={(value) =>
                updatePersonal(
                  "careerObjective",
                  value
                )
              }
              placeholder="Write a short professional objective..."
            />

          </div>
        )}

        {/* =================================================
            EDUCATION
        ================================================= */}

        {activeSection ===
          "education" && (

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Education
                </h2>

                <p className="text-gray-500 mt-1">
                  Add your academic qualifications.
                </p>

              </div>

              <button
                onClick={
                  addEducation
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  bg-blue-600
                  text-white
                "
              >
                <FiPlus />
                Add Education
              </button>

            </div>

            {resume.education.map(
              (education, index) => (

                <div
                  key={index}
                  className="border dark:border-slate-600 rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-5">

                    <h3 className="font-bold dark:text-white">
                      Education #{index + 1}
                    </h3>

                    {resume.education
                      .length > 1 && (

                      <button
                        onClick={() =>
                          removeEducation(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <FiTrash2 />
                      </button>

                    )}

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <Input
                      label="Degree"
                      value={
                        education.degree
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "degree",
                          value
                        )
                      }
                      placeholder="B.Tech"
                    />

                    <Input
                      label="Branch"
                      value={
                        education.branch
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "branch",
                          value
                        )
                      }
                      placeholder="Computer Science & Engineering"
                    />

                    <Input
                      label="College / University"
                      value={
                        education.college
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "college",
                          value
                        )
                      }
                      placeholder="College name"
                    />

                    <Input
                      label="CGPA / Percentage"
                      value={
                        education.cgpa
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "cgpa",
                          value
                        )
                      }
                      placeholder="8.5"
                    />

                    <Input
                      label="Start Year"
                      value={
                        education.startYear
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "startYear",
                          value
                        )
                      }
                      placeholder="2023"
                    />

                    <Input
                      label="End Year"
                      value={
                        education.endYear
                      }
                      onChange={(value) =>
                        updateEducation(
                          index,
                          "endYear",
                          value
                        )
                      }
                      placeholder="2027"
                    />

                  </div>

                </div>

              )
            )}

          </div>
        )}

        {/* =================================================
            SKILLS
        ================================================= */}

        {activeSection ===
          "skills" && (

          <div className="space-y-6">

            <div>

              <h2 className="text-2xl font-bold dark:text-white">
                Technical Skills
              </h2>

              <p className="text-gray-500 mt-1">
                Separate skills with commas.
              </p>

            </div>

            {Object.entries(
              resume.skills
            ).map(
              ([category, skills]) => (

                <div key={category}>

                  <label className="block font-semibold capitalize mb-2 dark:text-gray-200">
                    {category ===
                    "programming"
                      ? "Programming Languages"
                      : category}
                  </label>

                  <input
                    value={skills.join(
                      ", "
                    )}
                    onChange={(e) =>
                      updateSkills(
                        category,
                        e.target.value
                      )
                    }
                    placeholder="Java, Python, C++, JavaScript"
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      rounded-xl
                      dark:bg-slate-700
                      dark:border-slate-600
                      dark:text-white
                      focus:ring-2
                      focus:ring-blue-500
                      outline-none
                    "
                  />

                </div>

              )
            )}

          </div>
        )}

        {/* =================================================
            INTERNSHIPS
        ================================================= */}

        {activeSection ===
          "internships" && (

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Internships
                </h2>

                <p className="text-gray-500 mt-1">
                  Add your internship experience.
                </p>

              </div>

              <button
                onClick={
                  addInternship
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded-xl
                "
              >
                <FiPlus />
                Add Internship
              </button>

            </div>

            {resume.internships.length ===
              0 && (

              <div className="text-center py-12 border border-dashed rounded-xl">

                <FiBriefcase
                  className="mx-auto text-gray-400"
                  size={35}
                />

                <p className="text-gray-500 mt-3">
                  No internships added yet.
                </p>

              </div>

            )}

            {resume.internships.map(
              (internship, index) => (

                <div
                  key={index}
                  className="border dark:border-slate-600 rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-5">

                    <h3 className="font-bold dark:text-white">
                      Internship #{index + 1}
                    </h3>

                    <button
                      onClick={() =>
                        removeInternship(
                          index
                        )
                      }
                      className="text-red-500"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <Input
                      label="Company"
                      value={
                        internship.company
                      }
                      onChange={(value) =>
                        updateInternship(
                          index,
                          "company",
                          value
                        )
                      }
                      placeholder="Company name"
                    />

                    <Input
                      label="Role"
                      value={
                        internship.role
                      }
                      onChange={(value) =>
                        updateInternship(
                          index,
                          "role",
                          value
                        )
                      }
                      placeholder="Software Developer Intern"
                    />

                    <Input
                      label="Start Date"
                      value={
                        internship.startDate
                      }
                      onChange={(value) =>
                        updateInternship(
                          index,
                          "startDate",
                          value
                        )
                      }
                      placeholder="June 2026"
                    />

                    <Input
                      label="End Date"
                      value={
                        internship.endDate
                      }
                      onChange={(value) =>
                        updateInternship(
                          index,
                          "endDate",
                          value
                        )
                      }
                      placeholder="August 2026"
                    />

                    <div className="md:col-span-2">

                      <Input
                        label="Technologies"
                        value={
                          internship.technologies
                        }
                        onChange={(value) =>
                          updateInternship(
                            index,
                            "technologies",
                            value
                          )
                        }
                        placeholder="React, Node.js, MongoDB"
                      />

                    </div>

                    <div className="md:col-span-2">

                      <TextArea
                        label="Description"
                        value={
                          internship.description
                        }
                        onChange={(value) =>
                          updateInternship(
                            index,
                            "description",
                            value
                          )
                        }
                        placeholder="Describe your work and achievements..."
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>
        )}

        {/* =================================================
            PROJECTS
        ================================================= */}

        {activeSection ===
          "projects" && (

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Projects
                </h2>

                <p className="text-gray-500 mt-1">
                  Showcase your best development
                  projects.
                </p>

              </div>

              <button
                onClick={addProject}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded-xl
                "
              >
                <FiPlus />
                Add Project
              </button>

            </div>

            {resume.projects.map(
              (project, index) => (

                <div
                  key={index}
                  className="border dark:border-slate-600 rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-5">

                    <h3 className="font-bold dark:text-white">
                      Project #{index + 1}
                    </h3>

                    {resume.projects
                      .length > 1 && (

                      <button
                        onClick={() =>
                          removeProject(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <FiTrash2 />
                      </button>

                    )}

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <Input
                      label="Project Title"
                      value={
                        project.title
                      }
                      onChange={(value) =>
                        updateProject(
                          index,
                          "title",
                          value
                        )
                      }
                      placeholder="Placement Management System"
                    />

                    <Input
                      label="Technologies"
                      value={
                        project.technologies
                      }
                      onChange={(value) =>
                        updateProject(
                          index,
                          "technologies",
                          value
                        )
                      }
                      placeholder="React, Node.js, MongoDB"
                    />

                    <Input
                      label="GitHub URL"
                      value={
                        project.github
                      }
                      onChange={(value) =>
                        updateProject(
                          index,
                          "github",
                          value
                        )
                      }
                      placeholder="https://github.com/..."
                    />

                    <Input
                      label="Live Project URL"
                      value={
                        project.live
                      }
                      onChange={(value) =>
                        updateProject(
                          index,
                          "live",
                          value
                        )
                      }
                      placeholder="https://..."
                    />

                    <div className="md:col-span-2">

                      <TextArea
                        label="Project Description"
                        value={
                          project.description
                        }
                        onChange={(value) =>
                          updateProject(
                            index,
                            "description",
                            value
                          )
                        }
                        placeholder="Explain the problem, solution, technologies and your contribution..."
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>
        )}

        {/* =================================================
            CERTIFICATIONS
        ================================================= */}

        {activeSection ===
          "certifications" && (

          <div className="space-y-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Certifications
                </h2>

                <p className="text-gray-500 mt-1">
                  Add industry certifications.
                </p>

              </div>

              <button
                onClick={
                  addCertification
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded-xl
                "
              >
                <FiPlus />
                Add Certification
              </button>

            </div>

            {resume.certifications.map(
              (
                certification,
                index
              ) => (

                <div
                  key={index}
                  className="border dark:border-slate-600 rounded-2xl p-5"
                >

                  <div className="flex justify-between mb-5">

                    <h3 className="font-bold dark:text-white">
                      Certification #{index + 1}
                    </h3>

                    <button
                      onClick={() =>
                        removeCertification(
                          index
                        )
                      }
                      className="text-red-500"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <Input
                      label="Certification Name"
                      value={
                        certification.name
                      }
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "name",
                          value
                        )
                      }
                      placeholder="AWS Cloud Practitioner"
                    />

                    <Input
                      label="Organization"
                      value={
                        certification.organization
                      }
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "organization",
                          value
                        )
                      }
                      placeholder="Amazon Web Services"
                    />

                    <Input
                      label="Year"
                      value={
                        certification.year
                      }
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "year",
                          value
                        )
                      }
                      placeholder="2026"
                    />

                    <Input
                      label="Credential URL"
                      value={
                        certification.credentialUrl
                      }
                      onChange={(value) =>
                        updateCertification(
                          index,
                          "credentialUrl",
                          value
                        )
                      }
                      placeholder="https://..."
                    />

                  </div>

                </div>

              )
            )}

          </div>
        )}

        {/* =================================================
            CODING PROFILES
        ================================================= */}

        {activeSection ===
          "profiles" && (

          <div className="space-y-6">

            <div>

              <h2 className="text-2xl font-bold dark:text-white">
                Coding & Professional Profiles
              </h2>

              <p className="text-gray-500 mt-1">
                These profiles can be used to
                calculate your placement readiness.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <Input
                label="GitHub"
                value={
                  resume.codingProfiles
                    .github
                }
                onChange={(value) =>
                  setResume((prev) => ({
                    ...prev,
                    codingProfiles: {
                      ...prev.codingProfiles,
                      github: value,
                    },
                  }))
                }
                placeholder="https://github.com/username"
              />

              <Input
                label="LeetCode"
                value={
                  resume.codingProfiles
                    .leetcode
                }
                onChange={(value) =>
                  setResume((prev) => ({
                    ...prev,
                    codingProfiles: {
                      ...prev.codingProfiles,
                      leetcode: value,
                    },
                  }))
                }
                placeholder="https://leetcode.com/username"
              />

              <Input
                label="CodeChef"
                value={
                  resume.codingProfiles
                    .codechef
                }
                onChange={(value) =>
                  setResume((prev) => ({
                    ...prev,
                    codingProfiles: {
                      ...prev.codingProfiles,
                      codechef: value,
                    },
                  }))
                }
                placeholder="https://codechef.com/users/username"
              />

              <Input
                label="HackerRank"
                value={
                  resume.codingProfiles
                    .hackerrank
                }
                onChange={(value) =>
                  setResume((prev) => ({
                    ...prev,
                    codingProfiles: {
                      ...prev.codingProfiles,
                      hackerrank: value,
                    },
                  }))
                }
                placeholder="https://hackerrank.com/username"
              />

              <Input
                label="GeeksforGeeks"
                value={
                  resume.codingProfiles
                    .geeksforgeeks
                }
                onChange={(value) =>
                  setResume((prev) => ({
                    ...prev,
                    codingProfiles: {
                      ...prev.codingProfiles,
                      geeksforgeeks: value,
                    },
                  }))
                }
                placeholder="https://geeksforgeeks.org/user/username"
              />

            </div>

            <div
              className="
                p-5
                rounded-2xl
                bg-blue-50
                dark:bg-blue-900/20
                border
                border-blue-100
                dark:border-blue-900
              "
            >

              <div className="flex gap-3">

                <FiGithub
                  className="text-blue-600 mt-1"
                  size={22}
                />

                <div>

                  <h3 className="font-bold dark:text-white">
                    Why add coding profiles?
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Your GitHub activity, coding
                    problem-solving performance and
                    projects can be used by the
                    placement system to calculate
                    your Placement Readiness Index.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* =================================================
          RESUME PREVIEW
      ================================================= */}

      {showPreview && (

        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl">

            {/* Preview Toolbar */}

            <div className="sticky top-0 z-10 bg-white border-b p-4 flex justify-between">

              <h2 className="font-bold text-xl">
                Resume Preview
              </h2>

              <div className="flex gap-2">

                <button
                  onClick={
                    downloadResume
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-blue-600
                    text-white
                    rounded-lg
                  "
                >
                  <FiDownload />
                  Print / PDF
                </button>

                <button
                  onClick={() =>
                    setShowPreview(
                      false
                    )
                  }
                  className="
                    px-4
                    py-2
                    bg-gray-200
                    rounded-lg
                  "
                >
                  Close
                </button>

              </div>

            </div>

            {/* Resume */}

            <div
              id="resume-preview"
              className="
                p-10
                text-gray-900
                bg-white
                min-h-[1000px]
              "
            >

              {/* Name */}

              <div className="text-center border-b pb-5">

                <h1 className="text-3xl font-bold uppercase">

                  {
                    resume.personal
                      .name ||
                    "Your Name"
                  }

                </h1>

                <p className="text-sm mt-2">

                  {resume.personal.email}

                  {resume.personal.phone &&
                    ` | ${resume.personal.phone}`}

                  {resume.personal.location &&
                    ` | ${resume.personal.location}`}

                </p>

                <p className="text-sm mt-1">

                  {resume.personal.linkedin}

                  {resume.personal.github &&
                    ` | ${resume.personal.github}`}

                </p>

              </div>

              {/* Objective */}

              {resume.personal
                .careerObjective && (

                <section className="mt-5">

                  <h2 className="font-bold border-b pb-1 uppercase">
                    Career Objective
                  </h2>

                  <p className="text-sm mt-2 leading-relaxed">
                    {
                      resume.personal
                        .careerObjective
                    }
                  </p>

                </section>

              )}

              {/* Education */}

              {resume.education
                .length > 0 && (

                <section className="mt-5">

                  <h2 className="font-bold border-b pb-1 uppercase">
                    Education
                  </h2>

                  {resume.education.map(
                    (
                      education,
                      index
                    ) => (

                      <div
                        key={index}
                        className="mt-3"
                      >

                        <div className="flex justify-between">

                          <strong>
                            {
                              education.degree
                            }{" "}
                            -{" "}
                            {
                              education.branch
                            }
                          </strong>

                          <span>
                            {
                              education.startYear
                            }{" "}
                            -{" "}
                            {
                              education.endYear
                            }
                          </span>

                        </div>

                        <p className="text-sm">
                          {
                            education.college
                          }
                        </p>

                        {education.cgpa && (
                          <p className="text-sm">
                            CGPA:{" "}
                            {
                              education.cgpa
                            }
                          </p>
                        )}

                      </div>

                    )
                  )}

                </section>

              )}

              {/* Skills */}

              <section className="mt-5">

                <h2 className="font-bold border-b pb-1 uppercase">
                  Technical Skills
                </h2>

                <div className="mt-3 space-y-1 text-sm">

                  {Object.entries(
                    resume.skills
                  ).map(
                    (
                      [
                        category,
                        skills,
                      ]
                    ) =>
                      skills.length >
                      0 ? (

                        <p
                          key={
                            category
                          }
                        >

                          <strong className="capitalize">
                            {category}:
                          </strong>{" "}

                          {skills.join(
                            ", "
                          )}

                        </p>

                      ) : null
                  )}

                </div>

              </section>

              {/* Internships */}

              {resume.internships
                .length > 0 && (

                <section className="mt-5">

                  <h2 className="font-bold border-b pb-1 uppercase">
                    Internships
                  </h2>

                  {resume.internships.map(
                    (
                      internship,
                      index
                    ) => (

                      <div
                        key={index}
                        className="mt-3"
                      >

                        <div className="flex justify-between">

                          <strong>
                            {
                              internship.role
                            }{" "}
                            -{" "}
                            {
                              internship.company
                            }
                          </strong>

                          <span>
                            {
                              internship.startDate
                            }{" "}
                            -{" "}
                            {
                              internship.endDate
                            }
                          </span>

                        </div>

                        <p className="text-sm mt-1">
                          {
                            internship.description
                          }
                        </p>

                        {internship.technologies && (
                          <p className="text-sm mt-1">
                            Technologies:{" "}
                            {
                              internship.technologies
                            }
                          </p>
                        )}

                      </div>

                    )
                  )}

                </section>

              )}

              {/* Projects */}

              {resume.projects.some(
                (project) =>
                  project.title
              ) && (

                <section className="mt-5">

                  <h2 className="font-bold border-b pb-1 uppercase">
                    Projects
                  </h2>

                  {resume.projects
                    .filter(
                      (project) =>
                        project.title
                    )
                    .map(
                      (
                        project,
                        index
                      ) => (

                        <div
                          key={index}
                          className="mt-3"
                        >

                          <strong>
                            {
                              project.title
                            }
                          </strong>

                          {project.technologies && (
                            <span className="text-sm">
                              {" "}
                              |{" "}
                              {
                                project.technologies
                              }
                            </span>
                          )}

                          <p className="text-sm mt-1">
                            {
                              project.description
                            }
                          </p>

                          {project.github && (
                            <p className="text-xs mt-1">
                              GitHub:{" "}
                              {
                                project.github
                              }
                            </p>
                          )}

                        </div>

                      )
                    )}

                </section>

              )}

              {/* Certifications */}

              {resume.certifications
                .length > 0 && (

                <section className="mt-5">

                  <h2 className="font-bold border-b pb-1 uppercase">
                    Certifications
                  </h2>

                  <ul className="mt-2 text-sm list-disc ml-5">

                    {resume.certifications.map(
                      (
                        certification,
                        index
                      ) => (

                        <li key={index}>

                          <strong>
                            {
                              certification.name
                            }
                          </strong>

                          {" - "}

                          {
                            certification.organization
                          }

                          {certification.year &&
                            ` (${certification.year})`}

                        </li>

                      )
                    )}

                  </ul>

                </section>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default MyResume;

