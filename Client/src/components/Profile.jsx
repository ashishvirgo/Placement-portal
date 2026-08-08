import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API;

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  const [originalProfile, setOriginalProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");
  const userData =localStorage.getItem("user");
   console.log("UserData=",userData)
        if (!userData) {
          setError(
            "User not found. Please login again."
          );
          return;
        }

        const user =JSON.parse(userData);

        if (!user?.id) {
          setError(
            "Invalid user data"
          );
          return;
        }

        console.log(
          "User ID =",
          user.userId
        );
  // 🔹 Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`${API}/user/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("res=",res.data)
        setProfile(res.data.user);
        setOriginalProfile(res.data);
      } catch (err) {
        setError(true);
        setMessage("Failed to load profile");
      } finally {
        setFetching(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(`${API}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOriginalProfile(profile);
      setIsEditing(false);
      setError(false);
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(true);
      setMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setMessage("");
    setError(false);
  };

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-3"></div>
        <div className="h-10 bg-gray-200 rounded mb-3"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-sm opacity-80">
            Manage your personal information
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mx-6 mt-4 p-3 rounded-lg text-sm font-medium ${
              error
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <div className="p-6 space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="mt-1 w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="text-sm text-gray-600">Branch</label>
            <select
              name="branch"
              value={profile.branch}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
            >
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="px-6 pb-6 flex justify-end gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;