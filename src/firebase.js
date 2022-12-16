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
  apiKey: "InsertAPIKeyHere",
  authDomain: "quiddler-9260e.firebaseapp.com",
  projectId: "quiddler-9260e",
  storageBucket: "quiddler-9260e.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
