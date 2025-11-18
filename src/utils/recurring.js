// src/utils/recurring.js
import { saveData, loadData } from "./storage";

/*
 Recurrence object shape:
 {
   id: number,
   title: string,
   amount: number,
   type: "expense" | "income",
   category: string,
   frequency: "daily" | "weekly" | "monthly",
   nextDate: "2025-11-17T00:00:00.000Z" (ISO string)
 }
*/

const FREQUENCY_MS = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: "monthly", // special handling
};

export const loadRecurring = () => loadData("recurring") || [];
export const saveRecurring = (list) => saveData("recurring", list);

/**
 * Advance a date by frequency (returns new ISO string)
 */
function advanceDate(iso, freq) {
  const d = new Date(iso);
  if (freq === "monthly") {
    // add one month preserving day where possible
    const newMonth = d.getMonth() + 1;
    const nd = new Date(d);
    nd.setMonth(newMonth);
    // if month overflowed and day decreased, it's okay (Date handles)
    return nd.toISOString();
  } else {
    const ms = FREQUENCY_MS[freq];
    return new Date(d.getTime() + ms).toISOString();
  }
}

/**
 * Process due recurring items.
 * - If an item's nextDate <= today, create one or more generated entries up to today.
 * - Returns { newExpenses, updatedRecurring }.
 */
export function processDueRecurrences(expenses = [], recurringList = []) {
  const today = new Date();
  const newExpenses = [...expenses];
  const updatedRecurring = recurringList.map((r) => ({ ...r })); // copy

  updatedRecurring.forEach((r) => {
    // ensure valid date
    if (!r.nextDate) return;
    let next = new Date(r.nextDate);

    // if next is in the past or today, generate entries until next > today.
    // to be safe, cap iterations to 12 (avoid infinite loop).
    let guard = 0;
    while (next <= today && guard < 24) {
      const gen = {
        id: Date.now() + Math.floor(Math.random() * 10000),
        title: r.title,
        amount: Number(r.amount),
        type: r.type || "expense",
        category: r.category || "Other",
        date: next.toISOString(),
        recurringId: r.id,
      };
      newExpenses.unshift(gen);

      // advance
      const nextIso = advanceDate(next.toISOString(), r.frequency || "monthly");
      next = new Date(nextIso);
      guard++;
    }

    // set new nextDate on r
    r.nextDate = next.toISOString();
  });

  // persist recurring (callers should persist expenses too)
  saveRecurring(updatedRecurring);
  return { newExpenses, updatedRecurring };
}
