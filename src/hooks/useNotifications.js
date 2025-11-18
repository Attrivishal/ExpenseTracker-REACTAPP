// src/hooks/useNotifications.js
import { useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "success", ttl = 3000) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, ttl);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, showNotification, removeNotification };
}
