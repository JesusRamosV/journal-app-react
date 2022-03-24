import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";
// import {GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBB26x8kcINyIE1XSc3d_IhIucYmLUuW4g",
    authDomain: "react-app-cursos-6af0a.firebaseapp.com",
    projectId: "react-app-cursos-6af0a",
    storageBucket: "react-app-cursos-6af0a.appspot.com",
    messagingSenderId: "558176130395",
    appId: "1:558176130395:web:38937e43e3dd4b930d367e"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }