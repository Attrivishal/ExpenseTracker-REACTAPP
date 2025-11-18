// src/utils/autoCategorize.js
const keywords = {
  Food: ["zomato", "swiggy", "restaurant", "grocery", "shop", "cafe", "food"],
  Travel: ["uber", "ola", "taxi", "bus", "train", "flight", "cab", "travel"],
  Shopping: ["amazon", "flipkart", "shoes", "shirt", "shopping", "mall"],
  Bills: ["electricity", "water", "phone", "recharge", "bill", "rent"],
  Education: ["course", "udemy", "coursera", "books", "college"],
  Entertainment: ["netflix", "hotstar", "spotify", "movie"],
};

export function autoCategorize(title = "") {
  const t = (title || "").toLowerCase();
  for (const [cat, arr] of Object.entries(keywords)) {
    for (const w of arr) {
      if (t.includes(w)) return cat;
    }
  }
  return "Other";
}
