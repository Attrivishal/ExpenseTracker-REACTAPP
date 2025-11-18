// src/firebase/auth.js
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export function getAuthInstance() {
  return auth;
}
