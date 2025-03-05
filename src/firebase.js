import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
  // apiKey: "AIzaSyDqX52pmPEJkC5QHT9qed6Xdz70drqnWQI",
  // authDomain: "dev209henry.firebaseapp.com",
  // projectId: "dev209henry",
  // storageBucket: "dev209henry.firebasestorage.app",
  // messagingSenderId: "393685476888",
  // appId: "1:393685476888:web:e7632432481f30f3a7856d",
  // measurementId: "G-1SFEY5VDYH"
// };
// 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    
};




// ✅ Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Debugging: Check if Firebase is initialized correctly
console.log("Firebase initialized:", app.name);

export { app, auth, db };