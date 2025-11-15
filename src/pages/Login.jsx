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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="max-w-lg w-full clean-card p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Expense Pro</h1>
          <p className="text-sm text-gray-500">Sign in with your name — data is stored locally.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
          <div className="flex gap-3">
            <button className="btn btn-primary flex-1">Continue</button>
            <button type="button" className="btn btn-ghost" onClick={()=>{ setName("Demo User"); }}>
              Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
