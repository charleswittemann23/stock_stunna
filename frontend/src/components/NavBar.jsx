import React from "react";
import { Link } from "react-router-dom";
import MyPortfolioButton from "./MyPortfolioButton";

export default function NavBar() {
  return (
    <nav
      className="w-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg"
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className=" text-3xl font-extrabold tracking-wide hover:text-gray-200 transition-colors duration-300"
        >
          My App
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/portfolio"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 rounded-md"
            aria-label="Go to My Portfolio"
          >
            <MyPortfolioButton />
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 rounded-md border border-black bg-[#A2C2DD] shadow-md text-base font-semibold text-black transition-transform duration-300 hover:bg-[#89a7c9] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
