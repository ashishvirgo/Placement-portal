
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api/subjects";

const AddSubject = () => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH SUBJECTS =================
  const fetchSubjects = async () => {
    try {
      const res = await axios.get(API);
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // ================= ADD SUBJECT =================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);
      await axios.post(`${API}/add`, { name });

      setName("");
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE SUBJECT =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Error deleting subject");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Subjects
        </h2>

        {/* ADD SUBJECT */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter subject name..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {/* SUBJECT LIST */}
        <div className="space-y-3">
          {subjects.length === 0 && (
            <p className="text-gray-500 text-center">
              No subjects added yet
            </p>
          )}

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
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddSubject;
