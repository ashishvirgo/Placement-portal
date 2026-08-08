import React from "react";

const Reports = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-bold">Total Users</h3>
          <p className="text-2xl">120</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-bold">Total Tests</h3>
          <p className="text-2xl">45</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-bold">Attempts</h3>
          <p className="text-2xl">320</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;