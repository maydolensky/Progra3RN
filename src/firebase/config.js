import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCxB05UcvyV3yZHMVixO3DBx8RF7FqMUwI",
  authDomain: "vintagefashion-fc27e.firebaseapp.com",
  projectId: "vintagefashion-fc27e",
  storageBucket: "vintagefashion-fc27e.firebasestorage.app",
  messagingSenderId: "115497568319",
  appId: "1:115497568319:web:dfcfe809048178cbd4508a",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
