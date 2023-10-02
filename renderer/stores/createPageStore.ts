import { z } from "zod";
import { create } from "zustand";
import { formSchema } from "../pages/create";
import { immer } from 'zustand/middleware/immer'
import { signInformSchema } from "../pages/signin";

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



// interface useSignInPageStore

interface SignInPagePageStoreState {
  values: z.infer<typeof signInformSchema>;
  setValues: (values: z.infer<typeof signInformSchema>) => void;
  getValues: () => z.infer<typeof signInformSchema>;

}

export const useSignInPageStore = create(
  immer<SignInPagePageStoreState>((set, get) => ({
    values: {
      email: '',
      password: '',
    },
    setValues: (values) => set({ values }),
    getValues: () => get().values,

  })));

interface signedInStoreState {
  values: { signedIn: boolean };
  setValues: (values: { signedIn: boolean }) => void;
  getValues: () => { signedIn: boolean };

}

export const useSignedInStoreState = create(
  immer<signedInStoreState>((set, get) => ({
    values: {
      signedIn: false,
    },
    setValues: (values) => set({ values }),
    getValues: () => get().values,

  })));
