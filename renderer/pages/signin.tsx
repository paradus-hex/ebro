import React, { useState } from 'react';
import { newUser, signInUser } from '../lib/firebasedb';
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

export const signInformSchema = z.object({
  email: z.string().email({ message: 'A valid email must be provided' }),
  password: z
    .string()
    .min(8, { message: 'The password must be at least 8 characters long' }),
});

export default function signin() {
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(true);
  const { setValues, getValues: getStoredValues } = useSignInPageStore();
  const { setSignedIn } = useSignInPageStore();
  const [showPassLogin, setShowPassLogin] = useState<boolean>(false);
  const [showPassSignUp, setShowPassSignUp] = useState<boolean>(false);
  const [showPassSignUp2, setShowPassSignUp2] = useState<boolean>(false);
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
            .then((e) => {
              console.log(e);
              setSignedIn(true);
              router.push('/home');
              console.log('eita koj kore');
            })
            .catch((err) => console.log(err))
        : newUser(values.email, values.password)
            .then((e) => {
              setSignedIn(true);
              router.push('/home');

              console.log('eita koj kore 2');
            })
            .catch((err) => console.log(err));
    }

    // console.log(setProjects(values));
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
            <div className="grid grid-cols-1 gap-4 gap-y-14 place-items-left">
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
            <div className="grid grid-cols-1 gap-4 gap-y-14 place-items-left">
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
                name="password"
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
            Login Here
          </a>
        </div>
      </div>
    </div>
  );
}
