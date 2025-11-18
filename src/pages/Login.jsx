// src/pages/Login.jsx
import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return alert("Enter name");
    if (onLogin) onLogin(n);
    else { localStorage.setItem("username", n); window.location.reload(); }
  };

  return (
    // NOTE: Assuming your Tailwind config is set up. We use 'teal' as the accent color.

<div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
  {/* ENHANCED CARD: Wide, soft shadow, large radius, focused padding */}
  <div className="max-w-xl w-full bg-white p-12 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100">
    
    {/* HEADER SECTION */}
    <div className="text-center mb-8">
      {/* Aesthetic Icon/Graphic Placeholder */}
      <div className="mx-auto w-16 h-16 mb-4 bg-teal-100/70 rounded-full flex items-center justify-center">
        {/* Placeholder for an SVG Icon (e.g., a small chart or wallet icon) */}
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V9m0 2V7m0 4v2m0 2v2m0-12a9 9 0 110 18 9 9 0 010-18z"></path></svg>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Personal Finance Tracker
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        A dedicated space for your financial journey.
      </p>
    </div>

    {/* DECORATIVE SEPARATOR */}
    <div className="w-full h-px bg-gray-200 mb-6"></div>

    <form onSubmit={submit} className="space-y-6">
      {/* INPUT FIELD: Added padding and subtle transition for aesthetic feel */}
      <div>
        <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1.5">
          Your Name
        </label>
        <input
          id="name-input"
          className="w-full px-5 py-3.5 border border-gray-300 rounded-xl 
                     text-gray-900 placeholder-gray-400 
                     focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                     transition duration-200 ease-in-out"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Ram Sharma"
        />
      </div>
      
      <div className="flex gap-4 pt-4">
        {/* PRIMARY BUTTON: Bold color, distinct shadow, and hover effect */}
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-teal-600 text-white font-semibold 
                     rounded-xl shadow-lg shadow-teal-300/50 hover:bg-teal-700 
                     focus:outline-none focus:ring-4 focus:ring-teal-300 
                     transition duration-300 ease-in-out transform hover:scale-[1.01]" 
        >
          Continue Tracking
        </button>
        
        {/* SECONDARY BUTTON: Subtle, but defined */}
        <button
          type="button"
          className="px-4 py-3 text-teal-600 font-medium 
                     rounded-xl border border-teal-200 bg-teal-50/50 
                     hover:bg-teal-100 transition duration-200"
          onClick={() => { setName("Demo User"); }}
        >
          Demo
        </button>
      </div>
    </form>
  </div>
</div>
  );
}
