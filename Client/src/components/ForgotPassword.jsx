import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // const handleReset = async () => {
  //   if (!email) return setMessage("Email is required");

  //   try {
  //     setLoading(true);
  //     setMessage("");

  //     // 🔗 Replace with your API
  //     // await axios.post(`${API}/auth/forgot-password`, { email });

  //     setTimeout(() => {
  //       setMessage("Password reset link sent to your email");
  //       setLoading(false);
  //     }, 1200);
  //   } catch (err) {
  //     setMessage("Something went wrong");
  //     setLoading(false);
  //   }
  // 

const API =
  import.meta.env.VITE_BACKEND_API ||
  "http://localhost:5002/api";

const handleReset = async () => {
  if (!email.trim()) {
    return setMessage("Please enter your email");
  }

  try {
    setLoading(true);
    setMessage("");

    const res = await axios.post(
      `${API}/auth/forgot-password`,
      { email }
    );
   console.log("res.data",res)
    setMessage(
      res.data.message ||
        "Password reset link sent to your email"
    );
  } catch (err) {
    setMessage(
      err.response?.data?.message ||
        "Failed to send reset link"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <FiMail className="text-blue-600 text-4xl" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password?
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive reset link
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-blue-50 text-blue-700 text-sm p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {/* Input */}
        <div className="relative mb-4">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          <FiSend />
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Back */}
        <div className="text-center mt-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;