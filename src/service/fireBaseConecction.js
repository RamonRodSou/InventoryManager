import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCcQHxMZUZAAfC-o5GP08Cb-xl8-9XiT28",
    authDomain: "gerente-58e3c.firebaseapp.com",
    projectId: "gerente-58e3c",
    storageBucket: "gerente-58e3c.appspot.com",
    messagingSenderId: "767731023085",
    appId: "1:767731023085:web:efff6cb51549a3d218e0e4",
    measurementId: "G-0RENGENHCM"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage()

export default firebase