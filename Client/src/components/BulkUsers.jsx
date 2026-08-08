import React, { useState } from "react";
import axios from "axios";
import {
  FaFileCsv,
  FaUpload,
  FaCloudUploadAlt,
  FaDownload,
} from "react-icons/fa";

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const BulkUsers = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setMessage("");
    setError("");

    if (!file) {
      return setError("Please select a CSV file.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/user/bulk-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage(
        res.data.message ||
          "Users uploaded successfully."
      );

      setFile(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const csvContent =
      "name,email,mobile,role\nJohn Doe,john@example.com,9876543210,student\nJane Smith,jane@example.com,9876543211,teacher";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "sample_users.csv";

    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Bulk User Upload
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Upload multiple students, teachers, or admins using a CSV file.
          </p>
        </div>

        {/* Alerts */}
        <div className="px-6 pt-6">
          {message && (
            <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="p-6">

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-blue-500 transition">

            <FaCloudUploadAlt
              className="mx-auto text-slate-400 mb-4"
              size={60}
            />

            <h3 className="text-lg font-semibold mb-2">
              Upload CSV File
            </h3>

            <p className="text-sm text-slate-500 mb-5">
              Select a CSV file containing user records.
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="hidden"
              id="csvUpload"
            />

            <label
              htmlFor="csvUpload"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition"
            >
              <FaFileCsv />
              Choose CSV File
            </label>

            {file && (
              <div className="mt-5 p-4 bg-slate-50 rounded-xl border">
                <p className="font-medium">
                  Selected File
                </p>

                <p className="text-sm text-slate-600">
                  {file.name}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">

            <button
              onClick={handleUpload}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition"
            >
              <FaUpload />

              {loading
                ? "Uploading..."
                : "Upload Users"}
            </button>

            <button
              onClick={downloadSample}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:bg-slate-50 rounded-xl transition"
            >
              <FaDownload />
              Download Sample CSV
            </button>

          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-6">

          <h3 className="font-semibold mb-3">
            CSV Format
          </h3>

          <div className="bg-slate-50 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-slate-700">
{`name,email,mobile,role
Amit Sharma,amit@abes.ac.in,9876543210,student
Ashish Bajpai,Ashish@abes.ac.in,9876543211,teacher`}
            </pre>
          </div>

          <ul className="mt-4 text-sm text-slate-600 space-y-2">
            <li>• First row must contain column headers.</li>
            <li>• Supported roles: student, teacher, admin.</li>
            <li>• Email addresses must be unique.</li>
            <li>• Mobile number is optional.</li>
            <li>• Passwords can be auto-generated by the backend.</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default BulkUsers;