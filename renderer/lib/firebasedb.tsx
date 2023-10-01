import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  // getAnalytics,
} from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { firebaseConfig as firebaseConstant } from '../firebase-constants';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = firebaseConstant;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'books');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
