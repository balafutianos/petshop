// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,   // <-- ΑΠΑΡΑΙΤΗΤΟ
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6A7R-sYN58FJaw7hb_VoV1D6p6pw2itw",
  authDomain: "petme-35304.firebaseapp.com",
  projectId: "petme-35304",
  storageBucket: "petme-35304.firebasestorage.app",
  messagingSenderId: "1059306249322",
  appId: "1:1059306249322:web:92b7ff2786f28a5abafe13",
  measurementId: "G-3JGSDFQFFR",
};

const app = initializeApp(firebaseConfig);

// Exports για όλη την εφαρμογή
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// (προαιρετικό αλλά καλό) επιμονή session στον browser
setPersistence(auth, browserLocalPersistence);

// 👇 το ζητούμενο export
export const googleProvider = new GoogleAuthProvider();

export default app;
