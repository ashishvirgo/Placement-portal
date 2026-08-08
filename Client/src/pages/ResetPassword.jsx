import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const API =
  import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setSuccess(false);
      return setMessage("Please fill all fields.");
    }

    if (newPassword.length < 8) {
      setSuccess(false);
      return setMessage(
        "Password must be at least 8 characters long."
      );
    }

    if (newPassword !== confirmPassword) {
      setSuccess(false);
      return setMessage("Passwords do not match.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${API}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      setSuccess(true);
      setMessage(
        res.data.message || "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
              <FiLock className="text-white text-3xl" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Reset Password
            </h1>

            <p className="text-blue-100 mt-2 text-sm">
              Create a new secure password for your account
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-slate-400" />

                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-3 text-slate-500"
                  >
                    {showNew ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-slate-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-3 top-3 text-slate-500"
                  >
                    {showConfirm ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                    success
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {success ? (
                    <FiCheckCircle />
                  ) : (
                    <FiAlertCircle />
                  )}
                  {message}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-60"
              >
                {loading
                  ? "Updating Password..."
                  : "Reset Password"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-5">
          Secure password reset powered by Examination System
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;