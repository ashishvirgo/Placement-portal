import React, { useState } from "react";
import {
  FiSearch,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";

const syllabusData = {
  jee: {
    Physics: [
      {
        chapter: "Kinematics",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "6%",
        pyqs: 145,
        difficulty: "Medium",
        progress: 15,
      },
      {
        chapter: "Current Electricity",
        class: "Class 12",
        boards: ["CBSE", "ICSE"],
        weightage: "8%",
        pyqs: 180,
        difficulty: "Hard",
        progress: 40,
      },
    ],
    Chemistry: [
      {
        chapter: "Chemical Bonding",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "7%",
        pyqs: 165,
        difficulty: "Medium",
        progress: 60,
      },
    ],
    Mathematics: [
      {
        chapter: "Integration",
        class: "Class 12",
        boards: ["CBSE", "ICSE"],
        weightage: "10%",
        pyqs: 220,
        difficulty: "Hard",
        progress: 35,
      },
    ],
  },

  advanced: {
    Physics: [
      {
        chapter: "Rotational Mechanics",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "9%",
        pyqs: 210,
        difficulty: "Hard",
        progress: 20,
      },
    ],

    Chemistry: [
      {
        chapter: "Organic Reaction Mechanism",
        class: "Class 12",
        boards: ["CBSE", "ICSE"],
        weightage: "8%",
        pyqs: 175,
        difficulty: "Hard",
        progress: 50,
      },
    ],

    Mathematics: [
      {
        chapter: "Vector Algebra",
        class: "Class 12",
        boards: ["CBSE", "ICSE"],
        weightage: "7%",
        pyqs: 150,
        difficulty: "Medium",
        progress: 65,
      },
    ],
  },

  neet: {
    Physics: [
      {
        chapter: "Work Energy Power",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "5%",
        pyqs: 130,
        difficulty: "Medium",
        progress: 80,
      },
    ],

    Chemistry: [
      {
        chapter: "Thermodynamics",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "6%",
        pyqs: 145,
        difficulty: "Medium",
        progress: 70,
      },
    ],

    Biology: [
      {
        chapter: "Genetics",
        class: "Class 12",
        boards: ["CBSE", "ICSE"],
        weightage: "12%",
        pyqs: 280,
        difficulty: "Medium",
        progress: 45,
      },
      {
        chapter: "Human Physiology",
        class: "Class 11",
        boards: ["CBSE", "ICSE"],
        weightage: "14%",
        pyqs: 320,
        difficulty: "Easy",
        progress: 90,
      },
    ],
  },
};

const ChapterWiseSyllabusViewer = () => {
  const [exam, setExam] = useState("jee");
  const [search, setSearch] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
const [videos, setVideos] = useState([]);
const [showVideos, setShowVideos] = useState(false);
const [loadingVideos, setLoadingVideos] = useState(false);
  const currentData = syllabusData[exam];
const fetchChapterVideos = async (chapter) => {
  try {
    setLoadingVideos(true);
    setShowVideos(true);
    setSelectedChapter(chapter.chapter);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/lectures/${encodeURIComponent(
        chapter.chapter
      )}`
    );

    const data = await response.json();

    setVideos(data.videos || []);
  } catch (error) {
    console.error(error);

    // Demo videos
    setVideos([
      {
        title: `${chapter.chapter} Complete Lecture`,
        channel: "Physics Wallah",
        duration: "2h 30m",
        thumbnail:
          "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
        url: "https://youtube.com",
        rating: 4.9,
      },
      {
        title: `${chapter.chapter} JEE Advanced Concepts`,
        channel: "Mohit Tyagi",
        duration: "1h 45m",
        thumbnail:
          "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
        url: "https://youtube.com",
        rating: 4.8,
      },
    ]);
  } finally {
    setLoadingVideos(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold">
            Chapter Wise Syllabus Viewer
          </h1>

          <p className="mt-2 text-blue-100">
            JEE Main • JEE Advanced • NEET
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setExam("jee")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              exam === "jee"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            JEE Main
          </button>

          <button
            onClick={() => setExam("advanced")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              exam === "advanced"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            JEE Advanced
          </button>

          <button
            onClick={() => setExam("neet")}
            className={`px-5 py-3 rounded-lg font-semibold ${
              exam === "neet"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            NEET
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-center gap-3">
            <FiSearch className="text-xl text-gray-500" />

            <input
              type="text"
              placeholder="Search chapter..."
              className="w-full outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {/* Subjects */}
        {Object.entries(currentData).map(
          ([subject, chapters]) => (
            <div
              key={subject}
              className="bg-white rounded-xl shadow mb-6"
            >
              <div className="p-5 border-b">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiBookOpen />
                  {subject}
                </h2>
              </div>

              <div className="p-5">
                {chapters
                  .filter((item) =>
                    item.chapter
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((chapter, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-5 mb-4 hover:shadow-md transition"
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                        <div>
                          <h3 className="text-xl font-bold">
                            {chapter.chapter}
                          </h3>

                          <div className="flex flex-wrap gap-2 mt-3">

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                              {chapter.class}
                            </span>

                            {chapter.boards.map(
                              (board, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 rounded-full text-sm ${
                                    board === "CBSE"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-purple-100 text-purple-700"
                                  }`}
                                >
                                  {board}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                          <div>
                            <p className="text-sm text-gray-500">
                              Weightage
                            </p>
                            <p className="font-bold text-orange-600">
                              {chapter.weightage}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              PYQs
                            </p>
                            <p className="font-bold">
                              {chapter.pyqs}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Difficulty
                            </p>
                            <p className="font-bold">
                              {chapter.difficulty}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Status
                            </p>
                            <p className="font-bold text-green-600">
                              Active
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Preparation Progress</span>
                          <span>
                            {chapter.progress}%
                          </span>
                        </div>

                        <div className="w-full h-3 bg-gray-200 rounded-full">
                          <div
                            className="h-3 bg-blue-600 rounded-full"
                            style={{
                              width: `${chapter.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          View Notes
                        </button>

                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                          Practice Test
                        </button>

                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                          PYQs
                        </button>

                        <button
  onClick={() => fetchChapterVideos(chapter)}
  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
>
  Video Lectures
</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )
        )}

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Quick Statistics
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <div className="border rounded-lg p-4 text-center">
              <h3 className="text-3xl font-bold text-blue-600">
                250+
              </h3>
              <p>Total Chapters</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <h3 className="text-3xl font-bold text-green-600">
                5000+
              </h3>
              <p>Previous Questions</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <h3 className="text-3xl font-bold text-purple-600">
                100+
              </h3>
              <p>Mock Tests</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <h3 className="text-3xl font-bold text-orange-600">
                1000+
              </h3>
              <p>Video Lectures</p>
            </div>

          </div>
        </div>
      </div>
      {showVideos && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedChapter}
          </h2>

          <p className="text-gray-500">
            Recommended Video Lectures
          </p>
        </div>

        <button
          onClick={() => setShowVideos(false)}
          className="text-red-600 text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-6 overflow-y-auto max-h-[80vh]">

        {loadingVideos ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : videos.length > 0 ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />

                <div className="p-4">

                  <h3 className="font-bold text-lg line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {video.channel}
                  </p>

                  <div className="flex justify-between mt-3 text-sm text-gray-500">
                    <span>{video.duration}</span>
                    <span>⭐ {video.rating}</span>
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-4"
                  >
                    ▶ Watch Lecture
                  </a>

                </div>
              </div>
            ))}

          </div>

        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold">
              No lectures available
            </h3>

            <p className="text-gray-500 mt-2">
              Try again later.
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ChapterWiseSyllabusViewer;