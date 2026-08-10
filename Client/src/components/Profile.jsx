
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_API;

const Profile = () => {
  // =========================================================
  // PROFILE STATE
  // =========================================================

  const [profile, setProfile] = useState({
    // Personal
    name: "",
    email: "",
    phone: "",

    // Academic - 10th
    tenthMarks: "",
    tenthBoard: "",
    tenthPassingYear: "",

    // Academic - 12th
    twelfthMarks: "",
    twelfthBoard: "",
    twelfthPassingYear: "",

    // Engineering
    branch: "CSE",
    rollNo: "",
    college: "",
    batch: "",
    cgpa: "",
    graduationYear: "",

    // Technical
    github: "",
    linkedin: "",
    leetcode: "",
    codechef: "",
    skills: "",

    // Internship
    internship: "",
    internshipMonths: "",
  });

  const [originalProfile, setOriginalProfile] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetching(true);
        setMessage("");
        setError(false);

        const userData = localStorage.getItem("user");

        if (!userData) {
          setError(true);
          setMessage(
            "User not found. Please login again."
          );
          return;
        }

        const user = JSON.parse(userData);

        if (!user?.userId) {
          setError(true);
          setMessage(
            "Invalid user information. Please login again."
          );
          return;
        }

        const response = await axios.get(
          `${API}/user/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Profile response:",
          response.data
        );

        const serverProfile =
          response?.data?.user || {};

        const updatedProfile = {
          ...profile,
          ...serverProfile,
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      } catch (err) {
        console.error(
          "Profile fetch error:",
          err
        );

        setError(true);

        setMessage(
          err?.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setFetching(false);
      }
    };

    if (!token) {
      setFetching(false);
      setError(true);
      setMessage(
        "Authentication token not found."
      );
      return;
    }

    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError(false);

      await axios.put(
        `${API}/profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOriginalProfile(profile);

      setIsEditing(false);

      setError(false);

      setMessage(
        "Profile updated successfully."
      );
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(true);

      setMessage(
        err?.response?.data?.message ||
          "Error updating profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancel = () => {
    setProfile(originalProfile);

    setIsEditing(false);

    setMessage("");

    setError(false);
  };

  // =========================================================
  // INPUT COMPONENT
  // =========================================================

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder = "",
    disabled = false,
  }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </label>

        <input
          type={type}
          name={name}
          value={profile[name] ?? ""}
          onChange={handleChange}
          disabled={!isEditing || disabled}
          placeholder={placeholder}
          className="
            w-full
            px-4
            py-2.5
            rounded-lg
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            text-gray-800
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100
            disabled:dark:bg-slate-700
            disabled:text-gray-500
          "
        />
      </div>
    );
  };

  // =========================================================
  // SELECT COMPONENT
  // =========================================================

  const SelectField = ({
    label,
    name,
    children,
  }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </label>

        <select
          name={name}
          value={profile[name] ?? ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="
            w-full
            px-4
            py-2.5
            rounded-lg
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            text-gray-800
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100
            disabled:dark:bg-slate-700
          "
        >
          {children}
        </select>
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">

          <div
            className="
              w-14
              h-14
              border-4
              border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-gray-600 dark:text-gray-300">
            Loading profile...
          </p>

        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow-xl
        overflow-hidden
        border
        border-gray-100
        dark:border-slate-700
      "
    >

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          p-7
          text-white
        "
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <h2 className="text-3xl font-bold">
              My Profile
            </h2>

            <p className="text-blue-100 mt-1">
              Manage your personal, academic and
              placement information
            </p>

          </div>

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
              text-4xl
              backdrop-blur-sm
            "
          >
            👨‍🎓
          </div>

        </div>

      </div>

      {/* =====================================================
          MESSAGE
      ====================================================== */}

      {message && (
        <div
          className={`
            mx-6
            mt-5
            p-3
            rounded-lg
            text-sm
            font-medium
            ${
              error
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }
          `}
        >
          {message}
        </div>
      )}

      {/* =====================================================
          PERSONAL INFORMATION
      ====================================================== */}

      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-5">

          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter full name"
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            disabled
          />

          <InputField
            label="Phone Number"
            name="phone"
            placeholder="Enter phone number"
          />

          <InputField
            label="College / University Roll No."
            name="rollNo"
            disabled
          />

        </div>

      </div>

      {/* =====================================================
          10TH INFORMATION
      ====================================================== */}

      <div className="px-6 pb-6">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            10
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Class 10th Information
            </h3>

            <p className="text-sm text-gray-500">
              Secondary school academic details
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <InputField
            label="10th Marks (%)"
            name="tenthMarks"
            type="number"
            placeholder="e.g. 85.50"
          />

          <SelectField
            label="10th Board"
            name="tenthBoard"
          >
            <option value="">
              Select Board
            </option>

            <option value="CBSE">
              CBSE
            </option>

            <option value="ICSE">
              ICSE
            </option>

            <option value="UP Board">
              UP Board
            </option>

            <option value="ISC">
              ISC
            </option>

            <option value="Other">
              Other
            </option>
          </SelectField>

          <InputField
            label="10th Year of Passing"
            name="tenthPassingYear"
            type="number"
            placeholder="e.g. 2023"
          />

        </div>

      </div>

      {/* =====================================================
          12TH INFORMATION
      ====================================================== */}

      <div className="px-6 pb-6">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold">
            12
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Class 12th Information
            </h3>

            <p className="text-sm text-gray-500">
              Senior secondary academic details
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <InputField
            label="12th Marks (%)"
            name="twelfthMarks"
            type="number"
            placeholder="e.g. 82.50"
          />

          <SelectField
            label="12th Board"
            name="twelfthBoard"
          >
            <option value="">
              Select Board
            </option>

            <option value="CBSE">
              CBSE
            </option>

            <option value="ISC">
              ISC
            </option>

            <option value="UP Board">
              UP Board
            </option>

            <option value="Other">
              Other
            </option>
          </SelectField>

          <InputField
            label="12th Year of Passing"
            name="twelfthPassingYear"
            type="number"
            placeholder="e.g. 2025"
          />

        </div>

      </div>

      {/* =====================================================
          ENGINEERING INFORMATION
      ====================================================== */}

      <div className="px-6 pb-6">

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
          Engineering / Graduation Information
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <SelectField
            label="Engineering Branch"
            name="branch"
          >
            <option value="CSE">
              Computer Science Engineering
            </option>

            <option value="CSE-AIML">
              CSE - Artificial Intelligence & ML
            </option>

            <option value="CSE-DS">
              CSE - Data Science
            </option>

            <option value="IT">
              Information Technology
            </option>

            <option value="ECE">
              Electronics & Communication
            </option>

            <option value="EEE">
              Electrical & Electronics
            </option>

            <option value="ME">
              Mechanical Engineering
            </option>

            <option value="CE">
              Civil Engineering
            </option>

            <option value="Other">
              Other
            </option>

          </SelectField>

          <InputField
            label="Current CGPA"
            name="cgpa"
            type="number"
            placeholder="e.g. 8.25"
          />

          <InputField
            label="Graduation Year"
            name="graduationYear"
            type="number"
            placeholder="e.g. 2027"
          />

          <InputField
            label="Batch"
            name="batch"
            placeholder="e.g. 2023-2027"
          />

          <InputField
            label="College"
            name="college"
            disabled
          />

        </div>

      </div>

      {/* =====================================================
          TECHNICAL PROFILE
      ====================================================== */}

      <div className="px-6 pb-6">

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
          Technical & Professional Profile
        </h3>

        <div className="grid md:grid-cols-2 gap-5">

          <InputField
            label="GitHub Profile"
            name="github"
            placeholder="https://github.com/username"
          />

          <InputField
            label="LinkedIn Profile"
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
          />

          <InputField
            label="LeetCode Profile"
            name="leetcode"
            placeholder="LeetCode username/profile"
          />

          <InputField
            label="CodeChef Profile"
            name="codechef"
            placeholder="CodeChef username/profile"
          />

        </div>

        <div className="mt-5">

          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Technical Skills
          </label>

          <textarea
            name="skills"
            value={profile.skills ?? ""}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Java, Python, C++, JavaScript, React, Node.js, MongoDB..."
            className="
              w-full
              px-4
              py-3
              rounded-lg
              border
              border-gray-300
              dark:border-slate-600
              bg-white
              dark:bg-slate-800
              text-gray-800
              dark:text-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
              disabled:bg-gray-100
              disabled:dark:bg-slate-700
            "
          />

        </div>

      </div>

      {/* =====================================================
          INTERNSHIP
      ====================================================== */}

      <div className="px-6 pb-6">

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
          Internship Information
        </h3>

        <div className="grid md:grid-cols-2 gap-5">

          <SelectField
            label="Internship Experience"
            name="internship"
          >

            <option value="">
              Select Internship Status
            </option>

            <option value="None">
              No Internship
            </option>

            <option value="Paid">
              Paid Internship
            </option>

            <option value="Unpaid">
              Unpaid Internship
            </option>

          </SelectField>

          <InputField
            label="Internship Duration (Months)"
            name="internshipMonths"
            type="number"
            placeholder="e.g. 6"
          />

        </div>

      </div>

      {/* =====================================================
          PLACEMENT PROFILE SUMMARY
      ====================================================== */}

      <div className="mx-6 mb-6">

        <div
          className="
            p-6
            rounded-2xl
            bg-gradient-to-r
            from-indigo-50
            to-blue-50
            dark:from-slate-800
            dark:to-slate-800
            border
            border-blue-100
            dark:border-slate-700
          "
        >

          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Placement Profile Summary
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Your profile information will be used to calculate
            the Placement Readiness Index.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">

            {/* 10th */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                10th
              </p>

              <p className="text-xl font-bold text-blue-600">
                {profile.tenthMarks
                  ? `${profile.tenthMarks}%`
                  : "--"}
              </p>

              <p className="text-xs text-gray-400">
                {profile.tenthBoard || "Board"}
              </p>

            </div>

            {/* 12th */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                12th
              </p>

              <p className="text-xl font-bold text-green-600">
                {profile.twelfthMarks
                  ? `${profile.twelfthMarks}%`
                  : "--"}
              </p>

              <p className="text-xs text-gray-400">
                {profile.twelfthBoard || "Board"}
              </p>

            </div>

            {/* CGPA */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                CGPA
              </p>

              <p className="text-xl font-bold text-purple-600">
                {profile.cgpa || "--"}
              </p>

            </div>

            {/* Internship */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                Internship
              </p>

              <p className="text-sm font-bold text-orange-600">
                {profile.internship || "None"}
              </p>

            </div>

            {/* GitHub */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                GitHub
              </p>

              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {profile.github
                  ? "Added"
                  : "Not Added"}
              </p>

            </div>

            {/* Skills */}

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center shadow-sm">

              <p className="text-xs text-gray-500">
                Skills
              </p>

              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {profile.skills
                  ? "Added"
                  : "Not Added"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="px-6 pb-7 flex justify-end gap-3">

        {!isEditing ? (

          <button
            onClick={() => {
              setMessage("");
              setError(false);
              setIsEditing(true);
            }}
            className="
              px-6
              py-2.5
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-lg
              font-medium
              transition
              shadow
            "
          >
            Edit Profile
          </button>

        ) : (

          <>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="
                px-6
                py-2.5
                bg-gray-200
                hover:bg-gray-300
                dark:bg-slate-700
                dark:text-white
                rounded-lg
                font-medium
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="
                px-6
                py-2.5
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                font-medium
                disabled:opacity-50
                shadow
              "
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </>

        )}

      </div>

    </div>
  );
};

export default Profile;
