// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv0dOPQzi-KzNOaA-wmGwSgLBTMucku5M",
  authDomain: "pickeco-39e96.firebaseapp.com",
  databaseURL: "https://pickeco-39e96-default-rtdb.firebaseio.com",
  projectId: "pickeco-39e96",
  storageBucket: "pickeco-39e96.appspot.com",
  messagingSenderId: "1091911572374",
  appId: "1:1091911572374:web:937595dda311e3f553dbb7",
  measurementId: "G-C0952F75MR"
};

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);

const auth = getAuth(myApp)

const db = getFirestore(myApp);

export {db, auth};

