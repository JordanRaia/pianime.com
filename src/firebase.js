// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkeYqMaf-eBJoBsopDguxji6xDse5HrM0",
    authDomain: "pianime.firebaseapp.com",
    databaseURL: "https://pianime-default-rtdb.firebaseio.com",
    projectId: "pianime",
    storageBucket: "pianime.appspot.com",
    messagingSenderId: "137494847395",
    appId: "1:137494847395:web:720087fe65e0dc160e4416",
    measurementId: "G-0X1S1HWDPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);

export { database, app };
