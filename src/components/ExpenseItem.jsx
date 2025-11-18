// src/components/ExpenseItem.jsx
import React from "react";
import { useNotifications } from "../hooks/useNotifications";

export default function ExpenseItem({ exp, onDelete, onEdit }) {
  const { showNotification } = useNotifications();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete this entry?")) {
      onDelete?.(exp.id);
      showNotification("Expense deleted successfully", "error");
    }
  };

  const handleEdit = () => {
    onEdit?.(exp);
    showNotification("Editing mode activated", "info");
  };

  return (
    <div className="flex items-center justify-between clean-card p-4 layered animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
          {exp.category?.[0]?.toUpperCase() || "?"}
        </div>

        <div>
          <div className="font-medium">{exp.title}</div>
          <div className="text-sm text-gray-400">
            {exp.category} • {new Date(exp.date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`text-lg font-bold ${
            exp.type === "income" ? "text-green-600" : "text-red-500"
          }`}
        >
          {exp.type === "income" ? "+" : "-"} ₹{exp.amount}
        </div>

        <button
          onClick={handleEdit}
          className="text-sm text-indigo-600 px-3 py-2 rounded hover:bg-indigo-50"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-sm text-red-600 px-3 py-2 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
