// src/components/RecurringModal.jsx
import React, { useEffect, useState } from "react";
import { loadData, saveData } from "../utils/storage";

export default function RecurringModal({ open, onClose, onChanged }) {
  // storage key — keep consistent with other code that may write recurring items
  const KEY = "recurringItems";
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", amount: "", frequency: "monthly", category: "", nextDate: "" });

  useEffect(() => {
    if (!open) return;
    const r = loadData(KEY) || [];
    setItems(Array.isArray(r) ? r : []);
  }, [open]);

  const startEdit = (it) => {
    setEditingId(it.id);
    setForm({
      title: it.title || "",
      amount: String(it.amount || ""),
      frequency: it.frequency || "monthly",
      category: it.category || "",
      nextDate: it.nextDate ? new Date(it.nextDate).toISOString().slice(0, 10) : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", amount: "", frequency: "monthly", category: "", nextDate: "" });
  };

  const saveEdit = () => {
    if (!form.title.trim()) return alert("Enter title");
    const amt = Number(form.amount);
    if (Number.isNaN(amt) || amt <= 0) return alert("Enter valid amount");
    const updated = items.map((it) =>
      it.id === editingId
        ? { ...it, title: form.title.trim(), amount: amt, frequency: form.frequency, category: form.category, nextDate: new Date(form.nextDate).toISOString() }
        : it
    );
    setItems(updated);
    saveData(KEY, updated);
    setEditingId(null);
    if (typeof onChanged === "function") onChanged();
  };

  const deleteItem = (id) => {
    if (!window.confirm("Delete this recurring item?")) return;
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    saveData(KEY, updated);
    if (typeof onChanged === "function") onChanged();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl mx-4 rounded-2xl p-5 z-50 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Manage Recurring Items</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-auto">
          {items.length === 0 && <div className="text-gray-500">No recurring items</div>}

          {items.map((it) => (
            <div key={it.id} className="p-3 rounded-md bg-gray-50 flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">₹{it.amount} • {it.frequency} • {it.category}</div>
                <div className="text-xs text-gray-400 mt-1">Next: {it.nextDate ? new Date(it.nextDate).toLocaleDateString() : "—"}</div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex gap-2">
                  <button onClick={() => startEdit(it)} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Edit</button>
                  <button onClick={() => deleteItem(it.id)} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}

          {editingId && (
            <div className="p-3 rounded-md bg-white border">
              <div className="text-sm text-gray-600 mb-2">Edit item</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input className="p-2 border rounded" placeholder="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
                <input className="p-2 border rounded" placeholder="Amount" value={form.amount} onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))} />
                <select className="p-2 border rounded" value={form.frequency} onChange={(e) => setForm((s) => ({ ...s, frequency: e.target.value }))}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <input className="p-2 border rounded" placeholder="Category" value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} />
                <input type="date" className="p-2 border rounded col-span-full" value={form.nextDate} onChange={(e) => setForm((s) => ({ ...s, nextDate: e.target.value }))} />
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={saveEdit} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
