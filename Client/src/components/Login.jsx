import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/ABES_LOGO.jpeg";
import {
  FiUser,
  FiLock,
  FiLogIn,
  FiShield,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.userId || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${API}/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "teacher") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">

          <div className="flex items-center gap-3 mb-6">
            <img
              src={logo}
              className="w-14 h-14 bg-white rounded-lg p-1"
            />
            <h1 className="text-xl font-bold">
              ABES Engineering College
            </h1>
          </div>

          <h2 className="text-3xl font-bold leading-snug">
            Smart Placement Prepration Portal
          </h2>

          <p className="mt-4 text-blue-100 text-sm">
            Secure role-based access for Students, Teachers & Admins with
            modern online placement system.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-3 text-sm text-blue-100">

            <div className="flex items-center gap-2">
              <FiShield />
              Secure JWT Authentication
            </div>

            <div className="flex items-center gap-2">
              <FiBookOpen />
              Online Exam Management
            </div>

            <div className="flex items-center gap-2">
              <FiCheckCircle />
              Instant Result Evaluation
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">

        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <FiUser className="text-blue-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Sign in to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* User ID */}
          <div className="mb-4 relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="User ID"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Forgot */}
          <div className="text-right mb-5">
            <Link
              to="/forgot"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            <FiLogIn />
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Don’t have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;