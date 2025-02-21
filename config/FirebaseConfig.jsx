// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbrpcPiuB-HKfZ6lpf-VNnyKguALKwVmk",
  authDomain: "react-native-phase-1.firebaseapp.com",
  projectId: "react-native-phase-1",
  storageBucket: "react-native-phase-1.firebasestorage.app",
  messagingSenderId: "654950377113",
  appId: "1:654950377113:web:a26a3c9a6f27a0a395ba08",
  measurementId: "G-WMXRWH6C17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);