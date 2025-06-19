// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi6rlHXXpBI6LA36a2xi4671HkdARlSiU",
  authDomain: "password-manager-19a93.firebaseapp.com",
  projectId: "password-manager-19a93",
  storageBucket: "password-manager-19a93.firebasestorage.app",
  messagingSenderId: "1057465149523",
  appId: "1:1057465149523:web:09be009ce80ea1f44e3ea6",
  measurementId: "G-M5J629LYVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);