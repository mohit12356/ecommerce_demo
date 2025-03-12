  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHQOuXj5vBQ3K-nvBjik7YSKFaUj3Yqkw",
  authDomain: "ecommerce-72ea4.firebaseapp.com",
  projectId: "ecommerce-72ea4",
  storageBucket: "ecommerce-72ea4.firebasestorage.app",
  messagingSenderId: "962498049893",
  appId: "1:962498049893:web:0ab9b034d4bf34c023938c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully:", res.user);
    return true;
  } catch (error) {
    console.log("Login error:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    return false;
  }
};
const logout = async (navigate) => {
  try {
    await signOut(auth); 
    toast.info("Logged out successfully"); 
    navigate("/login"); 
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Error logging out"); 
  }
};

    export { auth, db, login, signup, logout }; 
