// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF7mKGCBVw7FuKyEjJQi2xQDnJuDd5zgg",
  authDomain: "guessthechamp-9bcf4.firebaseapp.com",
  projectId: "guessthechamp-9bcf4",
  storageBucket: "guessthechamp-9bcf4.appspot.com",
  messagingSenderId: "769372632114",
  appId: "1:769372632114:web:22a296e43510d98914f82b",
  measurementId: "G-QE6XJTJ7HQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
