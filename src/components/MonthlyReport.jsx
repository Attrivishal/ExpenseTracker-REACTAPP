import React from "react";

export default function MonthlyReport({ expenses }) {
  const total = expenses.reduce((s,e) => s + e.amount, 0);
  const income = expenses.filter(e=>e.amount>0).reduce((s,e)=>s+e.amount,0);
  const expense = expenses.filter(e=>e.amount<0).reduce((s,e)=>s+Math.abs(e.amount),0);

  return (
    <div className="app-card">
      <h3 className="text-lg font-semibold mb-3">Monthly Report</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-xl font-bold">₹{total}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Income</div>
          <div className="text-xl font-bold text-green-600">₹{income}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Expenses</div>
          <div className="text-xl font-bold text-red-500">₹{expense}</div>
        </div>
      </div>

      <div className="mt-4 h-1 bg-gradient-to-r from-indigo-400 to-indigo-200 rounded-full" />
    </div>
  );
}
