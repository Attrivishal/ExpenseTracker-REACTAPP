// src/components/AddRecurring.jsx
import React, { useState } from "react";
import { saveData, loadData } from "../utils/storage";
import { saveRecurring, loadRecurring } from "../utils/recurring";

export default function AddRecurring({ onAddRecurring }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Enter a title");
    if (!amount || Number(amount) <= 0) return alert("Enter valid amount");

    const newRec = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category: category || "Other",
      frequency,
      nextDate: new Date(startDate).toISOString(),
    };

    // Save locally
    const list = loadRecurring();
    list.unshift(newRec);
    saveRecurring(list);

    if (onAddRecurring) onAddRecurring(list);

    // reset
    setTitle("");
    setAmount("");
    setCategory("");
    setFrequency("monthly");
    setStartDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8">
        <h3 className="text-2xl font-extrabold mb-4">Create Recurring Entry</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}
              className="mt-2 w-full p-3 rounded-lg border border-gray-200" placeholder="e.g. Rent, Netflix" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-600">Amount (₹)</label>
              <input type="number" min="0" value={amount} onChange={(e)=>setAmount(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border border-gray-200" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Type</label>
              <select value={type} onChange={(e)=>setType(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border border-gray-200">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Category</label>
              <input value={category} onChange={(e)=>setCategory(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border border-gray-200" placeholder="Optional" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Frequency</label>
              <select value={frequency} onChange={(e)=>setFrequency(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border border-gray-200">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg border border-gray-200" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600">
              Save Recurring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
