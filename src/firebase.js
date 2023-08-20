import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDUXbGDcWmQD5ZMgXoj8OgJ5xEv8799eZQ",
  authDomain: "mydoc-e8c15.firebaseapp.com",
  projectId: "mydoc-e8c15",
  storageBucket: "mydoc-e8c15.appspot.com",
  messagingSenderId: "868758806576",
  appId: "1:868758806576:web:1a2ac58a4b88772641cdf5",
  measurementId: "G-F0PV32Y7LJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
const provider = new firebase.auth.GoogleAuthProvider();

export {db , storage , auth , provider}