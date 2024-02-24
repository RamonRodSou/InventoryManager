import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


let firebaseConfig = {
    apiKey: "AIzaSyDsQYGCDWY8sL19YLNBqP5UbbJMkCHInqw",
    authDomain: "gerente-5ccc4.firebaseapp.com",
    projectId: "gerente-5ccc4",
    storageBucket: "gerente-5ccc4.appspot.com",
    messagingSenderId: "724763256609",
    appId: "1:724763256609:web:b023858621cfc231728060",
    measurementId: "G-X30WLLDTWE"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase