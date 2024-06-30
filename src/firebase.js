// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDY9KbiKV5ngYMSnlmFQNSWBlCZCYiUywI",
    authDomain: "adinath-bag-centre.firebaseapp.com",
    projectId: "adinath-bag-centre",
    storageBucket: "adinath-bag-centre.appspot.com",
    messagingSenderId: "419716447312",
    appId: "1:419716447312:web:7bcad6bc1e6e83e0936555",
    measurementId: "G-1H9CBK7NZF"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;

