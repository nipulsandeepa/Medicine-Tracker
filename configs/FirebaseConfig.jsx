// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import {getAuth, initializeAuth, getReactNativePersistence , ReactNativeAsyncStorage} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDD5H2OK3A12erirD-LGvkEwO_hVN49LKY",
  authDomain: "dgdvdv-6b709.firebaseapp.com",
  projectId: "dgdvdv-6b709",
  storageBucket: "dgdvdv-6b709.firebasestorage.app",
  messagingSenderId: "116323230455",
  appId: "1:116323230455:web:45360c866f08b368a4a9f2"
};


const app = initializeApp(firebaseConfig);


export const db=getFirestore(app);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});




