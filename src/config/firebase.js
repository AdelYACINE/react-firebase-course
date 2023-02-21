import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmrEUxGpGdztqQsLqeE0zdR8q9nKvB13o",
  authDomain: "fir-course-d911b.firebaseapp.com",
  projectId: "fir-course-d911b",
  storageBucket: "fir-course-d911b.appspot.com",
  messagingSenderId: "467128722675",
  appId: "1:467128722675:web:17602d7994d536b5b14386",
  measurementId: "G-1V2XJL6P10",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
