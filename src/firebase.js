import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrXxiJ1qbxls7viFIKyg3mkSVbpVca57Y",
  authDomain: "newblurtl.firebaseapp.com",
  projectId: "newblurtl",
  storageBucket: "newblurtl.appspot.com",
  messagingSenderId: "296520545146",
  appId: "1:296520545146:web:1f8c4ec49e46a1c2dc1cc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
