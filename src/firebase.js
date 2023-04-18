import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6hQkbSegrci4KgfAw-ZKRCDco8vb4gYI",
  authDomain: "railways-6f819.firebaseapp.com",
  projectId: "railways-6f819",
  storageBucket: "railways-6f819.appspot.com",
  messagingSenderId: "235530137036",
  appId: "1:235530137036:web:75d01747af923a5275c169",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
