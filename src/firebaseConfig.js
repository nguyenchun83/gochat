// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD04mBWO777NCjH-ZzCH9j4e40Yl23RTJA",
  authDomain: "gochat-656f6.firebaseapp.com",
  projectId: "gochat-656f6",
  storageBucket: "gochat-656f6.firebasestorage.app",
  messagingSenderId: "618264942223",
  appId: "1:618264942223:web:616c3bcbe38462a5f9c2fa",
  measurementId: "G-M83SETTYPB"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
