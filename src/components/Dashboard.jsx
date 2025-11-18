// src/components/Dashboard.jsx
import React, { useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { loadData } from "../utils/storage";
import RecurringModal from "./RecurringModal";
import SavingsGoal from "./SavingsGoal";
import SavingsWidget from "./SavingsWidget";

const COLORS = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#60A5FA"];

export default function Dashboard({ expenses = [], budget = 5000, notify = () => {} }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // calculations
  const income = useMemo(() => expenses.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0), [expenses]);
  const spent = useMemo(() => expenses.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0), [expenses]);
  const balance = income - spent;
  const progress = Math.min((spent / (budget || 1)) * 100, 100);

  // by category
  const byCategory = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (e.type !== "expense") return;
      const cat = e.category || "Other";
      map[cat] = (map[cat] || 0) + e.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  // monthly trend
  const trend = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      const d = new Date(e.date);
      if (isNaN(d)) return;
      const key = `${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
      if (!map[key]) map[key] = { month: key, income: 0, expense: 0 };
      if (e.type === "income") map[key].income += e.amount;
      else map[key].expense += e.amount;
    });
    return Object.values(map).slice(-6);
  }, [expenses]);

  const recent = [...expenses].slice(0, 6);

  // upcoming recurring preview
  const upcoming = useMemo(() => {
    const rec = loadData("recurringItems") || [];
    const sorted = (Array.isArray(rec) ? rec : [])
      .map(r => ({ ...r, nextDateObj: r.nextDate ? new Date(r.nextDate) : new Date(0) }))
      .sort((a, b) => (a.nextDateObj || 0) - (b.nextDateObj || 0))
      .slice(0, 3);
    return sorted;
  }, [refreshKey, expenses]);

  const recurringChanged = () => setRefreshKey(k => k + 1);

  return (
    <div className="space-y-6">
      <RecurringModal open={modalOpen} onClose={() => setModalOpen(false)} onChanged={recurringChanged} />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-extrabold">Monthly Report</h1>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-white to-indigo-50 shadow-lg">
              <div className="text-sm text-gray-500">Total Balance</div>
              <div className="mt-2 text-2xl font-bold">₹{balance}</div>
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-br from-green-50 to-white shadow-lg">
              <div className="text-sm text-gray-500">Income</div>
              <div className="mt-2 text-2xl font-bold text-green-600">₹{income}</div>
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-br from-red-50 to-white shadow-lg">
              <div className="text-sm text-gray-500">Expenses</div>
              <div className="mt-2 text-2xl font-bold text-red-500">₹{spent}</div>
            </div>
          </div>

          {/* Budget bar */}
          <div className="rounded-2xl p-5 bg-white shadow-lg">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Monthly Budget: ₹{budget}</div>
              <div className="text-sm text-gray-500">{Math.round(progress)}%</div>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            {spent > budget && <div className="mt-3 text-red-600 font-medium">⚠ You exceeded your monthly budget.</div>}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl p-5 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">Category Breakdown</div>
                <div className="text-sm text-gray-500">Expenses only</div>
              </div>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={4}>
                      {byCategory.map((entry, idx) => <Cell key={entry.name || idx} fill={COLORS[idx % COLORS.length]} />)}
                    </Pie>
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white shadow-lg">
              <div className="font-semibold mb-3">Monthly Trend</div>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RTooltip />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* --- Middle: Savings Widget (chosen placement B) --- */}
      

          {/* Recent Transactions */}
          <div className="rounded-2xl p-5 bg-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Recent Transactions</div>
              <div className="text-sm text-gray-500">{recent.length} items</div>
            </div>

            <div className="space-y-3">
              {recent.length === 0 && <div className="text-gray-500">No transactions yet</div>}
              {recent.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700">
                      {r.title?.[0]?.toUpperCase() || "–"}
                    </div>
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-gray-400">{r.category} • {new Date(r.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${r.type === "income" ? "text-green-600" : "text-red-500"}`}>₹{r.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT column: full SavingsGoal + upcoming recurring */}
        <aside className="w-full lg:w-80 space-y-5">
          <SavingsGoal balance={balance} expenses={expenses} budget={budget} notify={notify} />

          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Upcoming Recurring</h3>
              <button onClick={() => setModalOpen(true)} className="text-xs text-indigo-600">Manage</button>
            </div>

            {upcoming.length === 0 && <div className="text-gray-500">No recurring items</div>}
            <div className="space-y-2">
              {upcoming.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <div>
                    <div className="font-medium">{u.title}</div>
                    <div className="text-xs text-gray-500">{u.frequency} • {u.category}</div>
                  </div>
                  <div className="text-sm text-gray-700">{u.nextDate ? new Date(u.nextDate).toLocaleDateString() : "—"}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
