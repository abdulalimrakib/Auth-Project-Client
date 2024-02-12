// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "auth-app-53cac.firebaseapp.com",
  projectId: "auth-app-53cac",
  storageBucket: "auth-app-53cac.appspot.com",
  messagingSenderId: "798247597770",
  appId: "1:798247597770:web:c5899ab56a49552b9d6633"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

