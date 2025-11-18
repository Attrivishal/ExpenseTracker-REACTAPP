import React, { useEffect, useMemo, useState } from "react";
import { saveData, loadData } from "../utils/storage"; // ✅ Correct path

export default function SavingsWidget({ balance = 0, expenses = [], notify }) {

  const KEY = "savingsGoalWidget";

  const stored = loadData(KEY);
  const initialGoal =
    typeof stored === "number" ? stored : stored ? Number(stored) : 0;

  const [goal, setGoal] = useState(initialGoal || 0);
  const [input, setInput] = useState(initialGoal ? String(initialGoal) : "");
  const [avgSaving, setAvgSaving] = useState(null);
  const [lastMilestone, setLastMilestone] = useState(0);

  useEffect(() => setInput(goal ? String(goal) : ""), [goal]);

  // ---------------- Month Avg ----------------
  useEffect(() => {
    if (!expenses.length) {
      setAvgSaving(null);
      return;
    }

    const monthMap = {};

    expenses.forEach((e) => {
      const d = new Date(e.date);
      if (isNaN(d)) return;

      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!monthMap[key]) monthMap[key] = { income: 0, expense: 0 };

      if (e.type === "income") monthMap[key].income += Number(e.amount);
      else monthMap[key].expense += Number(e.amount);
    });

    const months = Object.values(monthMap);
    if (!months.length) return setAvgSaving(null);

    const monthlyNet = months.map((m) => m.income - m.expense);
    const avg = monthlyNet.reduce((a, b) => a + b, 0) / months.length;

    setAvgSaving(avg);
  }, [expenses]);

  // ---------------- % Progress ----------------
  const percent = useMemo(() => {
    if (!goal) return 0;
    return Math.min(Math.round((Math.max(balance, 0) / goal) * 100), 100);
  }, [goal, balance]);

  // ---------------- Days Left ----------------
  const daysLeft = useMemo(() => {
    if (!goal) return "Set a goal to see estimation";
    if (balance >= goal) return "🎉 Goal reached!";

    if (!avgSaving || avgSaving <= 0)
      return "Not enough data to estimate yet";

    const monthsNeeded = (goal - balance) / avgSaving;
    const days = Math.round(monthsNeeded * 30);

    return `${days} days remaining at current pace`;
  }, [goal, balance, avgSaving]);

  // ---------------- Milestones ----------------
  useEffect(() => {
    if (!goal) return;
    if (!notify) return;

    const milestones = [25, 50, 75, 100];

    for (let m of milestones) {
      if (percent >= m && lastMilestone < m) {
        notify(`🎉 You reached ${m}% of your savings goal!`);
        setLastMilestone(m);
      }
    }
  }, [percent, goal, lastMilestone, notify]);

  // ---------------- Save Goal ----------------
  const saveGoal = () => {
    if (!input.trim()) {
      setGoal(0);
      saveData(KEY, 0);
      notify("Savings goal cleared");
      return;
    }

    const val = Number(input);
    if (isNaN(val) || val <= 0) {
      notify("Enter a valid positive amount");
      return;
    }

    setGoal(val);
    saveData(KEY, val);
    notify("Savings goal updated");
  };

  const handleBlur = () => {
    if (Number(input) !== goal) saveGoal();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border dark:border-gray-700">

      <h2 className="text-xl font-semibold mb-2">Savings Goal</h2>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Current Balance</p>
          <p className="text-xl font-bold">₹{balance}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Goal</p>
          <p className="text-xl font-bold">₹{goal || 0}</p>
        </div>
      </div>

      <div className="mt-3 w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          style={{ width: `${percent}%` }}
          className="h-3 bg-indigo-600 rounded-full transition-all"
        ></div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{daysLeft}</p>

      {avgSaving !== null && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Avg Monthly Saving: <strong>₹{Math.round(avgSaving)}</strong>
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter savings goal"
          className="flex-1 p-2 border rounded-lg bg-transparent dark:border-gray-700"
        />

        <button
          onClick={saveGoal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
