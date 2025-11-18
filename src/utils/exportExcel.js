// src/utils/exportExcel.js
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (expenses = []) => {
  const rows = expenses.map((e) => ({
    Title: e.title,
    Amount: e.amount,
    Type: e.type,
    Category: e.category,
    Date: new Date(e.date).toLocaleString(),
    Recurring: e.recurring ? e.recurring.recurrence : "",
  }));

  const ws = utils.json_to_sheet(rows);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Expenses");
  const wbout = write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "expenses.xlsx");
};
