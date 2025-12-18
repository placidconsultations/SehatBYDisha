import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB9Np_OH6DlaDihIy9-2UBRirNN7mrmGfU",
//   authDomain: "dietition-f64d9.firebaseapp.com",
//   projectId: "dietition-f64d9",
//   storageBucket: "dietition-f64d9.firebasestorage.app",
//   messagingSenderId: "853320152362",
//   appId: "1:853320152362:web:634695755855bab0b75a53"
// };

// Initialize Firebase
let app;
let db;
let storage;
let auth;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize services
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { db, storage, auth };
export default app;
