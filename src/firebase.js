// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth from Firebase

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQl_Nnbj35BdzpvUAEmkjajDgAZ2o1maM",
  authDomain: "registration-form-d0053.firebaseapp.com",
  projectId: "registration-form-d0053",
  storageBucket: "registration-form-d0053.firebasestorage.app",
  messagingSenderId: "1013790319776",
  appId: "1:1013790319776:web:7a833dfbf1960cc38d15c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export auth so you can use it in other files
export { auth };