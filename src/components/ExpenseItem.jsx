import React from "react";

export default function ExpenseItem({ exp, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between clean-card p-4 layered">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
          {exp.category?.[0] || "?"}
        </div>

        <div>
          <div className="font-medium">{exp.title}</div>
          <div className="text-sm text-gray-400">{exp.category} • {new Date(exp.date).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`text-lg font-bold ${exp.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
          ₹{exp.amount}
        </div>

        <button onClick={() => onEdit?.(exp)} className="text-sm text-indigo-600 px-3 py-2 rounded hover:bg-indigo-50">
          Edit
        </button>
        <button onClick={() => onDelete?.(exp.id)} className="text-sm text-red-600 px-3 py-2 rounded hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
}
