// Import required Firebase modules
import { initializeApp, getApps } from "firebase/app"; // Initialize Firebase app
import { getAuth } from "firebase/auth"; // Firebase authentication
import { getFirestore } from "firebase/firestore"; // Firestore database

// Firebase configuration object (uses environment variables for security)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,  
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,  
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase app (prevents duplicate instances)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Firebase authentication and Firestore database
const auth = getAuth(app); // Setup authentication service
const db = getFirestore(app); // Setup Firestore database

// Log Firebase initialization for debugging purposes
console.log("Firebase initialized:", app.name);

// Export Firebase services to use in other components
export { auth, db };
