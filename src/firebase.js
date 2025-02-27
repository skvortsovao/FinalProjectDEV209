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
  apiKey: "AIzaSyACABK-Fo-w1eCvd0h3-PSoxqt21adMq-E",
  authDomain: "registration-f248f.firebaseapp.com",
  projectId: "registration-f248f",
  storageBucket: "registration-f248f.firebasestorage.app",
  messagingSenderId: "844721791675",
  appId: "1:844721791675:web:fad58b18b78e1f3a3d7f9e",
  measurementId: "G-5GFW4ZQQPH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);