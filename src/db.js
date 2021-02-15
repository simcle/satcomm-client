import firebase from 'firebase/app'
import 'firebase/database'
const fbs = firebase.initializeApp({
    apiKey: "AIzaSyA-kS2nGwgRccbD4En8MxkaN7aJUHo7nXA",
    authDomain: "probest-763de.firebaseapp.com",
    databaseURL: "https://probest-763de-default-rtdb.firebaseio.com",
    projectId: "probest-763de",
    storageBucket: "probest-763de.appspot.com",
    messagingSenderId: "178513719866",
    appId: "1:178513719866:web:81338992b50004bbe97b03"
  });
  
  export const db = fbs.database()

