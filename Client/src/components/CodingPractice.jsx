
import React, { useMemo, useState } from "react";
import {
  FiCode,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiTrendingUp,
  FiChevronRight,
  FiFilter,
  FiPlay,
  FiBookOpen,
  FiTarget,
  FiX,
} from "react-icons/fi";

const CodingPractice = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] =
    useState("All");

  const [topic, setTopic] = useState("All");

  const [status, setStatus] =
    useState("All");

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [code, setCode] = useState("");

  // =========================================================
  // DEMO CODING QUESTIONS
  // Replace with API data later
  // =========================================================

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Arrays",
      platform: "Placement",
      solved: true,
      score: 100,
      acceptance: "52%",
      companies: [
        "Amazon",
        "Microsoft",
        "Google",
      ],
      timeLimit: "30 min",
      points: 10,
      description:
        "Given an array of integers and a target value, return the indices of two numbers that add up to the target.",
    },

    {
      id: 2,
      title: "Reverse a Linked List",
      difficulty: "Easy",
      topic: "Linked List",
      platform: "Placement",
      solved: true,
      score: 90,
      acceptance: "71%",
      companies: [
        "Amazon",
        "Microsoft",
      ],
      timeLimit: "30 min",
      points: 10,
      description:
        "Reverse a singly linked list and return the new head of the list.",
    },

    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topic: "Strings",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "36%",
      companies: [
        "Amazon",
        "Google",
        "Adobe",
      ],
      timeLimit: "45 min",
      points: 20,
      description:
        "Find the length of the longest substring without repeating characters.",
    },

    {
      id: 4,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      topic: "Trees",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "62%",
      companies: [
        "Microsoft",
        "Amazon",
      ],
      timeLimit: "45 min",
      points: 20,
      description:
        "Given the root of a binary tree, return its level order traversal.",
    },

    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "Easy",
      topic: "Stack",
      platform: "Placement",
      solved: true,
      score: 95,
      acceptance: "40%",
      companies: [
        "Amazon",
        "TCS",
        "Infosys",
      ],
      timeLimit: "25 min",
      points: 10,
      description:
        "Determine whether a string containing brackets is valid and properly nested.",
    },

    {
      id: 6,
      title: "Maximum Subarray",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "49%",
      companies: [
        "Amazon",
        "Google",
        "Microsoft",
      ],
      timeLimit: "45 min",
      points: 20,
      description:
        "Find the contiguous subarray with the largest sum.",
    },

    {
      id: 7,
      title: "Merge Two Sorted Arrays",
      difficulty: "Easy",
      topic: "Arrays",
      platform: "Placement",
      solved: false,
      score: 0,
      acceptance: "68%",
      companies: [
        "Infosys",
        "Wipro",
        "Accenture",
      ],
      timeLimit: "30 min",
      points: 10,
      description:
        "Merge two sorted arrays into a single sorted array.",
    },

    {
      id: 8,
      title: "Detect Cycle in Linked List",
      difficulty: "Medium",
      topic: "Linked List",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "55%",
      companies: [
        "Amazon",
        "Microsoft",
        "Flipkart",
      ],
      timeLimit: "40 min",
      points: 20,
      description:
        "Determine whether a linked list contains a cycle.",
    },

    {
      id: 9,
      title: "Number of Islands",
      difficulty: "Hard",
      topic: "Graphs",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "48%",
      companies: [
        "Google",
        "Amazon",
        "Microsoft",
      ],
      timeLimit: "60 min",
      points: 30,
      description:
        "Given a 2D grid of land and water, count the number of islands.",
    },

    {
      id: 10,
      title: "LRU Cache",
      difficulty: "Hard",
      topic: "Design",
      platform: "Interview",
      solved: false,
      score: 0,
      acceptance: "39%",
      companies: [
        "Amazon",
        "Google",
        "Microsoft",
      ],
      timeLimit: "60 min",
      points: 30,
      description:
        "Design a data structure implementing a Least Recently Used cache.",
    },
  ];

  // =========================================================
  // FILTER DATA
  // =========================================================

  const topics = [
    "All",
    ...new Set(
      problems.map(
        (problem) => problem.topic
      )
    ),
  ];

  // =========================================================
  // FILTERED PROBLEMS
  // =========================================================

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const searchMatch =
        problem.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const difficultyMatch =
        difficulty === "All" ||
        problem.difficulty === difficulty;

      const topicMatch =
        topic === "All" ||
        problem.topic === topic;

      const statusMatch =
        status === "All" ||
        (status === "Solved" &&
          problem.solved) ||
        (status === "Unsolved" &&
          !problem.solved);

      return (
        searchMatch &&
        difficultyMatch &&
        topicMatch &&
        statusMatch
      );
    });
  }, [
    search,
    difficulty,
    topic,
    status,
  ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalProblems = problems.length;

  const solvedProblems = problems.filter(
    (problem) => problem.solved
  ).length;

  const easyProblems = problems.filter(
    (problem) =>
      problem.difficulty === "Easy"
  ).length;

  const mediumProblems = problems.filter(
    (problem) =>
      problem.difficulty === "Medium"
  ).length;

  const hardProblems = problems.filter(
    (problem) =>
      problem.difficulty === "Hard"
  ).length;

  const totalPoints = problems
    .filter((problem) => problem.solved)
    .reduce(
      (total, problem) =>
        total + problem.score,
      0
    );

  const progress = Math.round(
    (solvedProblems / totalProblems) *
      100
  );

  // =========================================================
  // OPEN PROBLEM
  // =========================================================

  const openProblem = (problem) => {
    setSelectedProblem(problem);

    setCode(
      `// Write your solution here\n\nfunction solution() {\n    \n}`
    );
  };

  // =========================================================
  // CLOSE PROBLEM
  // =========================================================

  const closeProblem = () => {
    setSelectedProblem(null);
    setCode("");
  };

  // =========================================================
  // RUN CODE
  // =========================================================

  const runCode = () => {
    alert(
      "Connect this button to your Judge0 / Piston / coding execution API."
    );
  };

  // =========================================================
  // SUBMIT CODE
  // =========================================================

  const submitCode = () => {
    alert(
      "Connect this button to your coding submission API."
    );
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          bg-gradient-to-r
          from-blue-700
          via-indigo-700
          to-purple-700
          rounded-3xl
          p-7
          md:p-9
          text-white
          shadow-xl
        "
      >

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          "
        >

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-white/20
                  flex
                  items-center
                  justify-center
                "
              >
                <FiCode size={25} />
              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  Coding Practice
                </h1>

                <p className="text-blue-100 text-sm">
                  Improve your DSA and coding
                  skills for placements
                </p>

              </div>

            </div>

          </div>

          <div
            className="
              bg-white/10
              backdrop-blur-md
              border
              border-white/20
              rounded-2xl
              px-5
              py-4
            "
          >

            <p className="text-xs text-blue-100">
              Coding Progress
            </p>

            <div className="flex items-end gap-2">

              <span className="text-3xl font-bold">
                {progress}%
              </span>

              <span className="text-sm text-blue-100 mb-1">
                completed
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-4
        "
      >

        <StatCard
          title="Problems"
          value={totalProblems}
          icon={<FiCode />}
          color="blue"
        />

        <StatCard
          title="Solved"
          value={solvedProblems}
          icon={<FiCheckCircle />}
          color="green"
        />

        <StatCard
          title="Easy"
          value={easyProblems}
          icon={<FiTarget />}
          color="green"
        />

        <StatCard
          title="Medium"
          value={mediumProblems}
          icon={<FiTrendingUp />}
          color="orange"
        />

        <StatCard
          title="Hard"
          value={hardProblems}
          icon={<FiAward />}
          color="red"
        />

        <StatCard
          title="Points"
          value={totalPoints}
          icon={<FiAward />}
          color="purple"
        />

      </div>

      {/* =====================================================
          PROGRESS CARD
      ====================================================== */}

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

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >

          <div>

            <h2 className="text-xl font-bold">
              Your Coding Journey
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Keep solving problems to improve
              your placement readiness.
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              {solvedProblems} /{" "}
              {totalProblems} solved
            </p>

          </div>

        </div>

        <div className="mt-5">

          <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

            <div
              className="
                h-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                rounded-full
                transition-all
              "
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          SEARCH AND FILTER
      ====================================================== */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          p-5
          shadow-lg
          border
          border-gray-100
          dark:border-slate-700
        "
      >

        <div className="flex items-center gap-2 mb-4">

          <FiFilter className="text-blue-600" />

          <h2 className="font-bold">
            Find Problems
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          {/* Search */}

          <div className="relative">

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
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search problem..."
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

          {/* Difficulty */}

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
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
              focus:ring-2
              focus:ring-blue-500
            "
          >

            <option value="All">
              All Difficulties
            </option>

            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>

          {/* Topic */}

          <select
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
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
              focus:ring-2
              focus:ring-blue-500
            "
          >

            {topics.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "All"
                  ? "All Topics"
                  : item}
              </option>
            ))}

          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
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
              focus:ring-2
              focus:ring-blue-500
            "
          >

            <option value="All">
              All Problems
            </option>

            <option value="Solved">
              Solved
            </option>

            <option value="Unsolved">
              Unsolved
            </option>

          </select>

        </div>

      </div>

      {/* =====================================================
          PROBLEM LIST
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
          overflow-hidden
        "
      >

        <div
          className="
            p-5
            border-b
            border-gray-100
            dark:border-slate-700
            flex
            justify-between
            items-center
          "
        >

          <div>

            <h2 className="text-xl font-bold">
              Coding Problems
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredProblems.length} problems
              found
            </p>

          </div>

          <FiBookOpen
            className="text-blue-600"
            size={24}
          />

        </div>

        <div className="divide-y dark:divide-slate-700">

          {filteredProblems.length ===
          0 ? (
            <div className="p-12 text-center">

              <FiCode
                size={45}
                className="
                  mx-auto
                  text-gray-300
                "
              />

              <h3 className="text-xl font-bold mt-4">
                No problems found
              </h3>

              <p className="text-gray-500 mt-2">
                Try changing your search or
                filters.
              </p>

            </div>
          ) : (
            filteredProblems.map(
              (problem) => (
                <div
                  key={problem.id}
                  className="
                    p-5
                    hover:bg-gray-50
                    dark:hover:bg-slate-800
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

                    {/* Problem */}

                    <div className="flex-1">

                      <div className="flex items-start gap-3">

                        <div
                          className={`
                            w-11
                            h-11
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                            ${
                              problem.solved
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                            }
                          `}
                        >

                          {problem.solved ? (
                            <FiCheckCircle />
                          ) : (
                            <FiCode />
                          )}

                        </div>

                        <div>

                          <h3 className="font-bold text-lg">
                            {problem.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {problem.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">

                            <Badge
                              text={
                                problem.difficulty
                              }
                              type={
                                problem.difficulty
                              }
                            />

                            <Badge
                              text={
                                problem.topic
                              }
                              type="topic"
                            />

                            <Badge
                              text={
                                problem.platform
                              }
                              type="platform"
                            />

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* Companies */}

                    <div className="lg:w-48">

                      <p className="text-xs text-gray-500 mb-2">
                        Asked By
                      </p>

                      <div className="flex flex-wrap gap-1">

                        {problem.companies
                          .slice(0, 3)
                          .map(
                            (company) => (
                              <span
                                key={company}
                                className="
                                  px-2
                                  py-1
                                  rounded-md
                                  bg-gray-100
                                  dark:bg-slate-700
                                  text-xs
                                  font-medium
                                "
                              >
                                {company}
                              </span>
                            )
                          )}

                      </div>

                    </div>

                    {/* Stats */}

                    <div className="lg:w-28">

                      <p className="text-xs text-gray-500">
                        Acceptance
                      </p>

                      <p className="font-bold mt-1">
                        {problem.acceptance}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {problem.timeLimit}
                      </p>

                    </div>

                    {/* Action */}

                    <div>

                      <button
                        onClick={() =>
                          openProblem(
                            problem
                          )
                        }
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
                          transition
                        "
                      >

                        {problem.solved
                          ? "Practice Again"
                          : "Solve"}

                        <FiChevronRight />

                      </button>

                    </div>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>

      {/* =====================================================
          CODING EDITOR MODAL
      ====================================================== */}

      {selectedProblem && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
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
              rounded-2xl
              w-full
              max-w-7xl
              h-[90vh]
              overflow-hidden
              shadow-2xl
              flex
              flex-col
            "
          >

            {/* Editor Header */}

            <div
              className="
                px-5
                py-4
                border-b
                dark:border-slate-700
                flex
                justify-between
                items-center
              "
            >

              <div>

                <h2 className="text-xl font-bold">
                  {selectedProblem.title}
                </h2>

                <div className="flex gap-2 mt-1">

                  <Badge
                    text={
                      selectedProblem.difficulty
                    }
                    type={
                      selectedProblem.difficulty
                    }
                  />

                  <Badge
                    text={
                      selectedProblem.topic
                    }
                    type="topic"
                  />

                </div>

              </div>

              <button
                onClick={closeProblem}
                className="
                  w-10
                  h-10
                  rounded-lg
                  hover:bg-gray-100
                  dark:hover:bg-slate-800
                  flex
                  items-center
                  justify-center
                "
              >
                <FiX size={22} />
              </button>

            </div>

            {/* Editor Body */}

            <div
              className="
                flex
                flex-col
                lg:flex-row
                flex-1
                min-h-0
              "
            >

              {/* Question */}

              <div
                className="
                  lg:w-2/5
                  p-6
                  overflow-y-auto
                  border-r
                  dark:border-slate-700
                "
              >

                <h3 className="text-lg font-bold mb-3">
                  Problem Statement
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {
                    selectedProblem.description
                  }
                </p>

                <div className="mt-6 space-y-4">

                  <InfoRow
                    label="Difficulty"
                    value={
                      selectedProblem.difficulty
                    }
                  />

                  <InfoRow
                    label="Topic"
                    value={
                      selectedProblem.topic
                    }
                  />

                  <InfoRow
                    label="Time Limit"
                    value={
                      selectedProblem.timeLimit
                    }
                  />

                  <InfoRow
                    label="Points"
                    value={
                      selectedProblem.points
                    }
                  />

                  <InfoRow
                    label="Acceptance"
                    value={
                      selectedProblem.acceptance
                    }
                  />

                </div>

                <div className="mt-7">

                  <h3 className="font-bold mb-3">
                    Companies
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {selectedProblem.companies.map(
                      (company) => (
                        <span
                          key={company}
                          className="
                            px-3
                            py-1.5
                            rounded-lg
                            bg-blue-50
                            text-blue-700
                            text-sm
                          "
                        >
                          {company}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* Code Editor */}

              <div
                className="
                  lg:w-3/5
                  flex
                  flex-col
                  bg-slate-950
                "
              >

                <div
                  className="
                    px-4
                    py-3
                    bg-slate-900
                    text-white
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div className="flex items-center gap-2">

                    <FiCode />

                    <span className="text-sm font-medium">
                      Code Editor
                    </span>

                  </div>

                  <select
                    className="
                      bg-slate-800
                      text-white
                      rounded-lg
                      px-3
                      py-1.5
                      text-sm
                      outline-none
                    "
                  >

                    <option>
                      Java
                    </option>

                    <option>
                      C++
                    </option>

                    <option>
                      Python
                    </option>

                    <option>
                      JavaScript
                    </option>

                  </select>

                </div>

                <textarea
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  spellCheck="false"
                  className="
                    flex-1
                    resize-none
                    bg-slate-950
                    text-green-400
                    p-5
                    outline-none
                    font-mono
                    text-sm
                    leading-6
                  "
                />

                {/* Editor Footer */}

                <div
                  className="
                    p-4
                    bg-slate-900
                    flex
                    justify-end
                    gap-3
                  "
                >

                  <button
                    onClick={runCode}
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-slate-700
                      hover:bg-slate-600
                      text-white
                    "
                  >

                    <FiPlay />

                    Run Code

                  </button>

                  <button
                    onClick={submitCode}
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      font-semibold
                    "
                  >

                    <FiCheckCircle />

                    Submit

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
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
    blue:
      "bg-blue-100 text-blue-600",
    green:
      "bg-green-100 text-green-600",
    orange:
      "bg-orange-100 text-orange-600",
    red:
      "bg-red-100 text-red-600",
    purple:
      "bg-purple-100 text-purple-600",
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

      <div className="flex justify-between items-center">

        <div>

          <p className="text-xs text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-bold mt-1">
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
// BADGE
// =============================================================

const Badge = ({
  text,
  type,
}) => {

  let classes =
    "bg-gray-100 text-gray-700";

  if (type === "Easy") {
    classes =
      "bg-green-100 text-green-700";
  }

  if (type === "Medium") {
    classes =
      "bg-orange-100 text-orange-700";
  }

  if (type === "Hard") {
    classes =
      "bg-red-100 text-red-700";
  }

  if (type === "topic") {
    classes =
      "bg-blue-100 text-blue-700";
  }

  if (type === "platform") {
    classes =
      "bg-purple-100 text-purple-700";
  }

  return (
    <span
      className={`
        inline-flex
        px-2.5
        py-1
        rounded-full
        text-xs
        font-semibold
        ${classes}
      `}
    >
      {text}
    </span>
  );
};

// =============================================================
// INFO ROW
// =============================================================

const InfoRow = ({
  label,
  value,
}) => {
  return (
    <div
      className="
        flex
        justify-between
        border-b
        border-gray-100
        dark:border-slate-700
        pb-3
      "
    >

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-semibold">
        {value}
      </span>

    </div>
  );
};

export default CodingPractice;

