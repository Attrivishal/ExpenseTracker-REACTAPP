// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";

import Sidebar from "./components/Sidebarcomponent";
import Topbar from "./components/Topbar";

import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

import ExportButtons from "./components/ExportButtons";
import AddRecurring from "./components/AddRecurring";
import RecurringList from "./components/RecurringList";

import SavingsGoal from "./components/SavingsGoal";
import Notification from "./components/Notification";

import SettingsPage from "./components/SettingsPage";   // ⭐ NEW IMPORT

import { saveData, loadData, clearData } from "./utils/storage";
import { loadRecurring, processDueRecurrences, saveRecurring } from "./utils/recurring";

function App() {
  const [user, setUser] = useState(() => loadData("username") || null);
  const [profileImage, setProfileImage] = useState(() => loadData("profileImage") || null);
  const [expenses, setExpenses] = useState(() => loadData("expenses") || []);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => loadData("collapsed") || false);
  const [theme, setTheme] = useState(() => loadData("theme") || "light");

  const [recurring, setRecurring] = useState(() => loadRecurring());
  const [budget, setBudget] = useState(() => loadData("budget") || 5000);

  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3500);
  };

  useEffect(() => saveData("expenses", expenses), [expenses]);
  useEffect(() => saveData("budget", budget), [budget]);
  useEffect(() => saveData("profileImage", profileImage), [profileImage]);
  useEffect(() => saveData("collapsed", collapsed), [collapsed]);
  useEffect(() => saveData("theme", theme), [theme]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const rec = loadRecurring();
    if (!rec || rec.length === 0) { setRecurring([]); return; }
    const { newExpenses, updatedRecurring } = processDueRecurrences(expenses, rec);
    if (newExpenses.length !== expenses.length) setExpenses(newExpenses);
    setRecurring(updatedRecurring);
    saveRecurring(updatedRecurring);
  }, []);

  const handleLogin = (name) => {
    setUser(name);
    saveData("username", name);
    showNotification("Logged in successfully!", "success");
  };

  const handleLogout = () => {
    setUser(null);
    clearData("username");
    showNotification("You have logged out", "info");
  };

  const addExpense = (item) => {
    setExpenses(prev => [item, ...prev]);
    showNotification(item.type === "income" ? "Income added" : "Expense added", "success");
    setActive("dashboard");
    setMobileOpen(false);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(p => p.id !== id));
    showNotification("Expense deleted", "danger");
  };

  const editExpense = (item) => {
    const title = prompt("Edit title", item.title);
    if (title === null) return;
    const amount = prompt("Edit amount", item.amount);
    if (amount === null) return;
    setExpenses(prev => prev.map(p => (p.id === item.id ? { ...p, title, amount: Number(amount) } : p)));
    showNotification("Expense updated", "info");
  };

  const addRecurringHandler = (list) => {
    setRecurring(list);
    saveRecurring(list);
    showNotification("Recurring list updated!", "success");
  };

  const summary = useMemo(() => {
    const income = expenses.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
    const spent = expenses.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0);
    return { income, spent, balance: income - spent };
  }, [expenses]);

  if (!user) return <Login onLogin={handleLogin} />;

  const mdPaddingLeft = collapsed ? "md:pl-20" : "md:pl-72";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Sidebar */}
      <Sidebar
        user={user}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        active={active}
        setActive={setActive}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        theme={theme}
      />

      {/* Topbar */}
      <Topbar
        user={user}
        profileImage={profileImage}
        summary={summary}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        theme={theme}
        toggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
      />

      {/* Content */}
      <main className={`pt-20 md:pt-24 ${mdPaddingLeft} transition-all`}>
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

          {active === "dashboard" && (
            <Dashboard expenses={expenses} budget={budget} notify={showNotification} />
          )}

          {active === "add" && <AddExpense onAdd={addExpense} />}

          {active === "recurring" && (
            <div className="space-y-6">
              <AddRecurring onAddRecurring={addRecurringHandler} />
              <RecurringList onUpdated={addRecurringHandler} />
            </div>
          )}

          {active === "reports" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Reports</h2>
                <ExportButtons expenses={expenses} user={user} />
              </div>
              <ExpenseList expenses={expenses} onDelete={deleteExpense} onEdit={editExpense} />
            </div>
          )}

          {active === "savings" && (
            <SavingsGoal expenses={expenses} budget={budget} balance={summary.balance} notify={showNotification} />
          )}

          {/* ⭐ NEW SETTINGS PAGE */}
          {active === "settings" && (
            <SettingsPage
              user={user}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              theme={theme}
              setTheme={setTheme}
              budget={budget}
              setBudget={setBudget}
              notify={showNotification}
            />
          )}

        </div>
      </main>

      <Notification notifications={notifications} />
    </div>
  );
}

export default App;
