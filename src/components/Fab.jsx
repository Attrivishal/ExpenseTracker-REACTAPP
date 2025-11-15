// src/components/Fab.jsx
import React from "react";

export default function Fab({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed z-40 right-6 bottom-6 w-14 h-14 rounded-full shadow-xl bg-gradient-to-br from-indigo-600 to-purple-500 text-white text-2xl flex items-center justify-center"
      aria-label="Add"
    >
      +
    </button>
  );
}
