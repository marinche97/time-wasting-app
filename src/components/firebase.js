import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYConTqZobG2jWdp9c4avh--j_wdKtrmc",
  authDomain: "time-wasting-project.firebaseapp.com",
  projectId: "time-wasting-project",
  storageBucket: "time-wasting-project.appspot.com",
  messagingSenderId: "606592622358",
  appId: "1:606592622358:web:3f1ecabbd52525287e3a37",
  measurementId: "G-EESLFV31RM",
  databaseURL:
    "https://time-wasting-project-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const entriesRef = ref(db, "entries"); // Reference to your 'entries' node

export { db, entriesRef };
