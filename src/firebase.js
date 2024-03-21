// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWOZGzdGj9hui2vnbsdDtaGLjjAPz99J4",
  authDomain: "listapp-24506.firebaseapp.com",
  databaseURL: "https://listapp-24506.firebaseio.com",
  projectId: "listapp-24506",
  storageBucket: "listapp-24506.appspot.com",
  messagingSenderId: "984857252519",
  appId: "1:984857252519:web:cff8e712ae14e5229f4182",
  measurementId: "G-XQLVXTP1S0"
};

// Newer docs https://firebase.google.com/docs/web/setup#add-sdk-and-initialize
// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app
