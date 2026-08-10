
import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiBookOpen,
  FiVideo,
  FiX,
  FiFileText,
  FiClipboard,
  FiCode,
  FiBriefcase,
  FiDatabase,
  FiCpu,
  FiActivity,
  FiLayers,
  FiZap,
  FiHome,
  FiTarget,
} from "react-icons/fi";

/*
===========================================================
PLACEMENT PREPARATION DATA
===========================================================

Common topics are applicable to almost every branch.

Branch-specific topics are added according to the
engineering branch.
*/

const placementData = {
  CSE: {
    Common: [
      {
        topic: "Aptitude",
        category: "Quantitative Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 60,
      },
      {
        topic: "Data Interpretation",
        category: "Aptitude",
        level: "Intermediate",
        questions: 250,
        difficulty: "Hard",
        progress: 35,
      },
    ],

    Technical: [
      {
        topic: "Programming Fundamentals",
        category: "Programming",
        level: "Basic → Advanced",
        questions: 350,
        difficulty: "Medium",
        progress: 70,
      },
      {
        topic: "Data Structures",
        category: "DSA",
        level: "Intermediate → Advanced",
        questions: 500,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "Algorithms",
        category: "DSA",
        level: "Intermediate → Advanced",
        questions: 450,
        difficulty: "Hard",
        progress: 40,
      },
      {
        topic: "Object Oriented Programming",
        category: "Programming",
        level: "Intermediate",
        questions: 300,
        difficulty: "Medium",
        progress: 65,
      },
      {
        topic: "DBMS",
        category: "Database",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Operating Systems",
        category: "Core CS",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 40,
      },
      {
        topic: "Computer Networks",
        category: "Core CS",
        level: "Intermediate",
        questions: 220,
        difficulty: "Medium",
        progress: 35,
      },
      {
        topic: "System Design",
        category: "Advanced CS",
        level: "Advanced",
        questions: 150,
        difficulty: "Hard",
        progress: 20,
      },
    ],

    Development: [
      {
        topic: "HTML & CSS",
        category: "Web Development",
        level: "Basic → Advanced",
        questions: 150,
        difficulty: "Easy",
        progress: 80,
      },
      {
        topic: "JavaScript",
        category: "Web Development",
        level: "Intermediate → Advanced",
        questions: 250,
        difficulty: "Hard",
        progress: 60,
      },
      {
        topic: "React.js",
        category: "Frontend",
        level: "Intermediate → Advanced",
        questions: 200,
        difficulty: "Hard",
        progress: 50,
      },
      {
        topic: "Node.js & Express",
        category: "Backend",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "MongoDB",
        category: "Database",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 40,
      },
    ],
  },

  "CSE-AIML": {
    Common: [
      {
        topic: "Aptitude",
        category: "Quantitative Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 60,
      },
    ],

    Technical: [
      {
        topic: "Python Programming",
        category: "Programming",
        level: "Basic → Advanced",
        questions: 350,
        difficulty: "Medium",
        progress: 65,
      },
      {
        topic: "Data Structures & Algorithms",
        category: "DSA",
        level: "Intermediate → Advanced",
        questions: 500,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "Machine Learning",
        category: "AI/ML",
        level: "Intermediate → Advanced",
        questions: 300,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Deep Learning",
        category: "AI/ML",
        level: "Advanced",
        questions: 250,
        difficulty: "Hard",
        progress: 25,
      },
      {
        topic: "Natural Language Processing",
        category: "AI",
        level: "Advanced",
        questions: 180,
        difficulty: "Hard",
        progress: 20,
      },
      {
        topic: "Computer Vision",
        category: "AI",
        level: "Advanced",
        questions: 180,
        difficulty: "Hard",
        progress: 20,
      },
      {
        topic: "Statistics & Probability",
        category: "Mathematics",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Generative AI",
        category: "AI",
        level: "Intermediate → Advanced",
        questions: 150,
        difficulty: "Hard",
        progress: 15,
      },
    ],

    Development: [
      {
        topic: "Python Development",
        category: "Development",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 60,
      },
      {
        topic: "FastAPI",
        category: "Backend",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 35,
      },
      {
        topic: "TensorFlow / PyTorch",
        category: "AI Framework",
        level: "Advanced",
        questions: 150,
        difficulty: "Hard",
        progress: 25,
      },
      {
        topic: "ML Projects",
        category: "Projects",
        level: "Advanced",
        questions: 100,
        difficulty: "Hard",
        progress: 20,
      },
    ],
  },

  "CSE-DS": {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
    ],

    Technical: [
      {
        topic: "Python",
        category: "Programming",
        level: "Basic → Advanced",
        questions: 350,
        difficulty: "Medium",
        progress: 65,
      },
      {
        topic: "Data Structures",
        category: "DSA",
        level: "Intermediate",
        questions: 400,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "Statistics",
        category: "Data Science",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Data Analytics",
        category: "Data Science",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 40,
      },
      {
        topic: "SQL",
        category: "Database",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Machine Learning",
        category: "AI/ML",
        level: "Advanced",
        questions: 300,
        difficulty: "Hard",
        progress: 30,
      },
      {
        topic: "Data Visualization",
        category: "Analytics",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 45,
      },
    ],

    Development: [
      {
        topic: "Pandas",
        category: "Python",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "NumPy",
        category: "Python",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Power BI",
        category: "Analytics",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 30,
      },
      {
        topic: "Tableau",
        category: "Analytics",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 25,
      },
    ],
  },

  IT: {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 60,
      },
    ],

    Technical: [
      {
        topic: "Java Programming",
        category: "Programming",
        level: "Intermediate → Advanced",
        questions: 350,
        difficulty: "Medium",
        progress: 60,
      },
      {
        topic: "Data Structures & Algorithms",
        category: "DSA",
        level: "Intermediate → Advanced",
        questions: 450,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "DBMS & SQL",
        category: "Database",
        level: "Intermediate",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
      {
        topic: "Operating Systems",
        category: "Core IT",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 40,
      },
      {
        topic: "Computer Networks",
        category: "Networking",
        level: "Intermediate",
        questions: 220,
        difficulty: "Medium",
        progress: 35,
      },
      {
        topic: "Cloud Computing",
        category: "Cloud",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 30,
      },
    ],

    Development: [
      {
        topic: "Java Spring Boot",
        category: "Backend",
        level: "Intermediate → Advanced",
        questions: 180,
        difficulty: "Hard",
        progress: 40,
      },
      {
        topic: "React.js",
        category: "Frontend",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "REST APIs",
        category: "Backend",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 50,
      },
    ],
  },

  ECE: {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
    ],

    Technical: [
      {
        topic: "Digital Electronics",
        category: "Electronics",
        level: "Intermediate",
        questions: 250,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Analog Electronics",
        category: "Electronics",
        level: "Intermediate",
        questions: 220,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Microprocessors",
        category: "Embedded",
        level: "Intermediate",
        questions: 200,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Microcontrollers",
        category: "Embedded",
        level: "Intermediate",
        questions: 180,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Communication Systems",
        category: "Communication",
        level: "Intermediate",
        questions: 220,
        difficulty: "Medium",
        progress: 40,
      },
      {
        topic: "Signals & Systems",
        category: "Electronics",
        level: "Advanced",
        questions: 180,
        difficulty: "Hard",
        progress: 30,
      },
    ],

    Development: [
      {
        topic: "Embedded C",
        category: "Embedded",
        level: "Intermediate",
        questions: 150,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "IoT",
        category: "Embedded",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 35,
      },
      {
        topic: "Arduino / ESP32",
        category: "Projects",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 40,
      },
    ],
  },

  EEE: {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
    ],

    Technical: [
      {
        topic: "Electrical Machines",
        category: "Electrical",
        level: "Intermediate",
        questions: 300,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "Power Systems",
        category: "Electrical",
        level: "Intermediate",
        questions: 250,
        difficulty: "Hard",
        progress: 40,
      },
      {
        topic: "Power Electronics",
        category: "Electrical",
        level: "Advanced",
        questions: 220,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Control Systems",
        category: "Electrical",
        level: "Advanced",
        questions: 220,
        difficulty: "Hard",
        progress: 30,
      },
      {
        topic: "Electrical Measurements",
        category: "Electrical",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 45,
      },
    ],

    Development: [
      {
        topic: "MATLAB",
        category: "Tools",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "PLC Programming",
        category: "Industrial Automation",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 30,
      },
      {
        topic: "IoT Projects",
        category: "Projects",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 35,
      },
    ],
  },

  Mechanical: {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
    ],

    Technical: [
      {
        topic: "Thermodynamics",
        category: "Mechanical",
        level: "Intermediate",
        questions: 250,
        difficulty: "Hard",
        progress: 45,
      },
      {
        topic: "Fluid Mechanics",
        category: "Mechanical",
        level: "Intermediate",
        questions: 220,
        difficulty: "Hard",
        progress: 40,
      },
      {
        topic: "Strength of Materials",
        category: "Mechanical",
        level: "Intermediate",
        questions: 250,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Theory of Machines",
        category: "Mechanical",
        level: "Advanced",
        questions: 220,
        difficulty: "Hard",
        progress: 30,
      },
      {
        topic: "Manufacturing Processes",
        category: "Manufacturing",
        level: "Intermediate",
        questions: 200,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Engineering Drawing",
        category: "Design",
        level: "Intermediate",
        questions: 150,
        difficulty: "Medium",
        progress: 40,
      },
    ],

    Development: [
      {
        topic: "AutoCAD",
        category: "Design",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "SolidWorks",
        category: "CAD",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 35,
      },
      {
        topic: "CATIA",
        category: "CAD",
        level: "Advanced",
        questions: 100,
        difficulty: "Hard",
        progress: 25,
      },
    ],
  },

  Civil: {
    Common: [
      {
        topic: "Quantitative Aptitude",
        category: "Aptitude",
        level: "Basic → Advanced",
        questions: 500,
        difficulty: "Medium",
        progress: 50,
      },
      {
        topic: "Logical Reasoning",
        category: "Reasoning",
        level: "Basic → Advanced",
        questions: 400,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Verbal Ability",
        category: "Communication",
        level: "Basic → Advanced",
        questions: 300,
        difficulty: "Medium",
        progress: 55,
      },
    ],

    Technical: [
      {
        topic: "Structural Analysis",
        category: "Civil Engineering",
        level: "Intermediate",
        questions: 250,
        difficulty: "Hard",
        progress: 40,
      },
      {
        topic: "Concrete Technology",
        category: "Construction",
        level: "Intermediate",
        questions: 220,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Geotechnical Engineering",
        category: "Civil Engineering",
        level: "Intermediate",
        questions: 220,
        difficulty: "Hard",
        progress: 35,
      },
      {
        topic: "Transportation Engineering",
        category: "Civil Engineering",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 40,
      },
      {
        topic: "Environmental Engineering",
        category: "Civil Engineering",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "Surveying",
        category: "Civil Engineering",
        level: "Intermediate",
        questions: 180,
        difficulty: "Medium",
        progress: 50,
      },
    ],

    Development: [
      {
        topic: "AutoCAD Civil",
        category: "Design",
        level: "Intermediate",
        questions: 120,
        difficulty: "Medium",
        progress: 45,
      },
      {
        topic: "STAAD Pro",
        category: "Structural Design",
        level: "Advanced",
        questions: 120,
        difficulty: "Hard",
        progress: 30,
      },
      {
        topic: "Revit",
        category: "BIM",
        level: "Intermediate",
        questions: 100,
        difficulty: "Medium",
        progress: 30,
      },
    ],
  },
};

