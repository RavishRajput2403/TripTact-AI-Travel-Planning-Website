import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3C3aZdufeiEo6uiSwwT_BgcXw3O4pP-E",
  authDomain: "triptact-97fcb.firebaseapp.com",
  projectId: "triptact-97fcb",
  storageBucket: "triptact-97fcb.appspot.com", // ✅ Fixed storage URL
  messagingSenderId: "1078224889807",
  appId: "1:1078224889807:web:648e76af3419b280b594ba",
  measurementId: "G-SSRD596D3E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Firebase Authentication (if needed)
export const auth = getAuth(app);
