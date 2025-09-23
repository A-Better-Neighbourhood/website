"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserDashboard: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/90 rounded-2xl shadow-xl flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl font-bold text-blue-700 mb-1">User Dashboard</div>
        <div className="text-lg font-semibold text-gray-800">{userData?.name || "User Name"}</div>
        <div className="text-gray-500">Phone: {userData?.phoneNo || "N/A"}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center shadow">
          <div className="text-xl font-bold text-blue-800 mb-2">User Reports</div>
          <div className="text-3xl font-extrabold text-blue-700">0</div>
        </div>
        <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center shadow">
          <div className="text-xl font-bold text-green-800 mb-2">User Upvotes</div>
          <div className="text-3xl font-extrabold text-green-700">0</div>
        </div>
        <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-center shadow">
          <div className="text-xl font-bold text-yellow-800 mb-2">User Tracking</div>
          <div className="text-3xl font-extrabold text-yellow-700">0</div>
        </div>
        <div className="bg-purple-100 rounded-xl p-6 flex flex-col items-center shadow">
          <div className="text-xl font-bold text-purple-800 mb-2">Issue Resolve</div>
          <div className="text-3xl font-extrabold text-purple-700">0</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;