import { get } from 'http';
import { z } from "zod";
import { create } from "zustand";
import { formSchema } from "../pages/create";
import { immer } from 'zustand/middleware/immer'

interface CreatePageStoreState {
  values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  projectKey: string;
  response: string;
  note: string;
  imageUrls: string[];
  images: File[];
  imageDesc: { desc: string }[];
  setValues: (values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>) => void;
  setProjectKey: (projectKey: string) => void;
  setResponse: (response: string) => void;
  getValues: () => { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  getProjectKey: () => string;
  getResponse: () => string;
  getNote: () => string;
  setNote: (note: string) => void;
  getImageUrls: () => string[];
  setImageUrls: (imageUrls: string[]) => void;
  delImageUrls: (index: number) => void;
  getImages: () => File[];
  setImages: (images: File[]) => void;
  delImageDesc: (index: number) => void;
  setImageDesc: (imageDesc: { desc: string }[]) => void;
  getImageDesc: () => { desc: string }[];


}

export const useCreatePageStore = create(
  immer<CreatePageStoreState>((set, get) => ({
    values: {
      userName: 'dev',
      projectName: 'dev',
      address: '325/A',
      zipCode: '1217',
      city: 'Dhaka',
      yearOfConstruction: 2000,
      sizeOfProperty: 10,
      sizeOfHome: 10,
      numberOfBedRooms: 1,
      numberOfBathRooms: 69,
      architecturalStyle: ['Modern', 'Contemporary'],
      outbuildings: ['Garage', 'Guest House'],
      uniqueSellingPoints: 'Soundproof walls to stay safe from screaming wives',
      interiorFeatures: 'Cold floors to sleep on',
      localAttractions: 'Local slums to get daily reality checks',
      geographicalFeatures: 'Mountain for views and also to jump off of',
      nearbyAmenities: 'Psychiatrist office, Swimming pool full of sharks',
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    },
    projectKey: '',
    response: "",
    note: "",
    imageUrls: [],
    images: [],
    imageDesc: [],
    setValues: (values) => set({ values }),
    setProjectKey: (projectKey) => set({ projectKey }),
    setResponse: (response) => set({ response }),
    setNote: (note) => set({ note }),
    getValues: () => get().values,
    getProjectKey: () => get().projectKey,
    getResponse: () => get().response,
    getNote: () => get().note,
    getImageUrls: () => get().imageUrls,
    setImageUrls: (imageUrls) => set({ imageUrls }),
    delImageUrls: (index) => {
      let urlArr = [...get().imageUrls];
      urlArr.splice(index, 1);
      set({ imageUrls: urlArr })
    },
    getImages: () => get().images,
    setImages: (images) => set({ images }),
    setImageDesc: (imageDesc) => set({ imageDesc }),
    getImageDesc: () => get().imageDesc,
    delImageDesc: (index) => {
      let arrDesc = [...get().imageDesc];
      arrDesc.splice(index, 1);
      set({
        imageDesc: arrDesc,
      });
    },
  })),

);


