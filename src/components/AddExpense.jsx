import React, { useState } from "react";

function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount <= 0) return alert("Amount must be greater than 0");

    const newItem = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    onAdd(newItem);

    alert("Entry added successfully!");

    setTitle("");
    setAmount("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl">

      <h2 className="text-3xl font-bold mb-4">Add Entry</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium">Title</label>
          <input
            className="w-full p-3 border rounded-lg bg-white/50 dark:bg-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium">Amount</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg bg-white/50 dark:bg-gray-800"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium">Type</label>
          <select
            className="w-full p-3 border rounded-lg bg-white/50 dark:bg-gray-800"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Category</label>
          <select
            className="w-full p-3 border rounded-lg bg-white/50 dark:bg-gray-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Education</option>
            <option>Bill</option>
            <option>Entertainment</option>
            <option>General</option>
          </select>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-lg">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
