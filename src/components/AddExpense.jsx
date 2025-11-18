// src/components/AddExpense.jsx
import React, { useState } from "react";
import { autoCategorize } from "../utils/autoCategorize";
import { useNotifications } from "../hooks/useNotifications";

export default function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [recurring, setRecurring] = useState("none");
  const [notes, setNotes] = useState("");

  // NEW → renamed from push → showNotification
  const { showNotification } = useNotifications();

  const categories = [
    "Food", "Travel", "Shopping", "Bills", "Groceries",
    "Entertainment", "Health", "Education", "Other"
  ];

  const submit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      showNotification("Please enter a valid title.", "error");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      showNotification("Enter a valid amount.", "error");
      return;
    }

    // If user didn't choose category → auto detect
    const selectedCategory = category || autoCategorize(title);

    const entry = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category: selectedCategory,
      recurring,
      notes,
      date: new Date().toISOString(),
    };

    // Add entry to parent
    onAdd(entry);

    // SUCCESS NOTIFICATION
    if (type === "income") {
      showNotification("Income added successfully! 🎉", "success");
    } else {
      showNotification("Expense added successfully! 💰", "success");
    }

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("");
    setType("expense");
    setRecurring("none");
    setNotes("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mt-4 mb-6">
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl 
                        rounded-3xl shadow-xl border border-white/20 
                        dark:border-gray-700/40 p-6 md:p-8
                        transition duration-300">

          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 
                        text-transparent bg-clip-text">
            Add Expense / Income
          </h3>

          <form onSubmit={submit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Title</label>
              <input
                className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-200 dark:border-gray-700 
                           focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="e.g. Zomato Order, Bus Ticket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Amount + Type + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700 
                             focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Type</label>
                <select
                  className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700 outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Category</label>
                <select
                  className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700 outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Auto detect</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recurring */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Recurring</label>
              <select
                className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-200 dark:border-gray-700 outline-none"
                value={recurring}
                onChange={(e) => setRecurring(e.target.value)}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Notes (Optional)</label>
              <textarea
                className="mt-2 w-full p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                           border border-gray-200 dark:border-gray-700 outline-none"
                rows="3"
                placeholder="Add any extra details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl text-white font-semibold 
                           bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg 
                           hover:scale-[1.02] transition"
              >
                Add Entry
              </button>

              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setAmount("");
                  setCategory("");
                  setType("expense");
                  setRecurring("none");
                  setNotes("");

                  showNotification("Form reset!", "info");
                }}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
