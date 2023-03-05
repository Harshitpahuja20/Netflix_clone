import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlJb5yYXjvFTJmxuoR3aLzi0WnnfIsFls",
  authDomain: "netflix-76207.firebaseapp.com",
  projectId: "netflix-76207",
  storageBucket: "netflix-76207.appspot.com",
  messagingSenderId: "882663702447",
  appId: "1:882663702447:web:7fb11a313f9fadf0b2395a",
  measurementId: "G-SP91TPVX5N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireBaseauth = getAuth(app);
