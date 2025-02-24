import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3C3aZdufeiEo6uiSwwT_BgcXw3O4pP-E",
  authDomain: "triptact-97fcb.firebaseapp.com",
  projectId: "triptact-97fcb",
  storageBucket: "triptact-97fcb.firebasestorage.app",
  messagingSenderId: "1078224889807",
  appId: "1:1078224889807:web:648e76af3419b280b594ba",
  measurementId: "G-SSRD596D3E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);