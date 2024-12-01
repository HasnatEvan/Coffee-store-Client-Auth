// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmCPDZyResMumDdzPMvEMZ6nNHCj0Y8AE",
  authDomain: "coffee-store-f7ef5.firebaseapp.com",
  projectId: "coffee-store-f7ef5",
  storageBucket: "coffee-store-f7ef5.firebasestorage.app",
  messagingSenderId: "582768113001",
  appId: "1:582768113001:web:9613c0638e4903c5bef9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);