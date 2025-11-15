// src/utils/autoCategorize.js
const keywords = {
  Food: ["zomato", "swiggy", "restaurant", "dine", "grocery", "grocer", "food"],
  Travel: ["uber", "ola", "taxi", "bus", "train", "flight", "metro"],
  Shopping: ["amazon", "flipkart", "paytm mall", "shopping", "mall"],
  Bills: ["electricity", "water", "phone", "recharge", "bill"],
  Education: ["course", "udemy", "coursera", "books", "stationary", "college"],
};

export function autoCategorize(title = "") {
  const t = title.toLowerCase();
  for (const [cat, arr] of Object.entries(keywords)) {
    for (const w of arr) if (t.includes(w)) return cat;
  }
  return "Other";
}
