import React, { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebarcomponent";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExportButtons from "./components/ExportButtons";
import { saveData, loadData, clearData } from "./utils/storage";

function App() {
  const [user, setUser] = useState(() => loadData("username") || null);
  const [expenses, setExpenses] = useState(() => loadData("expenses") || []);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Student Budget (default: ₹5000)
  const [budget, setBudget] = useState(() => loadData("budget") || 5000);

  // Save data anytime budget or expenses change
  useEffect(() => saveData("expenses", expenses), [expenses]);
  useEffect(() => saveData("budget", budget), [budget]);

  const handleLogin = (name) => {
    setUser(name);
    saveData("username", name);
  };

  const handleLogout = () => {
    setUser(null);
    clearData("username");
  };

  // Add new expense or income
  const addExpense = (item) => {
    setExpenses((prev) => [item, ...prev]);
    setActive("dashboard");
    setMobileOpen(false);
  };

  const deleteExpense = (id) =>
    setExpenses((prev) => prev.filter((p) => p.id !== id));

  const editExpense = (item) => {
    const title = prompt("Edit title", item.title);
    if (title === null) return;

    const amount = prompt("Edit amount", item.amount);
    if (amount === null) return;

    setExpenses((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, title, amount: Number(amount) } : p
      )
    );
  };

  // Summary calculations
  const summary = useMemo(() => {
    const income = expenses
      .filter((e) => e.type === "income")
      .reduce((s, e) => s + e.amount, 0);

    const spent = expenses
      .filter((e) => e.type === "expense")
      .reduce((s, e) => s + e.amount, 0);

    return { income, spent, balance: income - spent };
  }, [expenses]);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-shell min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          user={user}
          active={active}
          setActive={(id) => {
            setActive(id);
            setMobileOpen(false);
          }}
          onLogout={handleLogout}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* MAIN UI */}
        <div className="flex-1 min-h-screen">
          <Topbar
            user={user}
            summary={summary}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <main className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="space-y-6">

              {/* DASHBOARD */}
              {active === "dashboard" && (
                <Dashboard expenses={expenses} budget={budget} />
              )}

              {/* ADD NEW */}
              {active === "add" && <AddExpense onAdd={addExpense} />}

              {/* REPORTS */}
              {active === "reports" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="h2">Reports</h2>
                    <ExportButtons expenses={expenses} user={user} />
                  </div>

                  <ExpenseList
                    expenses={expenses}
                    onDelete={deleteExpense}
                    onEdit={editExpense}
                  />
                </div>
              )}

              {/* SETTINGS */}
              {active === "settings" && (
                <div className="clean-card p-6 layered">
                  <h2 className="h2">Settings</h2>

                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">Your Monthly Budget</p>

                    <input
                      type="number"
                      className="mt-2 p-2 border rounded-lg w-40"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                  </div>

                  <button
                    className="btn btn-primary mt-6"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
