// src/components/ExportButtons.jsx
import React from "react";
import { exportPDF } from "../utils/exportPDF";
import { exportExcel } from "../utils/exportExcel";

export default function ExportButtons({ expenses = [], user = "User" }) {
  return (
    <div className="flex gap-3">
      <button onClick={() => exportPDF(expenses, user)} className="px-4 py-2 bg-red-500 text-white rounded-md">Export PDF</button>
      <button onClick={() => exportExcel(expenses)} className="px-4 py-2 bg-green-600 text-white rounded-md">Export Excel</button>
    </div>
  );
}
