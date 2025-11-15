import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Topbar({ user, summary, mobileOpen, setMobileOpen }) {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md bg-white/30 dark:bg-black/30 shadow"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" stroke="white" fill="none" strokeWidth="1.6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Welcome back,</p>
            <h2 className="text-xl font-semibold">{user}</h2>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Spend</p>
            <p className="text-lg font-bold">₹{summary?.monthly || 0}</p>
          </div>

          {/* Dark/Light Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
