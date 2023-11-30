import React, { useState } from 'react';
import { getAccountDetails, newUser, signInUser } from '../lib/firebasedb';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useSignInPageStore } from '../stores/signInPageStore';
import { createAcc } from '../lib/firebasedb';
// import { set } from 'lodash';

export const signInformSchema = z.object({
  email: z.string().email({ message: 'A valid email must be provided' }),
  password: z
    .string()
    .min(8, { message: 'The password must be at least 8 characters long' }),
  repeatPassword: z
    .string()
    .min(8, { message: 'The password must be at least 8 characters long' })
    .optional(),
});

export default function signin() {
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(true);
  const {
    setValues,
    getValues: getStoredValues,
    setSignedIn,
    setUser_id,
    setAccount_type,
    setDefaultSavePath,
    setAccount_id,
  } = useSignInPageStore();

  const [showPassLogin, setShowPassLogin] = useState<boolean>(false);
  const [showPassSignUp, setShowPassSignUp] = useState<boolean>(false);
  const [showPassSignUp2, setShowPassSignUp2] = useState<boolean>(false);
  const [repeatPassError, setRepeatPassError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInformSchema>>({
    resolver: zodResolver(signInformSchema),
    defaultValues: getStoredValues(),
  });

  function onSubmit(values: z.infer<typeof signInformSchema>) {
    setValues({
      ...values,
    });
    {
      login
        ? signInUser(values.email, values.password)
            .then((cred) => {
              setSignedIn(true);
              setUser_id(cred.user.uid);
              getAccountDetails(cred.user.uid)
                .then((account) => {
                  setAccount_id(account.key);
                  setDefaultSavePath(account.default_save_path);
                  setAccount_type(account.account_tier);
                })
                .then(() => router.push('/home'));
            })
            .catch((err) => console.log(err))
        : values.password == values.repeatPassword
        ? newUser(values.email, values.password)
            .then((cred) => {
              setSignedIn(true);
              setUser_id(cred.user.uid);
              setAccount_type('free');
              createAcc({ user_id: cred.user.uid, account_tier: 'free' });
            })
            .then(() => router.push('/home'))
            .catch((err) => console.log(err))
        : setRepeatPassError(true);
    }
  }

  return login ? (
    <div className="bg-gray-100 flex justify-center items-left h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-semibold mb-9 w-full">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 gap-y-5 place-items-left">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-[80%] flex flex-col items-left">
                    <FormLabel className="text-xl ">Email</FormLabel>
                    <FormControl>
                      <div className="flex flex-row">
                        {' '}
                        <Input
                          type="email"
                          className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                          placeholder="Email"
                          {...field}
                        />
                        {/* <div className="w-[30px] ml-3" type="checkbox" /> */}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-[80%] flex flex-col items-left">
                    <FormLabel className="text-xl">Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <Input
                          className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                          type={showPassLogin ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                        />
                        <div className="flex flex-row">
                          <input
                            className="w-[30px] mt-5"
                            onClick={(e) => {
                              setShowPassLogin((prev) => !prev);
                            }}
                            type="checkbox"
                          />
                          <p className="mt-5"> Show Password</p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
        {/* <!-- Sign up  Link --> */}
        <div
          className="mt-6 text-blue-500 text-center"
          onClick={() => setLogin((prev) => !prev)}
        >
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-gray-100 flex justify-center items-left h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-semibold mb-9">Sign up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 gap-y-5 place-items-left">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-[80%] flex flex-col items-left">
                    <FormLabel className="text-xl ">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-[80%] flex flex-col items-left">
                    <FormLabel className="text-xl">Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <Input
                          className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                          type={showPassSignUp ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                        />
                        <div className="flex flex-row">
                          <input
                            className="w-[30px] mt-5"
                            onClick={(e) => {
                              setShowPassSignUp((prev) => !prev);
                            }}
                            type="checkbox"
                          />

                          <p className="mt-5"> Show Password</p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem className="w-[80%] flex flex-col items-left">
                    <FormLabel className="text-xl">Repeat Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <Input
                          className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                          type={showPassSignUp2 ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                        />
                        <div className="flex flex-row">
                          <input
                            className="w-[30px] mt-5"
                            onClick={(e) => {
                              setShowPassSignUp2((prev) => !prev);
                            }}
                            type="checkbox"
                          />

                          <p className="mt-5"> Show Password</p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {repeatPassError && (
                      <p className="text-sm p-3 text-red-700">
                        {' '}
                        The repeat password must match the initial password
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {/* <!-- Sign up  Link --> */}
        <div
          className="mt-6 text-blue-500 text-center"
          onClick={() => setLogin((prev) => !prev)}
        >
          <a href="#" className="hover:underline">
            Login Here
          </a>
        </div>
      </div>
    </div>
  );
}
