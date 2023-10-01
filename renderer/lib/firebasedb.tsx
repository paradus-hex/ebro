import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  // getAnalytics,
} from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { firebaseConfig as firebaseConstant } from '../firebase-constants';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = firebaseConstant;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const booksCol = collection(db, 'books');

// Get a list of cities from your databas
export async function getBooks(col = booksCol) {
  const citiesCol = col;
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export async function setBooks(data: any, col = booksCol) {
  addDoc(col, data);
}
