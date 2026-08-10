import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserCheck,
  FaUserSlash,
  FaUsers,
} from "react-icons/fa";

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/user/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      await axios.delete(`${API}/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const toggleStatus = async (id, name, isActive) => {
    if (
      !window.confirm(
        `${isActive ? "Deactivate" : "Activate"} ${name}?`
      )
    )
      return;

    try {
      await axios.patch(
        `${API}/user/toggle-status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `${API}/user/edit/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Update failed");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.userId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              User Management
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Manage students, teachers and administrators
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-50 dark:bg-slate-700 px-5 py-3 rounded-xl">
              <p className="text-xs text-slate-500">
                Total Users
              </p>

              <p className="font-bold text-xl">
                {users.length}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-slate-700 px-5 py-3 rounded-xl">
              <p className="text-xs text-slate-500">
                Active Users
              </p>

              <p className="font-bold text-xl">
                {users.filter((u) => u.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">

        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center">
            <FaUsers className="mx-auto text-4xl text-slate-400 mb-3" />
            <p className="text-slate-500">
              No users found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-5 py-4 text-left">
                    User
                  </th>
                  <th className="px-5 py-4 text-left">
                    User ID
                  </th>
                  <th className="px-5 py-4 text-left">
                    Email
                  </th>
                  <th className="px-5 py-4 text-left">
                    Mobile
                  </th>
                  <th className="px-5 py-4 text-left">
                    Role
                  </th>
                  <th className="px-5 py-4 text-left">
                    Status
                  </th>
                  <th className="px-5 py-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {user.userId}
                    </td>

                    <td className="px-5 py-4">
                      {user.email}
                    </td>

                    <td className="px-5 py-4">
                      {user.mobile}
                    </td>

                    <td className="px-5 py-4 capitalize">
                      {user.role}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            setEditingUser(user)
                          }
                          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            deleteUser(
                              user._id,
                              user.name
                            )
                          }
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                          <FaTrash />
                        </button>

                        <button
                          onClick={() =>
                            toggleStatus(
                              user._id,
                              user.name,
                              user.isActive
                            )
                          }
                          className={`p-2 rounded-lg text-white ${
                            user.isActive
                              ? "bg-slate-600 hover:bg-slate-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {user.isActive ? (
                            <FaUserSlash />
                          ) : (
                            <FaUserCheck />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-md">

            <h3 className="text-xl font-bold mb-5">
              Edit User
            </h3>

            <div className="space-y-4">

              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    name: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                placeholder="Name"
              />

              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    email: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                placeholder="Email"
              />

              <input
                type="text"
                value={editingUser.mobile}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    mobile: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                placeholder="Mobile"
              />

              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    role: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
              >
                <option value="student">
                  Student
                </option>
                <option value="teacher">
                  Teacher
                </option>
                <option value="admin">
                  Admin
                </option>
              </select>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setEditingUser(null)
                }
                className="px-5 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;