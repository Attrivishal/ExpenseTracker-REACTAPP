import React from "react";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [hideAmounts, setHideAmounts] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Settings ⚙️
      </h1>

      {/* PROFILE SECTION */}
      <div className="bg-white dark:bg-gray-900 p-6 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Profile
        </h2>

        <div className="flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/120?img=13"
            alt="profile"
            className="w-16 h-16 rounded-xl object-cover shadow-sm"
          />
          <div>
            <p className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Vishal Attri
            </p>
            <p className="text-sm text-gray-500">Your Account</p>
          </div>
        </div>

        <button className="mt-4 text-indigo-600 hover:underline">
          Change Profile Photo
        </button>
      </div>

      {/* APPEARANCE SECTION */}
      <div className="bg-white dark:bg-gray-900 p-6 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Appearance 🎨
        </h2>

        {/* DARK MODE */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-800 dark:text-gray-200">Dark Mode</span>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable dark mode</span>
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        {/* Amount Visibility */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-800 dark:text-gray-200">
            Hide Amounts 🙈
          </span>
          <Switch
            checked={hideAmounts}
            onChange={setHideAmounts}
            className={`${
              hideAmounts ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Hide amounts</span>
            <span
              className={`${
                hideAmounts ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white dark:bg-gray-900 p-6 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Notifications 🔔
        </h2>

        <div className="flex justify-between items-center">
          <span className="text-gray-800 dark:text-gray-200">
            Daily Expense Reminder
          </span>

          <Switch
            checked={notifications}
            onChange={setNotifications}
            className={`${
              notifications ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                notifications ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* BACKUP & SYNC */}
      <div className="bg-white dark:bg-gray-900 p-6 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Backup & Sync 🔒
        </h2>

        <button className="w-full py-3 mb-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200">
          Export Data (CSV)
        </button>

        <button className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200">
          Import Data
        </button>
      </div>

      {/* ABOUT APP */}
      <div className="bg-white dark:bg-gray-900 p-6 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          About App ℹ️
        </h2>

        <p className="text-gray-700 dark:text-gray-300">
          Expense Tracker v1.0.3
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Made with ❤️ by Vishal Attri
        </p>
      </div>

    </div>
  );
}
