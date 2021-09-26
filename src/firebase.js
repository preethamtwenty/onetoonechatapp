import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAs9EFfmRREp0a_7ZJnsMfnhKFSx1LKpk0",
    authDomain: "chat-app-e5129.firebaseapp.com",
    projectId: "chat-app-e5129",
    storageBucket: "chat-app-e5129.appspot.com",
    messagingSenderId: "967570345476",
    appId: "1:967570345476:web:34524970ca8b92fe82af51",
    measurementId: "G-XT875L21EL"
 
   
};
const app=!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

const db=app.firestore();  
const auth=app.auth();
const provider=new firebase.auth.GoogleAuthProvider();


export {provider,auth,db};
