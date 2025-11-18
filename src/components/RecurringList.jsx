// src/components/RecurringList.jsx
import React, { useEffect, useState } from "react";
import { loadRecurring, saveRecurring } from "../utils/recurring";

export default function RecurringList({ onUpdated }) {
  const [list, setList] = useState(() => loadRecurring());

  useEffect(()=> {
    setList(loadRecurring());
  }, []);

  const remove = (id) => {
    const updated = list.filter((r) => r.id !== id);
    setList(updated);
    saveRecurring(updated);
    onUpdated?.(updated);
  };

  const bumpNext = (r) => {
    // quick helper to advance nextDate once (used when user wants to skip)
    const next = new Date(r.nextDate);
    if (r.frequency === "daily") next.setDate(next.getDate() + 1);
    if (r.frequency === "weekly") next.setDate(next.getDate() + 7);
    if (r.frequency === "monthly") next.setMonth(next.getMonth() + 1);
    const updated = list.map((it) => (it.id === r.id ? { ...it, nextDate: next.toISOString() } : it));
    setList(updated);
    saveRecurring(updated);
    onUpdated?.(updated);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Recurring Items</h3>
        {list.length === 0 && <div className="text-gray-500">No recurring items set.</div>}
        <div className="space-y-3">
          {list.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-gray-500">{r.category} • {r.frequency} • Next: {new Date(r.nextDate).toLocaleDateString()}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={()=>bumpNext(r)} className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded">Skip</button>
                <button onClick={()=>remove(r.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
