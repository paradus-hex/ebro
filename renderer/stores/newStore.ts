// import { create } from 'zustand'
import { z } from "zod";
import { signInformSchema } from "../pages/signin";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  signIn: boolean
  setSignIn: (by: boolean) => void
}
interface SignInPagePageStoreState {
  values: z.infer<typeof signInformSchema>;
  signedIn: boolean;
  user_id: string;
  account_type: string;
  account_id: string;
  setAccount_id: (account_id: string) => void;
  getAccount_id: () => string;
  setAccount_type: (account_type: string) => void;
  getAccount_type: () => string;
  setUser_id: (user_id: string) => void;
  getUser_id: () => string;
  setValues: (values: z.infer<typeof signInformSchema>) => void;
  getValues: () => z.infer<typeof signInformSchema>;
  getSignedIn: () => boolean;
  setSignedIn: (signedIn: boolean) => void;
}

export const useSignInPageStore = create<SignInPagePageStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        values: {
          email: '',
          password: '',
        },
        signedIn: false,
        user_id: '',
        account_type: '',
        account_id: '',
        setAccount_id: (account_id) => set({ account_id }),
        getAccount_id: () => get().account_id,
        setAccount_type: (account_type) => set({ account_type }),
        getAccount_type: () => get().account_type,
        setUser_id: (user_id) => set({ user_id }),
        getUser_id: () => get().user_id,
        setValues: (values) => set({ values }),
        getValues: () => get().values,
        getSignedIn: () => get().signedIn,
        setSignedIn: (signedIn) => set({ signedIn }),
      }),
      { name: 'bearStore' }
    )
  )
)