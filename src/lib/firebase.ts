
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "bairroconecta",
  "appId": "1:111994468272:web:e8049c58a8b70f01024875",
  "storageBucket": "bairroconecta.appspot.com",
  "apiKey": "AIzaSyDtjbzROM6vVAOAcJB7xgGlnGHIgbDtNaI",
  "authDomain": "bairroconecta.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "111994468272"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);


export { app, db, auth, googleProvider, storage };
