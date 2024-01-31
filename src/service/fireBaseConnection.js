import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

let firebaseConfig = {
  apiKey: 'AIzaSyDgfjb5Q6wN8M2Sb1k5hN41popiTKU8CeY',
  authDomain: 'tasklist-a5b1f.firebaseapp.com',
  projectId: 'tasklist-a5b1f',
  storageBucket: 'tasklist-a5b1f.appspot.com',
  messagingSenderId: '586491563649',
  appId: '1:586491563649:web:d024d0bd7fe0e33cbc0780',
  measurementId: 'G-S29HYYGWD4',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export default db;
