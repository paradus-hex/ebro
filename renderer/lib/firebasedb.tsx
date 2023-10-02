import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore/lite';
import { firebaseConfig } from '../firebase-constants';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const projects = collection(db, 'projects');

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

export async function getProjectsForCarousel(userName: string, col = projects) {
  const projectsCol = col;
  const projectsSnapshot = await getDocs(
    query(projectsCol, where('userName', '==', userName)),
  );
  const projectsList = projectsSnapshot.docs.map((doc) => {
    const key = doc.id;
    const { projectName, address, updatedAt } = doc.data();
    return { key, projectName, address, updatedAt };
  });
  return projectsList;
}

export async function setProjects(data: any, col = projects) {
  addDoc(col, data);
}
