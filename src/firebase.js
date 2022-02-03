import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { collection, getDocs, getFirestore } from "firebase/firestore";


const app = firebase.initializeApp({
    apiKey: "AIzaSyDhZ5I_b4p58v1YX15Yy9sXF7C_rkOc1h0",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export const auth = app.auth()
export const db = getFirestore();
// const colRef = collection(d  b, 'user')
// getDocs(colRef)
//     .then((snapshot) => {
//         let user = []
//         snapshot.docs.forEach(doc => {
//             user.push({...doc.data(), id:doc.id})

//         })
//         console.log(user)
//     })




export default app