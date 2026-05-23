// src/firebase.js
// Spendora Firebase Setup for Google Login

import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey:
    "AIzaSyATzADzcu_9Pj67sB6ARqUzIGiSwtca6B0",

  authDomain:
    "spendora-expense-tracker-a5903.firebaseapp.com",

  projectId:
    "spendora-expense-tracker-a5903",

  storageBucket:
     "spendora-expense-tracker-a5903.firebasestorage.app",

  messagingSenderId:
    "601467702153",

  appId:
    "1:601467702153:web:336dcd1a943754e4e72f58",

  measurementId:
    "G-RX9XC4687X"
}

const app =
  initializeApp(
    firebaseConfig
  )

export const auth =
  getAuth(app)