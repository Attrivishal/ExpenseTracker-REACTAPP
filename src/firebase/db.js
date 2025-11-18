// src/firebase/db.js
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function collectionRef(name) {
  return collection(db, name);
}

export async function addItem(collectionName, data) {
  return addDoc(collectionRef(collectionName), data);
}

export async function setItem(collectionName, id, data) {
  return setDoc(doc(db, collectionName, id), data);
}

export function subscribeCollection(collectionName, cb) {
  const q = collectionRef(collectionName);
  return onSnapshot(q, (snap) => {
    const arr = [];
    snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
    cb(arr);
  });
}
