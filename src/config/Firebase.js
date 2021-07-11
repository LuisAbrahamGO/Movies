import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDLUvSWdzCV0RPfA9POw6oOzwhpXQlgU3g",
    authDomain: "reto-js-c4a6f.firebaseapp.com",
    projectId: "reto-js-c4a6f",
    storageBucket: "reto-js-c4a6f.appspot.com",
    messagingSenderId: "195208048448",
    appId: "1:195208048448:web:c7e2e0b3a54a645e7bd4a5"
  };

  export default firebase.initializeApp(firebaseConfig);