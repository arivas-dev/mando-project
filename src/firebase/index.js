// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIAL5cNd8H_iX_M7VdBIvUN_QPQ7aeYno",
  authDomain: "mando-project-af44d.firebaseapp.com",
  projectId: "mando-project-af44d",
  storageBucket: "mando-project-af44d.appspot.com",
  messagingSenderId: "123513076707",
  appId: "1:123513076707:web:1fea6f02c0094befc3fed6"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp);
// export default app;