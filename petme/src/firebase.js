// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6A7R-sYN58FJaw7hb_VoV1D6p6pw2itw",
  authDomain: "petme-35304.firebaseapp.com",
  projectId: "petme-35304",
  storageBucket: "petme-35304.firebasestorage.app",
  messagingSenderId: "1059306249322",
  appId: "1:1059306249322:web:92b7ff2786f28a5abafe13",
  measurementId: "G-3JGSDFQFFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth and Firestore instances to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
