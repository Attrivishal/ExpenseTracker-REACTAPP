// src/components/SavingsGoal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { saveData, loadData } from "../utils/storage";

export default function SavingsGoal({ expenses = [], budget = 0, balance = 0, notify = () => {} }) {
  const KEY = "savingsGoal";
  const stored = loadData(KEY);
  const initialGoal = typeof stored === "number" ? stored : stored ? Number(stored) : 0;

  const [goal, setGoal] = useState(initialGoal || 0);
  const [input, setInput] = useState(initialGoal ? String(initialGoal) : "");
  const [avgSaving, setAvgSaving] = useState(null);
  const [lastMilestone, setLastMilestone] = useState(0);

  useEffect(() => setInput(goal ? String(goal) : ""), [goal]);

  // compute avg monthly saving
  useEffect(() => {
    try {
      if (!expenses || expenses.length === 0) {
        setAvgSaving(null);
        return;
      }
      const map = {};
      expenses.forEach((e) => {
        const d = new Date(e.date);
        if (isNaN(d)) return;
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (!map[key]) map[key] = { income: 0, expense: 0 };
        if (e.type === "income") map[key].income += Number(e.amount || 0);
        else map[key].expense += Number(e.amount || 0);
      });
      const months = Object.values(map);
      if (!months.length) { setAvgSaving(null); return; }
      const monthlyNet = months.map((m) => m.income - m.expense);
      const avg = monthlyNet.reduce((s, x) => s + x, 0) / monthlyNet.length;
      setAvgSaving(avg);
    } catch {
      setAvgSaving(null);
    }
  }, [expenses]);

  const percent = useMemo(() => {
    if (!goal || goal <= 0) return 0;
    return Math.min(Math.round((Math.max(0, balance) / goal) * 100), 100);
  }, [goal, balance]);

  const daysLeft = useMemo(() => {
    if (!goal) return "Set a goal to see estimation";
    if (balance >= goal) return "🎉 Goal reached!";
    if (!avgSaving || avgSaving <= 0) return "Not enough data to estimate yet";
    const monthsNeeded = (goal - balance) / avgSaving;
    const days = Math.round(monthsNeeded * 30);
    return `${days} day${days === 1 ? "" : "s"} remaining at current pace`;
  }, [goal, balance, avgSaving]);

  // milestone notifications
  useEffect(() => {
    if (!goal || !notify) return;
    const milestones = [25, 50, 75, 100];
    for (let m of milestones) {
      if (percent >= m && lastMilestone < m) {
        try { notify(`🎉 You reached ${m}% of your savings goal!`, "success"); } catch {}
        setLastMilestone(m);
      }
    }
  }, [percent, goal, lastMilestone, notify]);

  const saveGoal = () => {
    if (!input.trim()) {
      setGoal(0);
      saveData(KEY, 0);
      notify("Savings goal cleared", "info");
      return;
    }
    const n = Number(input);
    if (Number.isNaN(n) || n <= 0) {
      notify("Enter a valid positive amount", "danger");
      return;
    }
    setGoal(n);
    saveData(KEY, n);
    notify("Savings goal updated", "success");
  };

  const handleBlur = () => {
    if (input === "") { saveGoal(); return; }
    if (Number(input) !== goal) saveGoal();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Savings Goal</h2>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Goal</p>
          <p className="text-lg font-bold">₹{goal || 0}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current Balance</p>
            <p className="text-xl font-semibold">₹{balance}</p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{percent}%</p>
        </div>

        <div className="w-full h-3 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div style={{ width: `${percent}%` }} className="h-3 bg-indigo-600 transition-all" />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter savings goal"
          className="flex-1 p-2 border rounded-lg bg-transparent dark:border-gray-700"
        />
        <button onClick={saveGoal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save</button>
      </div>

      <div className="mt-4 text-sm">
        <p className="text-gray-600 dark:text-gray-300">{daysLeft}</p>
        {avgSaving !== null && <p className="mt-1 text-gray-500 dark:text-gray-400">Avg Monthly Saving: <strong>₹{Math.round(avgSaving)}</strong></p>}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Estimation is based on your income & expenses.</p>
    </div>
  );
}
