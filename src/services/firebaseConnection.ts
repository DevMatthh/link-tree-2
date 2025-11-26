import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1fwWo4bEE_wbOX0cKrXMkDshnUrLj4-k",
  authDomain: "link-tree-f7d17.firebaseapp.com",
  projectId: "link-tree-f7d17",
  storageBucket: "link-tree-f7d17.firebasestorage.app",
  messagingSenderId: "1081021534058",
  appId: "1:1081021534058:web:0543134feb2ea833359f13",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
