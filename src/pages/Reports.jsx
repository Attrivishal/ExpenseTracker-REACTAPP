// src/pages/Reports.jsx
import React, { useMemo, useState } from "react";
import ExportButtons from "../components/ExportButtons"; // keep your existing export logic if present

export default function Reports({ expenses = [], onEdit, onDelete, onExportPDF, onExportExcel }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return expenses;
    return expenses.filter(
      (e) =>
        e.title.toLowerCase().includes(s) ||
        (e.category || "").toLowerCase().includes(s) ||
        String(e.amount).includes(s)
    );
  }, [q, expenses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Reports</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onExportPDF && onExportPDF(expenses)}
            className="py-2 px-4 bg-red-500 text-white rounded-lg shadow"
          >
            Export PDF
          </button>
          <button
            onClick={() => onExportExcel && onExportExcel(expenses)}
            className="py-2 px-4 bg-green-600 text-white rounded-lg shadow"
          >
            Export Excel
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <input
          placeholder="Search by title or category"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-4 py-2 rounded-lg border w-72"
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-gray-500">No transactions to show</div>}
        {filtered.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                {r.title?.[0]?.toUpperCase() || "–"}
              </div>
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-gray-400">{r.category} • {new Date(r.date).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`font-semibold ${r.type === "income" ? "text-green-600" : "text-red-500"}`}>₹{r.amount}</div>
              <button onClick={() => onEdit?.(r)} className="text-indigo-600">Edit</button>
              <button onClick={() => onDelete?.(r.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
