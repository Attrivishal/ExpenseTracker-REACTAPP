import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ChartComponent({ expenses }) {
  const grouped = expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {});
  const data = Object.keys(grouped).map(k => ({ category: k, amount: grouped[k] }));

  return (
    <div className="app-card">
      <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
      <div style={{width:"100%", height:300}}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="category" tick={{fill:"#6B7280"}}/>
            <YAxis tick={{fill:"#6B7280"}}/>
            <Tooltip wrapperStyle={{background:"#111827", color:"#fff", borderRadius:8, padding:8}}/>
            <Bar dataKey="amount" fill="url(#grad)" radius={[8,8,0,0]}>
              {/* optional gradient */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
