import React from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({
  user,
  active,
  setActive,
  onLogout,
  mobileOpen,
  setMobileOpen,
}) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "add", label: "Add Expense", icon: PlusCircleIcon },
    { id: "reports", label: "Reports", icon: ChartBarIcon },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <>
      {/* SIDEBAR STRUCTURE */}
      <aside
        className={`
        fixed md:static left-0 top-0 h-full w-72 z-40
        backdrop-blur-xl bg-white/20 dark:bg-black/30 
        border-r border-white/20 dark:border-white/10
        shadow-xl md:shadow-none
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* User card */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-2xl flex items-center justify-center shadow-md">
              {user?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">Premium User</p>
            </div>
            {/* Close on mobile */}
            <button
              className="ml-auto md:hidden text-gray-500"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setActive(n.id);
                setMobileOpen(false);
              }}
              className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all
              ${
                active === n.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/10"
              }
            `}
            >
              <n.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{n.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-5 w-full px-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-all shadow-md"
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
