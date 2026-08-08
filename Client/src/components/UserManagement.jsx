import React from "react";

const UserManagement = () => {
  const users = [
    { name: "Ashish", userId: "U101", role: "student" },
    { name: "Rahul", userId: "U102", role: "student" },
    { name: "Admin", userId: "A001", role: "admin" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((u, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <p><b>Name:</b> {u.name}</p>
            <p><b>User ID:</b> {u.userId}</p>
            <p><b>Role:</b> {u.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;