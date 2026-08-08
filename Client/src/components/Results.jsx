import React, { useEffect, useState } from "react";
import axios from "axios";

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const Results = () => {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${API}/result/results`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data);

    } catch (err) {
      console.error(err);

      setError("Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        My Quiz Results
      </h1>

      {results.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No quiz attempts found.
        </div>
      ) : (
        <div className="grid gap-4">

          {results.map((result) => (
            <div
              key={result._id}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold">
                    {result.quiz?.title}
                  </h2>

                  <p className="text-gray-500">
                    Attempted:
                    {" "}
                    {new Date(
                      result.submittedAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {result.score}/
                    {result.total}
                  </p>

                  <p className="text-green-600 font-semibold">
                    {result.percentage}%
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Results;