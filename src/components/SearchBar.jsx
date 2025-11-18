// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search by title or category" }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full md:w-64 p-2 border rounded-lg"
    />
  );
}
