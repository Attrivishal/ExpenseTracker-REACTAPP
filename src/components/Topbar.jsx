import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

export default function Topbar({
  user,
  profileImage,
  summary,
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  theme,
  toggleTheme,
}) {
  // TIME BASED GREETING WITH EMOJIS
  const hour = new Date().getHours();

  let greeting =
    hour < 12 ? "🌤️ Good Morning" :
    hour < 17 ? "☀️ Good Afternoon" :
    "🌙 Good Evening";

  return (
    <header className="left-0 right-0 top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">

         

          {/* COLLAPSE (DESKTOP) */}
          {/* <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition"
          >
            <Squares2X2Icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button> */}

          {/* EMOJI GREETING + USER NAME */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{greeting},</p>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
              {user} 👋
            </h2>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* MONTHLY SPEND WITH EMOJI */}
          <div className="hidden sm:block bg-gray-100/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow-sm text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">💸 Monthly Spend</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ₹{summary?.spent ?? 0}
            </p>
          </div>

          {/* PROFILE AVATAR */}
          <img
            src={profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            className="w-11 h-11 rounded-2xl object-cover shadow-sm ring-1 ring-gray-300/40 dark:ring-gray-700/40"
            alt="profile"
          />

          {/* THEME TOGGLE WITH EMOJI 🌙 / ☀️ */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition text-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

      </div>
    </header>
  );
}
