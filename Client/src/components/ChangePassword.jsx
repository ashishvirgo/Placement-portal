import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordStrength = () => {
    const pass = form.newPassword;
    if (pass.length < 6) return "Weak";
    if (pass.length < 10) return "Medium";
    return "Strong";
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <FaLock className="text-2xl text-blue-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Change Password
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Keep your account secure by updating your password regularly.
          </p>

          {/* Current Password */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Password
            </label>

            <div className="relative">
              <input
                type={show.current ? "text" : "password"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() =>
                  setShow({
                    ...show,
                    current: !show.current,
                  })
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    newPassword: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() =>
                  setShow({
                    ...show,
                    new: !show.new,
                  })
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {form.newPassword && (
              <div className="mt-2">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full ${
                      passwordStrength() === "Weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength() === "Medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                    }`}
                  />
                </div>

                <p className="text-xs mt-1 text-gray-500">
                  Strength: {passwordStrength()}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() =>
                  setShow({
                    ...show,
                    confirm: !show.confirm,
                  })
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;