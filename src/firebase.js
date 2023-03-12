import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA-FPYTRx6qiTfad7ZLZbgtmc2Otb-SFo",
  authDomain: "test2-47cb2.firebaseapp.com",
  projectId: "test2-47cb2",
  storageBucket: "test2-47cb2.appspot.com",
  messagingSenderId: "269431445201",
  appId: "1:269431445201:web:8769d209dbed7ead0097f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
