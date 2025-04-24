import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBxHfuprInJzWNngGwRAHzYm0ByiBPbB1c',
  authDomain: 'learn-n-app.firebaseapp.com',
  projectId: 'learn-n-app',
  storageBucket: 'learn-n-app.appspot.com',
  messagingSenderId: '1031285993587',
  appId: '1:1031285993587:web:3ad51e4e6c175372133a06',
  measurementId: 'G-52MFT1V26F',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
export const db = getFirestore(app)
