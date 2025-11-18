// src/components/Notification.jsx
import React from "react";

const Notification = ({ notifications = [] }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`
            px-5 py-3 rounded-xl shadow-lg text-white animate-slideIn 
            transition-all duration-300 flex items-center gap-3
            ${n.type === "success" ? "bg-green-500" : n.type === "danger" ? "bg-red-500" : "bg-blue-500"}
          `}
        >
          {n.type === "success" && <span className="text-xl">✔️</span>}
          {n.type === "danger" && <span className="text-xl">⚠️</span>}
          {n.type === "info" && <span className="text-xl">ℹ️</span>}
          <p className="font-medium">{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
