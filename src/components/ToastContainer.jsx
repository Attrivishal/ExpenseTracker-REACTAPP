import React from "react";

export default function ToastContainer({ toasts }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            color: "white",
            minWidth: "220px",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            animation: "slideIn 0.3s ease",
            background:
              toast.type === "success"
                ? "#2ecc71"
                : toast.type === "error"
                ? "#e74c3c"
                : toast.type === "warning"
                ? "#f39c12"
                : "#3498db",
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
