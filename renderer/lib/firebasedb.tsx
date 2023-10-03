import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore/lite';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from '../firebase-constants';

export interface ProjectData {
  address: string;
  zipCode: string;
  city: string;
  yearOfConstruction: number;
  sizeOfProperty: number;
  sizeOfHome: number;
  numberOfBedRooms: number;
  numberOfBathRooms: number;
  architecturalStyle: string[];
  outbuildings: string[];
  uniqueSellingPoints: string;
  interiorFeatures: string;
  localAttractions: string;
  geographicalFeatures: string;
  nearbyAmenities: string;
  projectName: string;
  userName: string;
  updatedAt: string;
  isFavorite: boolean;
  response: string;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const projects = collection(db, 'projects');
const accounts = collection(db, 'accounts');

export async function getProjects(col = projects) {
  const projectsCol = col;
  const projectsSnapshot = await getDocs(projectsCol);
  const projectsList = projectsSnapshot.docs.map((doc) => ({
    key: doc.id,
    ...doc.data(),
  }));
  return projectsList;
}

export async function getProjectsUsingUsername(
  userName: string,
  col = projects,
) {
  const projectsCol = col;
  const projectsSnapshot = await getDocs(
    query(projectsCol, where('userName', '==', userName)),
  );
  const projectsList = projectsSnapshot.docs.map((doc) => ({
    key: doc.id,
    ...doc.data(),
  }));
  return projectsList;
}

export async function getProjectDetails(id: string) {
  const docRef = doc(db, 'projects', id);
  const projectDetails = getDoc(docRef).then((docSnap) => {
    // const key = docSnap.id;
    const data = docSnap.data() as ProjectData;
    return data;
  });
  return projectDetails;
}

export async function updateProjectDetails(id: string, data: any) {
  const docRef = doc(db, 'projects', id);
  try {
    await updateDoc(docRef, data);
    console.log('Document updated successfully! ', id);
  } catch (e) {
    console.log('Error updating document: ', e);
  }
}

export async function getProjectsForCarousel(userName: string, col = projects) {
  const projectsCol = col;
  const projectsSnapshot = await getDocs(
    query(projectsCol, where('userName', '==', userName)),
  );
  const projectsList = projectsSnapshot.docs.map((doc) => {
    const key = doc.id;
    const { projectName, address, updatedAt, isFavorite } = doc.data();
    return { key, projectName, address, updatedAt, isFavorite };
  });
  return projectsList;
}

export async function setProjects(data: any, col = projects) {
  addDoc(col, data);
}

export async function isFav(id: string, fav: boolean) {
  const docRef = doc(db, 'projects', id);
  updateDoc(docRef, { isFavorite: fav }).then((e) => {
    console.log(id, 'has been set as favorite =', fav);
  });
}

export async function deleteProject(id: string) {
  const docRef = doc(db, 'projects', id);
  deleteDoc(docRef).then((e) => console.log(id, 'has been deleted'));
}

export async function createAcc(data: {
  account_tier: string;
  user_id: string;
}) {
  addDoc(accounts, data).then((e) => console.log('Account created'));
}

export async function newUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export async function getAccountDetails(id: string) {
  return (
    await getDocs(query(accounts, where('user_id', '==', id)))
  ).docs[0].data();
}
