import React from "react";
import {
  FiCalendar,
  FiBookOpen,
  FiClipboard,
  FiCheckCircle,
  FiDownload,
} from "react-icons/fi";

const ExamInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold">
            JEE Main 2027 & NEET 2027 Information Portal
          </h1>
          <p className="mt-3 text-lg text-blue-100">
            Complete Examination Details, Syllabus & Paper Pattern
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Exam Dates */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FiCalendar />
            Important Dates
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-blue-600 text-xl">
                JEE Main 2027
              </h3>

              <ul className="mt-3 space-y-2">
                <li>Application Start: October 2026</li>
                <li>Session 1 Exam: January 2027</li>
                <li>Session 2 Exam: April 2027</li>
                <li>Result Declaration: April 2027</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-green-600 text-xl">
                NEET UG 2027
              </h3>

              <ul className="mt-3 space-y-2">
                <li>Application Start: February 2027</li>
                <li>Exam Date: May 2027</li>
                <li>Answer Key: June 2027</li>
                <li>Result: June 2027</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Syllabus */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FiBookOpen />
            Latest Syllabus
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-lg p-5">
              <h3 className="font-bold text-blue-600 text-xl mb-3">
                JEE Main Syllabus
              </h3>

              <ul className="space-y-2">
                <li>Physics - Class 11 & 12 NCERT</li>
                <li>Chemistry - Physical, Organic, Inorganic</li>
                <li>Mathematics - Algebra, Calculus, Coordinate Geometry</li>
              </ul>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Download PDF
              </button>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-bold text-green-600 text-xl mb-3">
                NEET Syllabus
              </h3>

              <ul className="space-y-2">
                <li>Physics - Class 11 & 12</li>
                <li>Chemistry - Class 11 & 12</li>
                <li>Biology - Botany & Zoology</li>
              </ul>

              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                Download PDF
              </button>
            </div>

          </div>
        </div>

        {/* Paper Pattern */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FiClipboard />
            Paper Pattern
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-lg p-5">
              <h3 className="font-bold text-blue-600 text-xl mb-3">
                JEE Main Pattern
              </h3>

              <ul className="space-y-2">
                <li>Total Questions: 90</li>
                <li>Attempt: 75 Questions</li>
                <li>Duration: 3 Hours</li>
                <li>Marking: +4 / -1</li>
              </ul>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-bold text-green-600 text-xl mb-3">
                NEET Pattern
              </h3>

              <ul className="space-y-2">
                <li>Total Questions: 180</li>
                <li>Duration: 3 Hours 20 Minutes</li>
                <li>Marks: 720</li>
                <li>Marking: +4 / -1</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Eligibility */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Eligibility Criteria
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 mt-1" />
              <p>Candidate must have passed Class 12 or equivalent.</p>
            </div>

            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 mt-1" />
              <p>Physics and Mathematics mandatory for JEE.</p>
            </div>

            <div className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 mt-1" />
              <p>Physics, Chemistry and Biology mandatory for NEET.</p>
            </div>
          </div>
        </div>

        {/* Previous Papers */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Previous Year Question Papers
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[2026, 2025, 2024, 2023].map((year) => (
              <button
                key={year}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700"
              >
                <FiDownload />
                {year} Paper
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamInfoPage;