
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api";

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH SUBJECTS =================
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/subjects`);
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?"))
      return;

    try {
      await axios.delete(`${API}/${id}`);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting subject");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            All Subjects
          </h2>

          <button
            onClick={fetchSubjects}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : subjects.length === 0 ? (
          <p className="text-gray-500 text-center">
            No subjects found
          </p>
        ) : (
          <div className="space-y-3">
            {subjects.map((sub) => (
              <div
                key={sub._id}
                className="flex justify-between items-center border p-3 rounded-lg hover:shadow-sm transition"
              >
                <span className="text-gray-700 font-medium">
                  {sub.name}
                </span>

                <button
                  onClick={() => handleDelete(sub._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewSubjects;

