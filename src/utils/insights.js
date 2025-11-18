// src/utils/insights.js
export function monthKeyFromDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // e.g. 2025-11
}

// returns object { message, severity }
export function analyzeExpenses(expenses = []) {
  if (!expenses.length) return [{ message: "No data yet. Add your first expense!", severity: "info" }];

  // compute totals by category and month
  const totals = {};
  const monthTotals = {};
  expenses.forEach((e) => {
    const cat = e.category || "Other";
    totals[cat] = (totals[cat] || 0) + Number(e.amount || 0);

    const mk = monthKeyFromDate(e.date || new Date().toISOString());
    monthTotals[mk] = (monthTotals[mk] || 0) + Number(e.amount || 0);
  });

  // top category
  const topCategory = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

  // month change (last two months)
  const months = Object.keys(monthTotals).sort();
  let monthChange = null;
  if (months.length >= 2) {
    const last = monthTotals[months[months.length - 1]];
    const prev = monthTotals[months[months.length - 2]] || 0;
    const pct = prev === 0 ? 100 : Math.round(((last - prev) / prev) * 100);
    monthChange = { last, prev, pct };
  }

  const insights = [];

  if (topCategory) {
    insights.push({
      message: `Top spending category: ${topCategory[0]} (₹${topCategory[1]})`,
      severity: "info",
    });
  }

  if (monthChange) {
    const tone = monthChange.pct > 20 ? "warning" : "info";
    insights.push({
      message:
        monthChange.pct >= 0
          ? `This month spending is ${monthChange.pct}% higher than previous month.`
          : `Good — spending decreased ${Math.abs(monthChange.pct)}% vs previous month.`,
      severity: tone,
    });
  }

  // recommendations (simple)
  const recommendations = Object.entries(totals)
    .filter(([, v]) => v > 5000) // arbitrary large category
    .map(([cat, v]) => ({
      message: `Consider reducing ${cat} — you spent ₹${v}.`,
      severity: "suggestion",
    }));

  return [...insights, ...recommendations];
}
