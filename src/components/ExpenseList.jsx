// src/components/ExpenseList.jsx
import React, { useState, useMemo } from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses = [], onDelete, onEdit }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter(
      (e) =>
        (e.title || "").toLowerCase().includes(term) ||
        (e.category || "").toLowerCase().includes(term)
    );
  }, [q, expenses]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl font-medium">Transactions</h2>
        <input
          placeholder="Search by title or category"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input w-full sm:w-64"
          aria-label="Search transactions"
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-gray-500">No transactions</div>}
        {filtered.map((exp) => (
          <ExpenseItem key={exp.id} exp={exp} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
