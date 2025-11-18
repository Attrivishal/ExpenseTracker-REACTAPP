// src/components/SortMenu.jsx
import React from "react";

export default function SortMenu({ value, onChange }) {
  return (
    <select
      className="p-2 border rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="amount_desc">Amount (High → Low)</option>
      <option value="amount_asc">Amount (Low → High)</option>
    </select>
  );
}
