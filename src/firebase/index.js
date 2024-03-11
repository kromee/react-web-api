import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { fireEvent } from "@testing-library/react";

//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAN3bsROi6lS82k_Hbgiar2Xd3LWz6GA94",
    authDomain: "decoratuhome-b8ff6.firebaseapp.com",
    projectId: "decoratuhome-b8ff6",
    storageBucket: "decoratuhome-b8ff6.appspot.com",
    messagingSenderId: "948430765174",
    appId: "1:948430765174:web:d22a67e11ed14282f6f357",
    measurementId: "G-P4LET188HG"
  };


// Initialize Firebase
const firebaseApp = !firebase.apps.length?firebase.initializeApp(firebaseConfig): firebase.app;
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = (file) => {
    return new Promise((resolve, eject) => {
      const uploadProcess = storage
        .ref(`images/${file.name}-${file.lastModified}`)
        .put(file);
  
      uploadProcess.on(
        "state_changed",
        (snapshot) => console.log("la imagen se esta subiendo", snapshot),
        eject,
        () => {
          console.log("enter", file);
          storage
            .ref("images")
            .child(`${file.name}-${file.lastModified}`)
            .getDownloadURL()
            .then(resolve);
        }
      );
    });
  };
  