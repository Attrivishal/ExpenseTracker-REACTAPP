import React from "react";

function Dashboard({ expenses, budget, dailyLimit }) {
  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const todayExpense = expenses
    .filter((e) => {
      const today = new Date().toISOString().split("T")[0];
      return e.date === today && e.type === "expense";
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const progress = Math.min((totalExpense / budget) * 100, 100);
  const dailyProgress = Math.min((todayExpense / dailyLimit) * 100, 100);

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold tracking-tight">Monthly Report</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="p-5 bg-white/30 dark:bg-gray-900/40 rounded-2xl shadow-lg backdrop-blur-xl">
          <p className="text-gray-600 dark:text-gray-400">Total Balance</p>
          <h3 className="text-3xl font-bold">₹{income - totalExpense}</h3>
        </div>

        <div className="p-5 bg-green-100 dark:bg-green-900/40 rounded-2xl shadow-lg">
          <p className="text-gray-600 dark:text-gray-300">Income</p>
          <h3 className="text-3xl font-bold text-green-600">₹{income}</h3>
        </div>

        <div className="p-5 bg-red-100 dark:bg-red-900/40 rounded-2xl shadow-lg">
          <p className="text-gray-600 dark:text-gray-300">Expenses</p>
          <h3 className="text-3xl font-bold text-red-500">₹{totalExpense}</h3>
        </div>

      </div>

      {/* Budget Progress */}
      <div className="bg-white/30 dark:bg-gray-900/30 p-5 rounded-xl shadow-xl backdrop-blur-xl">
        <p className="font-semibold mb-1">Monthly Budget: ₹{budget}</p>

        <div className="w-full h-4 bg-gray-300/40 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {totalExpense > budget && (
          <p className="text-red-600 mt-2 font-semibold flex items-center gap-2">
            ⚠ You exceeded your monthly budget!
          </p>
        )}
      </div>

      {/* Daily Limit */}
      <div className="bg-white/30 dark:bg-gray-900/30 p-5 rounded-xl shadow-xl backdrop-blur-xl">
        <p className="font-semibold mb-1">Daily Limit: ₹{dailyLimit}</p>

        <div className="w-full h-4 bg-gray-300/40 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
            style={{ width: `${dailyProgress}%` }}
          />
        </div>

        {todayExpense > dailyLimit && (
          <p className="text-red-500 mt-2 font-semibold">⚠ Today’s limit exceeded!</p>
        )}
      </div>

      {/* Smart Suggestions */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold">💡 Smart Suggestions</h3>

        {totalExpense > budget && (
          <p className="text-sm text-red-500">• Reduce unnecessary shopping this week.</p>
        )}

        {todayExpense > dailyLimit && (
          <p className="text-sm text-red-600">• Today's spending is high. Try reducing food/travel costs.</p>
        )}

        {income - totalExpense > 3000 && (
          <p className="text-sm text-green-600">
            • You saved well this month! Consider putting ₹1000 into savings.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
