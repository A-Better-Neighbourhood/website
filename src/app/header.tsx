import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-blue-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">A Better Neighbourhood</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/home" className="hover:underline">Home</a></li>
            <li><a href="/reports" className="hover:underline">Reports</a></li>
            <li><a href="/addReport" className="hover:underline">Add Report</a></li>
            <li><a href="/user" className="hover:underline">Dashboard</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
