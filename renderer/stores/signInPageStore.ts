import { z } from "zod";
import { signInformSchema } from "../pages/signin";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SignInPagePageStoreState {
  values: z.infer<typeof signInformSchema>;
  signedIn: boolean;
  setValues: (values: z.infer<typeof signInformSchema>) => void;
  getValues: () => z.infer<typeof signInformSchema>;
  getSignedIn: () => boolean;
  setSignedIn: (signedIn: boolean) => void;
}

export const useSignInPageStore = create(
  immer<SignInPagePageStoreState>((set, get) => ({
    values: {
      email: '',
      password: '',
    },
    signedIn: false,
    setValues: (values) => set({ values }),
    getValues: () => get().values,
    getSignedIn: () => get().signedIn,
    setSignedIn: (signedIn) => set({ signedIn }),
  })));
