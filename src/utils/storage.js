// src/utils/storage.js
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

export const loadData = (key) => {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : null;
  } catch {
    return null;
  }
};

export const clearData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};
