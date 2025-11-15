import jsPDF from "jspdf";

export const exportPDF = (expenses, username = "User") => {
  const doc = new jsPDF({ unit: "pt" });

  doc.setFontSize(18);
  doc.text(`${username} — Expense Report`, 40, 40);

  doc.setFontSize(12);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN") : "N/A";

  const pad = (txt, width) => String(txt).padEnd(width, " ");

  let y = 80;

  const chunk = (arr, n) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) {
      out.push(arr.slice(i, i + n));
    }
    return out;
  };

  const pages = chunk(expenses, 30);

  pages.forEach((page, pageIndex) => {
    page.forEach((e, i) => {
      const line = `${String(i + 1 + pageIndex * 30).padEnd(3)}  ${pad(
        e.title,
        20
      )}  |  ₹${pad(e.amount, 8)}  |  ${pad(e.category, 10)}  |  ${formatDate(
        e.date
      )}`;

      doc.text(line, 40, y);
      y += 18;

      if (y > 740) {
        doc.addPage();
        y = 40;
      }
    });
  });

  doc.save("Expense_Report.pdf");
};
