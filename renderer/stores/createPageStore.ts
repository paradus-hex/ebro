import { z } from "zod";
import { create } from "zustand";
import { formSchema } from "../pages/create";
import { immer } from 'zustand/middleware/immer'

interface CreatePageStoreState {
  values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  response: string;
  note: string;
  setValues: (values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>) => void;
  setResponse: (response: string) => void;
  getValues: () => { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  getResponse: () => string;
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
    response: "",
    note: "",
    setValues: (values) => set({ values }),
    setResponse: (response) => set({ response }),
    setNote: (note) => set({ note }),
    getValues: () => get().values,
    getResponse: () => get().response,
    getNote: () => get().note,
  })));