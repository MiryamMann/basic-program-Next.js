import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSYvptBnrkDPhR0MI4ixWMl9H0g6qyBAw",
  authDomain: "product-searcher-e9e82.firebaseapp.com",
  projectId: "product-searcher-e9e82",
  storageBucket: "product-searcher-e9e82.firebasestorage.app",
  messagingSenderId: "929237406087",
  appId: "1:929237406087:web:5333dca961f2b24bf4c322",
  measurementId: "G-T955HPTMLX"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
