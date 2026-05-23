// src/firebase.js
// Spendora Firebase Setup for Google Login

import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey:
    "AIzaSyBEBRN43kpUtnFlAZIqbpbuOMYjkfz8M4E",

  authDomain:
    "spendora-82a80.firebaseapp.com",

  projectId:
    "spendora-82a80",

  storageBucket:
    "spendora-82a80.firebasestorage.app",

  messagingSenderId:
    "815035739107",

  appId:
    "1:815035739107:web:515c30100a324713d1ced6",

  measurementId:
    "G-20SNKTWZTG"
}

const app =
  initializeApp(
    firebaseConfig
  )

export const auth =
  getAuth(app)