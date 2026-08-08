import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiSmartphone,
  FiUserPlus,
  FiArrowLeft,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Send Email OTP
  const handleSendOtp = async () => {
    if (!form.email) {
      setMessageType("error");
      return setMessage("Please enter your email address");
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(`${API}/auth/send-email-otp`, {
        email: form.email,
      });

      setOtpSent(true);
      setMessageType("success");
      setMessage("OTP sent successfully to your email");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify Email OTP
  const handleVerifyOtp = async () => {
    if (!form.otp) {
      setMessageType("error");
      return setMessage("Please enter OTP");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/verify-email-otp`, {
        email: form.email,
        otp: form.otp,
      });

      if (res.data.success) {
        setOtpVerified(true);
        setMessageType("success");
        setMessage("Email verified successfully");
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // Register User
  const handleRegister = async () => {
    if (!form.name || !form.mobile || !form.email) {
      setMessageType("error");
      return setMessage("All fields are required");
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setMessageType("error");
      return setMessage("Enter a valid 10-digit mobile number");
    }

    if (!otpVerified) {
      setMessageType("error");
      return setMessage("Please verify your email first");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/register`, {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
      });

      setMessageType("success");
      setMessage(
        res.data.message || "Registration successful!"
      );

      setForm({
        name: "",
        mobile: "",
        email: "",
        otp: "",
      });

      setOtpSent(false);
      setOtpVerified(false);
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <FiUserPlus className="text-green-600 text-4xl" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Register for Smart Exam Portal
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <div
            className={`mb-5 p-3 rounded-xl text-sm text-center font-medium ${
              messageType === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Full Name */}
        <div className="relative mb-4">
          <FiUser className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        {/* Mobile Number */}
        <div className="relative mb-4">
          <FiSmartphone className="absolute left-4 top-4 text-gray-400" />

          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            maxLength={10}
            placeholder="Mobile Number"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>

        {/* Email + Send OTP */}
        <div className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FiMail className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                disabled={otpVerified}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || otpVerified}
              className="px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <FiSend />
              {otpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
        </div>

        {/* OTP Verification */}
        {otpSent && !otpVerified && (
          <div className="mb-5">
            <div className="flex gap-2">
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter Email OTP"
                maxLength={6}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {/* Verified Status */}
        {otpVerified && (
          <div className="mb-5 flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl">
            <FiCheckCircle />
            Email Verified Successfully
          </div>
        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={!otpVerified || loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiUserPlus />
          {loading ? "Please Wait..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Back */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            <FiArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;