const branchIcons = {
  CSE: <FiCode />,
  "CSE-AIML": <FiCpu />,
  "CSE-DS": <FiDatabase />,
  IT: <FiLayers />,
  ECE: <FiActivity />,
  EEE: <FiZap />,
  Mechanical: <FiTarget />,
  Civil: <FiHome />,
};

const PlacementPreparation = () => {
  const [branch, setBranch] = useState("CSE");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [selectedTopic, setSelectedTopic] = useState("");
  const [videos, setVideos] = useState([]);

  const [showVideos, setShowVideos] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const currentData = placementData[branch];

  // =====================================================
  // ALL TOPICS
  // =====================================================

  const allTopics = useMemo(() => {
    return Object.values(currentData).flat();
  }, [currentData]);

  // =====================================================
  // FILTER TOPICS
  // =====================================================

  const filteredData = useMemo(() => {
    const result = {};

    Object.entries(currentData).forEach(
      ([section, topics]) => {
        const filtered = topics.filter((topic) => {
          const matchesSearch =
            topic.topic
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            topic.category
              .toLowerCase()
              .includes(search.toLowerCase());

          const matchesCategory =
            category === "All" ||
            topic.category === category;

          return (
            matchesSearch &&
            matchesCategory
          );
        });

        if (filtered.length > 0) {
          result[section] = filtered;
        }
      }
    );

    return result;
  }, [currentData, search, category]);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        allTopics.map(
          (item) => item.category
        )
      ),
    ];
  }, [allTopics]);

  // =====================================================
  // FETCH VIDEO LECTURES
  // =====================================================

  const fetchTopicVideos = async (topic) => {
    try {
      setLoadingVideos(true);
      setShowVideos(true);
      setSelectedTopic(topic.topic);
      setVideos([]);

      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${apiUrl}/api/lectures/${encodeURIComponent(
          topic.topic
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const data = await response.json();

      setVideos(data.videos || []);
    } catch (error) {
      console.error(
        "Lecture API Error:",
        error
      );

      setVideos([
        {
          title: `${topic.topic} Placement Preparation`,
          channel: "Placement Preparation",
          duration: "1h 30m",
          thumbnail:
            "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
          url:
            "https://www.youtube.com/",
          rating: 4.8,
        },
        {
          title: `${topic.topic} Interview Questions`,
          channel: "Technical Interview",
          duration: "1h 15m",
          thumbnail:
            "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
          url:
            "https://www.youtube.com/",
          rating: 4.7,
        },
      ]);
    } finally {
      setLoadingVideos(false);
    }
  };

  // =====================================================
  // CLOSE VIDEO MODAL
  // =====================================================

  const closeVideos = () => {
    setShowVideos(false);
    setVideos([]);
    setSelectedTopic("");
  };

  // =====================================================
  // DIFFICULTY
  // =====================================================

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Hard":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =====================================================
  // TOTAL PROGRESS
  // =====================================================

  const overallProgress =
    allTopics.length > 0
      ? Math.round(
          allTopics.reduce(
            (sum, item) =>
              sum + item.progress,
            0
          ) / allTopics.length
        )
      : 0;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="
      min-h-screen
      bg-slate-100
      dark:bg-slate-950
    ">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        bg-gradient-to-r
        from-blue-700
        via-indigo-700
        to-purple-700
        text-white
        py-10
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          ">

            <div>

              <div className="
                flex
                items-center
                gap-3
                mb-2
              ">

                <FiBriefcase
                  className="text-3xl"
                />

                <h1 className="
                  text-3xl
                  md:text-4xl
                  font-bold
                ">

                  Placement Preparation

                </h1>

              </div>

              <p className="
                text-blue-100
              ">

                Branch-wise technical,
                aptitude and interview preparation

              </p>

            </div>


            {/* Overall Progress */}

            <div className="
              bg-white/10
              backdrop-blur
              rounded-2xl
              p-5
              min-w-[230px]
            ">

              <div className="
                flex
                justify-between
                mb-2
              ">

                <span>
                  Overall Progress
                </span>

                <span className="font-bold">
                  {overallProgress}%
                </span>

              </div>

              <div className="
                h-3
                bg-white/20
                rounded-full
                overflow-hidden
              ">

                <div
                  className="
                    h-3
                    bg-white
                    rounded-full
                  "
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      <div className="
        max-w-7xl
        mx-auto
        p-6
      ">


        {/* =================================================
            BRANCH SELECTION
        ================================================= */}

        <div className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          shadow
          p-5
          mb-6
        ">

          <h2 className="
            text-lg
            font-bold
            text-gray-800
            dark:text-white
            mb-4
          ">

            Select Engineering Branch

          </h2>


          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            lg:grid-cols-8
            gap-3
          ">

            {Object.keys(placementData).map(
              (item) => (

                <button
                  key={item}
                  onClick={() => {
                    setBranch(item);
                    setCategory("All");
                    setSearch("");
                  }}
                  className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    p-4
                    rounded-xl
                    font-semibold
                    transition
                    ${
                      branch === item
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                    }
                  `}
                >

                  <span className="text-2xl">
                    {branchIcons[item]}
                  </span>

                  <span className="text-sm">
                    {item}
                  </span>

                </button>

              )
            )}

          </div>

        </div>


        {/* =================================================
            SEARCH + CATEGORY
        ================================================= */}

        <div className="
          bg-white
          dark:bg-slate-900
          rounded-xl
          shadow
          p-4
          mb-6
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-4
          ">

            {/* Search */}

            <div className="
              flex
              items-center
              gap-3
              border
              dark:border-slate-700
              rounded-lg
              px-4
              py-3
              flex-1
            ">

              <FiSearch
                className="
                  text-xl
                  text-gray-500
                "
              />

              <input
                type="text"
                placeholder="
                  Search placement topic...
                "
                className="
                  w-full
                  outline-none
                  bg-transparent
                  text-gray-800
                  dark:text-white
                "
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Category */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                border
                dark:border-slate-700
                rounded-lg
                px-4
                py-3
                bg-white
                dark:bg-slate-800
                text-gray-700
                dark:text-gray-300
                outline-none
                lg:w-72
              "
            >

              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>

        </div>


        {/* =================================================
            PREPARATION SECTIONS
        ================================================= */}

        {Object.entries(filteredData).map(
          ([section, topics]) => (

            <div
              key={section}
              className="
                bg-white
                dark:bg-slate-900
                rounded-2xl
                shadow
                mb-6
              "
            >

              {/* SECTION HEADER */}

              <div className="
                p-5
                border-b
                dark:border-slate-700
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  flex
                  items-center
                  gap-3
                  text-gray-800
                  dark:text-white
                ">

                  {section === "Common" ? (
                    <FiTarget />
                  ) : section === "Technical" ? (
                    <FiCode />
                  ) : (
                    <FiLayers />
                  )}

                  {section} Placement Preparation

                </h2>

              </div>


              {/* TOPICS */}

              <div className="p-5">

                <div className="
                  grid
                  md:grid-cols-2
                  xl:grid-cols-3
                  gap-5
                ">

                  {topics.map(
                    (topic, index) => (

                      <div
                        key={index}
                        className="
                          border
                          dark:border-slate-700
                          rounded-2xl
                          p-5
                          hover:shadow-lg
                          transition
                          dark:bg-slate-800
                        "
                      >

                        {/* TITLE */}

                        <div className="
                          flex
                          justify-between
                          gap-3
                        ">

                          <div>

                            <h3 className="
                              text-lg
                              font-bold
                              text-gray-800
                              dark:text-white
                            ">

                              {topic.topic}

                            </h3>

                            <p className="
                              text-sm
                              text-gray-500
                              mt-1
                            ">

                              {topic.category}

                            </p>

                          </div>


                          <span
                            className={`
                              h-fit
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              ${getDifficultyClass(
                                topic.difficulty
                              )}
                            `}
                          >

                            {topic.difficulty}

                          </span>

                        </div>


                        {/* LEVEL */}

                        <div className="
                          mt-4
                          flex
                          justify-between
                          text-sm
                        ">

                          <span className="
                            text-gray-500
                          ">

                            Level

                          </span>

                          <span className="
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          ">

                            {topic.level}

                          </span>

                        </div>


                        {/* QUESTIONS */}

                        <div className="
                          mt-2
                          flex
                          justify-between
                          text-sm
                        ">

                          <span className="
                            text-gray-500
                          ">

                            Practice Questions

                          </span>

                          <span className="
                            font-bold
                            text-blue-600
                          ">

                            {topic.questions}

                          </span>

                        </div>


                        {/* PROGRESS */}

                        <div className="mt-5">

                          <div className="
                            flex
                            justify-between
                            text-sm
                            mb-2
                          ">

                            <span className="
                              text-gray-500
                            ">

                              Preparation

                            </span>

                            <span className="
                              font-bold
                              text-gray-700
                              dark:text-gray-300
                            ">

                              {topic.progress}%

                            </span>

                          </div>


                          <div className="
                            h-3
                            bg-gray-200
                            dark:bg-slate-700
                            rounded-full
                            overflow-hidden
                          ">

                            <div
                              className="
                                h-3
                                bg-gradient-to-r
                                from-blue-500
                                to-indigo-600
                                rounded-full
                              "
                              style={{
                                width: `${topic.progress}%`,
                              }}
                            />

                          </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="
                          grid
                          grid-cols-2
                          gap-2
                          mt-5
                        ">

                          <button
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            <FiClipboard />

                            Practice

                          </button>


                          <button
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              bg-purple-600
                              hover:bg-purple-700
                              text-white
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            <FiFileText />

                            Questions

                          </button>


                          <button
                            onClick={() =>
                              fetchTopicVideos(
                                topic
                              )
                            }
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              bg-orange-600
                              hover:bg-orange-700
                              text-white
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            <FiVideo />

                            Videos

                          </button>


                          <button
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                            "
                          >

                            <FiCode />

                            Coding

                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          )
        )}


        {/* =================================================
            NO RESULT
        ================================================= */}

        {Object.keys(filteredData).length === 0 && (

          <div className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow
            p-12
            text-center
          ">

            <FiSearch
              className="
                mx-auto
                text-5xl
                text-gray-400
                mb-4
              "
            />

            <h3 className="
              text-xl
              font-bold
              text-gray-700
              dark:text-white
            ">

              No preparation topics found

            </h3>

            <p className="
              text-gray-500
              mt-2
            ">

              Try another topic or category.

            </p>

          </div>

        )}


        {/* =================================================
            PLACEMENT ROADMAP
        ================================================= */}

        <div className="
          bg-gradient-to-r
          from-indigo-600
          to-purple-700
          rounded-2xl
          shadow-xl
          p-6
          mt-8
          text-white
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-5
          ">

            Recommended Placement Roadmap

          </h2>


          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-5
            gap-4
          ">

            {[
              [
                "01",
                "Aptitude",
                "Quantitative + Reasoning",
              ],
              [
                "02",
                "Coding",
                "DSA + Problem Solving",
              ],
              [
                "03",
                "Core Subjects",
                "Branch-specific technical skills",
              ],
              [
                "04",
                "Projects",
                "GitHub + AI/FSD + Internship",
              ],
              [
                "05",
                "Interview",
                "Technical + HR + AI Mock Interview",
              ],
            ].map(
              ([number, title, description]) => (

                <div
                  key={number}
                  className="
                    bg-white/10
                    backdrop-blur
                    rounded-xl
                    p-4
                  "
                >

                  <div className="
                    text-3xl
                    font-bold
                    text-white/60
                  ">

                    {number}

                  </div>

                  <h3 className="
                    font-bold
                    text-lg
                    mt-2
                  ">

                    {title}

                  </h3>

                  <p className="
                    text-sm
                    text-indigo-100
                    mt-1
                  ">

                    {description}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          VIDEO MODAL
      ===================================================== */}

      {showVideos && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/60
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            bg-white
            dark:bg-slate-900
            rounded-2xl
            w-full
            max-w-7xl
            max-h-[90vh]
            overflow-hidden
            shadow-2xl
          ">

            {/* HEADER */}

            <div className="
              flex
              justify-between
              items-center
              p-5
              border-b
              dark:border-slate-700
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                  text-gray-800
                  dark:text-white
                ">

                  {selectedTopic}

                </h2>

                <p className="
                  text-gray-500
                  dark:text-gray-400
                ">

                  Placement Preparation Lectures

                </p>

              </div>


              <button
                onClick={closeVideos}
                className="
                  p-2
                  rounded-full
                  hover:bg-red-50
                  text-gray-500
                  hover:text-red-600
                "
              >

                <FiX size={25} />

              </button>

            </div>


            {/* BODY */}

            <div className="
              p-6
              overflow-y-auto
              max-h-[80vh]
            ">

              {loadingVideos ? (

                <div className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-20
                ">

                  <div className="
                    animate-spin
                    rounded-full
                    h-16
                    w-16
                    border-4
                    border-gray-200
                    border-t-blue-600
                  " />

                  <p className="
                    mt-4
                    text-gray-500
                  ">

                    Loading lectures...

                  </p>

                </div>

              ) : videos.length > 0 ? (

                <div className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                ">

                  {videos.map(
                    (video, index) => (

                      <div
                        key={index}
                        className="
                          border
                          dark:border-slate-700
                          rounded-xl
                          overflow-hidden
                          shadow
                          hover:shadow-lg
                          transition
                          dark:bg-slate-800
                        "
                      >

                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="
                            w-full
                            h-48
                            object-cover
                          "
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/640x360?text=Placement+Lecture";
                          }}
                        />


                        <div className="p-4">

                          <h3 className="
                            font-bold
                            text-lg
                            line-clamp-2
                            text-gray-800
                            dark:text-white
                          ">

                            {video.title}

                          </h3>


                          <p className="
                            text-gray-600
                            dark:text-gray-300
                            mt-2
                          ">

                            {video.channel}

                          </p>


                          <div className="
                            flex
                            justify-between
                            mt-3
                            text-sm
                            text-gray-500
                          ">

                            <span>
                              {video.duration}
                            </span>

                            <span>
                              ⭐ {video.rating}
                            </span>

                          </div>


                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              py-3
                              rounded-lg
                              mt-4
                            "
                          >

                            <FiVideo />

                            Watch Lecture

                          </a>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="
                  text-center
                  py-20
                ">

                  <FiVideo
                    className="
                      mx-auto
                      text-5xl
                      text-gray-400
                    "
                  />

                  <h3 className="
                    text-xl
                    font-semibold
                    text-gray-700
                    dark:text-white
                    mt-4
                  ">

                    No lectures available

                  </h3>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default PlacementPreparation;

