import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // <-- Removed getDoc
import { getFirestore, setLogLevel, doc, setDoc, getDoc } from "firebase/firestore"; // <-- Added getDoc HERE
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEBAl0wIQKAyEx3muIpoCAS9D595hu_00",
  authDomain: "quiz-game-a6d07.firebaseapp.com",
  projectId: "quiz-game-a6d07",
  storageBucket: "quiz-game-a6d07.firebasestorage.app",
  messagingSenderId: "233419894969",
  appId: "1:233419894969:web:5b3a4d58fbafd786396b68",
  measurementId: "G-QMSJ6QB66N"
};

// Initialize Firebase
const appId = "1:233419894969:web:5b3a4d58fbafd786396b68"; // Using your appId
export const usersCollectionPath = `artifacts/${appId}/public/data/users`;

let app, auth, db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    setLogLevel('Debug');
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Export the services and helpers
export { app, auth, db, GoogleAuthProvider, signInWithPopup, getDoc, doc, setDoc };