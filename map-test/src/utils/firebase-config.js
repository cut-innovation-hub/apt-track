// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhTA7Fwg1T2u4ol519NOJ0pB6MqRycabc",
  authDomain: "apt-track.firebaseapp.com",
  projectId: "apt-track",
  storageBucket: "apt-track.appspot.com",
  messagingSenderId: "24605202003",
  appId: "1:24605202003:web:f3eecfddcda079b6ce58a6",
  measurementId: "G-PKY48920B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);