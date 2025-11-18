import React from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Repeat,
  FileBarChart,
  PiggyBank,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Sidebar({
  user,
  profileImage,
  setProfileImage,
  active,
  setActive,
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  onLogout,
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "add", label: "Add Expense", icon: <PlusCircle size={20} /> },
    { id: "recurring", label: "Recurring", icon: <Repeat size={20} /> },
    { id: "reports", label: "Reports", icon: <FileBarChart size={20} /> },
    { id: "savings", label: "Savings Goal", icon: <PiggyBank size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40 transition-all duration-300
          ${collapsed ? "w-20" : "w-72"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* WRAPPER WITH GLASS EFFECT */}
        <div
          className="
            h-full flex flex-col border-r border-white/10
            bg-white/20 dark:bg-black/20 backdrop-blur-xl shadow-2xl
          "
        >
          {/* TOP PROFILE SECTION */}
          <div className="flex flex-col items-center p-5 pb-3">
            {/* Profile Image + Upload */}
            <label className="relative cursor-pointer group">
              <img
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover shadow-xl border-2 border-white/30"
              />

              {/* Status Dot */}
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full shadow-md"></span>

              {/* Upload Hover */}
              {!collapsed && (
                <div
                  className="
                    absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100
                    flex items-center justify-center text-white text-xs font-medium transition
                  "
                >
                  Change
                </div>
              )}

              <input type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
            </label>

            {/* USER NAME */}
            {!collapsed && (
              <div className="mt-3 text-center">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                  {user}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back 👋
                </p>
              </div>
            )}
          </div>

          {/* COLLAPSE BUTTON */}
          <div className="px-4 -mt-3 mb-4 flex justify-end">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="
                p-2 rounded-full bg-white/30 dark:bg-white/10
                hover:bg-white/40 transition
              "
            >
              {collapsed ? (
                <ChevronRight className="text-gray-900 dark:text-gray-100" />
              ) : (
                <ChevronLeft className="text-gray-900 dark:text-gray-100" />
              )}
            </button>
          </div>

          {/* MENU */}
          <nav className="flex-1 mt-2 space-y-2 px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all
                  ${active === item.id
                    ? "bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white shadow-lg"
                    : "text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-white/10"
                  }
                `}
              >
                {item.icon}
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="p-4 border-t border-white/10 mt-4">
            <button
              onClick={onLogout}
              className="
                flex items-center gap-3 w-full px-3 py-3 rounded-xl
                text-red-500 hover:bg-red-500/20 transition
              "
            >
              <LogOut size={20} /> {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
