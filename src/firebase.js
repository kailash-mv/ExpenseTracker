import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDi8fx2KeRu6D4L8eHar_BC8LvSOXzwfuY",
  authDomain: "expensetracker-88c6b.firebaseapp.com",
  projectId: "expensetracker-88c6b",
  storageBucket: "expensetracker-88c6b.firebasestorage.app",
  messagingSenderId: "430536167969",
  appId: "1:430536167969:web:e854b88b5a4f94611e4960",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db);
const auth = getAuth(firebaseApp);

export { db, auth };
