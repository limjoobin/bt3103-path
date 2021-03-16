import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCr1BKnQWxiUKqC8_vKhpZWmTNUSkZq1mA",
    authDomain: "bt3103-week-6-aa291.firebaseapp.com",
    projectId: "bt3103-week-6-aa291",
    storageBucket: "bt3103-week-6-aa291.appspot.com",
    messagingSenderId: "395101407150",
    appId: "1:395101407150:web:c8faabc99508094969aa3f",
    measurementId: "G-4S9NEQ0JQ2"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;