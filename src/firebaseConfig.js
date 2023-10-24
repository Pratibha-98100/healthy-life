import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCjPJNyjNurtE7rEHaoS5q5Djf2s3zRxME",
  authDomain: "healthy-life-48e2d.firebaseapp.com",
  projectId: "healthy-life-48e2d",
  storageBucket: "healthy-life-48e2d.appspot.com",
  messagingSenderId: "964841061709",
  appId: "1:964841061709:web:1d7b2c2de8581cb7890b04",
  measurementId: "G-YNT56MKYWF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app)
//By this above code user can use all the functionlity of firebase



export default firestoreDatabase;