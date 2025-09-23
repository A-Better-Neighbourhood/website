"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Button, Input, Logo} from "./index"

const Login: React.FC = () => {
  const router = useRouter();
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get users from localStorage
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    // Find user with matching phoneNo and password
    const user = users.find((u: { phoneNo: string; address: string }) => u.phoneNo === phoneNo && u.address === address);
    if (user) {
      // Optionally, set current user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/home");
    } else {
      alert("Invalid phone number or password. Please sign up first.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl border border-blue-100 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight drop-shadow">Welcome Back!</h2>
          <p className="text-gray-600">Enter your credentials to access your dashboard</p>
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Phone Number</label>
          <Input
            type="number"
            placeholder="Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 shadow-sm transition"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Address</label>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 shadow-sm transition"
          />
        </div>
        <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition">
          Sign in
        </Button>
        <p className="mt-2 text-center text-gray-700">
          Don’t have an account? <Link href="/signup" className="text-blue-700 font-bold hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;