// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD7mS_VSqlkQH3MCB1iTIz9DlhSa9nrgEk",
  authDomain: "spock-controller.firebaseapp.com",
  projectId: "spock-controller",
  storageBucket: "spock-controller.appspot.com",
  messagingSenderId: "641166533995",
  appId: "1:641166533995:web:26e41da756133a03d8582e",
  measurementId: "G-PY0HMJJE9P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
