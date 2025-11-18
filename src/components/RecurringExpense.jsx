// src/components/RecurringExpense.jsx
import React from "react";

export default function RecurringExpense({
  recurring,
  setRecurring,
  frequency,
  setFrequency,
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
        />
        <span className="text-sm">Repeat every month</span>
      </label>

      {recurring && (
        <div>
          <label className="text-sm block mb-1">Frequency</label>
          <select
            className="w-40 p-2 border rounded-lg"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      )}
    </div>
  );
}
