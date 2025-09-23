"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "./index";

const Signup: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await createAccount({ name, phoneNo, address });
      // Save user to localStorage
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      // Prevent duplicate phone numbers
      if (users.some((u: { phoneNo: string }) => u.phoneNo === phoneNo)) {
        setError("Phone number already registered. Please sign in.");
        return;
      }
      users.push({ name, phoneNo, address });
      localStorage.setItem("users", JSON.stringify(users));
      // Optionally, set current user
      localStorage.setItem("currentUser", JSON.stringify({ name, phoneNo, address }));
      router.push("/home");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log({ name, phoneNo, address });
  //     router.push("/signup"); // redirect

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl border border-blue-100 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-1 tracking-tight drop-shadow">Create an Account!</h2>
          <p className="text-gray-600">Sign up to get started with your dashboard</p>
        </div>
        {error && <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Full Name</label>
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 shadow-sm transition"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Phone Number</label>
          <Input
            type="number"
            placeholder="Phone Number"
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
          Create Account
        </Button>
        <p className="mt-2 text-center text-gray-700">
          Already have an account?{" "}
          <Link href="/" className="text-blue-700 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

async function createAccount(data: { name: string; phoneNo: string; address: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.name || !data.phoneNo || !data.address) {
        reject(new Error("All fields are required"));
      } else {
        resolve(data);
      }
    }, 500);
  });
}

export default Signup;