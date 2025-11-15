import React from "react";

function CategoryFilter({ setCategory }) {
  return (
    <div className="mb-6">
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
