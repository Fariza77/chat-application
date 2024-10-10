// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6vQDlWYGaUVent7cvKcWLTllOVuzhob4",
  authDomain: "chat-app2-a8159.firebaseapp.com",
  projectId: "chat-app2-a8159",
  storageBucket: "chat-app2-a8159.appspot.com",
  messagingSenderId: "934770518471",
  appId: "1:934770518471:web:c1f415f6b43a1c01da91e2",
  measurementId: "G-XN001YCBJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;