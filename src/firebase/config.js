// src/firebase/config.js
// Replace values with your Firebase project's config; in production use .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "REPLACE_ME",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "REPLACE_ME",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "REPLACE_ME",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "REPLACE_ME",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "REPLACE_ME",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "REPLACE_ME",
};

export default firebaseConfig;
