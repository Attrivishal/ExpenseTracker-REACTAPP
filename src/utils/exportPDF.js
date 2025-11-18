// src/utils/exportPDF.js
import jsPDF from "jspdf";

export const exportPDF = (expenses = [], username = "User") => {
  const doc = new jsPDF({ unit: "pt" });
  doc.setFontSize(18);
  doc.text(`${username} — Expense Report`, 40, 40);
  doc.setFontSize(12);

  let y = 70;
  const perPage = 30;
  for (let p = 0; p < Math.ceil(expenses.length / perPage); p++) {
    const page = expenses.slice(p * perPage, (p + 1) * perPage);
    page.forEach((e, i) => {
      const line = `${p * perPage + i + 1}. ${e.title} | ₹${e.amount} | ${e.category} | ${new Date(e.date).toLocaleDateString()}`;
      doc.text(line, 40, y);
      y += 18;
      if (y > 740) y = 40;
    });
    if (p < Math.ceil(expenses.length / perPage) - 1) {
      doc.addPage();
      y = 70;
    }
  }
  doc.save("Expense_Report.pdf");
};
