import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNYPCUpG0fKUzrjuKrLeU89dAKsXOAAv0",

  authDomain: "music-9300b.firebaseapp.com",

  projectId: "music-9300b",

  storageBucket: "music-9300b.appspot.com",

  appId: "1:50957642774:web:1a9687bd39dc539cfb9937",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
