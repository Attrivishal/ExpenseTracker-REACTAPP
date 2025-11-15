// src/components/Notification.jsx
import React from "react";

export default function Notification({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <div>⚠️</div>
        <div>{message}</div>
        <button className="ml-3 font-bold" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
