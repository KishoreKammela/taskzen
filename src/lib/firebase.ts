import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'taskzen-5gpu6',
  appId: '1:248391268397:web:7f8a096ec900682015e0a4',
  storageBucket: 'taskzen-5gpu6.firebasestorage.app',
  apiKey: 'AIzaSyD2X5vQjBSdxmV6j0ZjauaGhp2E3xnX6T0',
  authDomain: 'taskzen-5gpu6.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '248391268397',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
