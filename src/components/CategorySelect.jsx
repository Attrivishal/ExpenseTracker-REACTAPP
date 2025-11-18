// src/components/CategorySelect.jsx
import React from "react";
import categories from "../utils/categories";

export default function CategorySelect({ value, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded-lg ${className}`}
    >
      <option value="">Select Category</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
