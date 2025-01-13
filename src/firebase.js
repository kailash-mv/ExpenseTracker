import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGi3cZfR5fDB7HNSmN1-XI46dpclem0lE",
  authDomain: "linkedinclone-a1eb9.firebaseapp.com",
  projectId: "linkedinclone-a1eb9",
  storageBucket: "linkedinclone-a1eb9.firebasestorage.app",
  messagingSenderId: "990467283662",
  appId: "1:990467283662:web:86d203dd99b5018b124e9f",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db);
const auth = getAuth(firebaseApp);

export { db, auth };
