import { get } from 'http';
import { z } from "zod";
import { create } from "zustand";

import { formSchema } from "../pages/create";
import { immer } from 'zustand/middleware/immer'
import { devtools, persist, } from "zustand/middleware";

interface CreatePageStoreState {
  values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  projectKey: string;
  response: string;
  note: string;
  imageUrls: string[];
  images: File[];
  imageDesc: { desc: string }[];
  imageDescObj: { [key: string]: { desc: string, name: string, url: string } };
  imagesToDelete: string[];
  imageSwiperDescObj: { [key: string]: string };
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
  getImageDescObj: () => { [key: string]: { desc: string, name: string, url: string } };
  setImageDescObj: (key: string, value: { desc: string, name: string, url: string }) => void;
  delImageDescObj: () => void;
  delIndiImageDescObj: (key: string) => void;
  getSwiperImageDescObj: () => { [key: string]: string };
  setSwiperImageDescObj: (key: string, value: string) => void;
  delSwiperImageDescObj: () => void;
  delIndiSwiperImageDescObj: (key: string) => void;
  pushImagesToDelete: (url: string) => void;
  getImagesToDelete: () => string[];
  setImagesToDelete: (imagesToDelete: string[]) => void;


}




export const useCreatePageStore = create<CreatePageStoreState>()(
  devtools(
    persist(
      (set, get) => ({
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
        imageDescObj: {},
        imageSwiperDescObj: {},
        imagesToDelete: [],
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
        getImagesToDelete: () => get().imagesToDelete,
        pushImagesToDelete: (url) => {
          set((state) => ({
            imagesToDelete: [...state.imagesToDelete, url]
          }))
        },
        setImagesToDelete: (imagesToDelete) => set({ imagesToDelete }),
        setImageDescObj: (key, value) => {
          set((state) => ({
            imageDescObj: {
              ...state.imageDescObj,
              [key]: { ...value, desc: value.desc }
            }
          }))
        },
        delImageDescObj: () => {
          set((state) => ({
            imageDescObj: {}
          }))
        },
        getImageDescObj: () => { return get().imageDescObj },
        delIndiImageDescObj: (key) => {
          set((state) => {
            delete state.imageDescObj[key];
            return state
          })
        },
        setSwiperImageDescObj: (key, value) => {
          set((state) => ({
            imageSwiperDescObj: {
              ...state.imageSwiperDescObj,
              [key]: value
            }
          }))
        },
        delSwiperImageDescObj: () => {
          set((state) => ({
            imageSwiperDescObj: {}
          }))
        },
        getSwiperImageDescObj: () => { return get().imageSwiperDescObj },
        delIndiSwiperImageDescObj: (key) => {
          set((state) => {
            let obj = state.imageSwiperDescObj;
            let keys = Object.keys(obj);
            let values = Object.values(obj);
            values.splice(parseInt(key), 1);
            console.log("values", values);
            let newObj = {};
            for (let i = 0; i < values.length; i++) {
              newObj[i.toString()] = values[i];
            }
            return { imageSwiperDescObj: newObj }
          })
        }
      }),
      { name: 'pageStore' }
    )
  )
)


