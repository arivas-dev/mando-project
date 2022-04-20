import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAIAL5cNd8H_iX_M7VdBIvUN_QPQ7aeYno",
    authDomain: "mando-project-af44d.firebaseapp.com",
    projectId: "mando-project-af44d",
    storageBucket: "mando-project-af44d.appspot.com",
    messagingSenderId: "123513076707",
    appId: "1:123513076707:web:1fea6f02c0094befc3fed6"
  };
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app
