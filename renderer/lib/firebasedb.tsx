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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { forEach } from 'lodash';

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
  imagesDesc: string[];
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const projects = collection(db, 'projects');
const accounts = collection(db, 'accounts');
const auth = getAuth(app);
export const storage = getStorage(app);

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
  return addDoc(col, data);
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

export async function saveImagesToCloud(
  id: string,
  project: string,
  images: File[],
) {
  if (images.length === 0) return;
  const links = await Promise.all(
    images.map(async (image) => {
      const storageRef = ref(storage, `images/${id}/${project}/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      return url;
    }),
  );
  return links;
}
export async function getImageDescFromCloud(key: string) {
  const docRef = doc(db, 'projects', key);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const specificField = data.imagesDesc;
    return specificField;
  }
}

export async function getImageUrlsFromCloud(folderPath: string) {
  const folderRef = ref(storage, folderPath);
  const items = await listAll(folderRef);
  console.log(items);
  const downloadURLs: string[] = [];
  const names: string[] = [];
  try {
    await Promise.all(
      items.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        names.push(itemRef.name);
        downloadURLs.push(url);
      }),
    );
    return { downloadURLs, names };
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteProjectPhotosFromCloud(folderPath: string) {
  console.log(folderPath);
  const folderRef = ref(storage, folderPath);
  const items = await listAll(folderRef);
  console.log(items);
  try {
    await Promise.all(
      items.items.map(async (itemRef) => {
        await deleteObject(itemRef);
      }),
    );
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function setImagesDescToCloud(
  key: string,
  imagesDescObj: Object,
  sortedLinks: string[],
) {
  const docRef = doc(db, 'projects', key);
  const getUrlFileName = (url) => {
    const urlParts = url.split('/');

    const lastPart = urlParts[urlParts.length - 1];
    const fileName = lastPart.split('?')[0];

    let temp = decodeURIComponent(fileName);
    let name = temp.split('/');
    let name1 = name[name.length - 1];

    return name1;
  };

  let temp = { ...imagesDescObj };
  console.log('temp', temp);

  sortedLinks.forEach((url) => {
    let name = getUrlFileName(url);
    console.log(name);

    temp[name] = { ...imagesDescObj[name], desc: imagesDescObj[name].desc };
    temp[name] = { ...imagesDescObj[name], url: url };
  });
  updateDoc(docRef, { imagesDesc: temp }).then((e) => {
    console.log(key, 'has been updated');
  });
}

export async function updateImagesDescToCloud(
  key: string,
  imagesDescObj: {
    [key: string]: {
      desc: string;
      name: string;
      url: string;
    };
  },
  sortedLinks: string[],
  imagesToDelete: string[],
) {
  if (imagesToDelete.length > 0) {
    imagesToDelete.forEach((url) => {
      deleteObject(ref(storage, url))
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  const docRef = doc(db, 'projects', key);
  const getUrlFileName = (url) => {
    const urlParts = url.split('/');

    const lastPart = urlParts[urlParts.length - 1];
    const fileName = lastPart.split('?')[0];
    let temp = decodeURIComponent(fileName);
    let name = temp.split('/');
    let name1 = name[name.length - 1];

    return name1;
  };

  let temp = { ...imagesDescObj };
  console.log('imgObj', imagesDescObj);
  console.log('curr', temp);
  console.log('imagesToDel', [imagesToDelete]);

  if (sortedLinks != undefined) {
    sortedLinks.forEach((url) => {
      let name = getUrlFileName(url);
      console.log(name);

      temp[name] = { ...imagesDescObj[name], desc: imagesDescObj[name].desc };
      temp[name] = { ...imagesDescObj[name], url: url };
    });
    updateDoc(docRef, { imagesDesc: temp }).then((e) => {
      console.log(key, 'has been updated');
    });
  } else {
    updateDoc(docRef, { imagesDesc: temp }).then((e) => {
      console.log(key, 'has been updated');
    });
  }
}
