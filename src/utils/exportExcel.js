import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (expenses) => {
  if (!expenses || !expenses.length) return;
  const worksheet = XLSX.utils.json_to_sheet(expenses);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, "Expenses");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }), "Expense_Report.xlsx");
};
