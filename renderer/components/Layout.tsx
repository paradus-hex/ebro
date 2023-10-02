import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
// import '../styles/globals.css';
import SideNavbar from './ui/SideNavbar';
import { RxAvatar } from 'react-icons/rx';
import { useSignedInStoreState } from '../stores/createPageStore';
import { useRouter } from 'next/router';

// const { getValues, setValues } = useSignedInStoreState();

// const signedIn = getValues().signedIn;

// if (!signedIn) {
//   Router.push('/login');
// }

export default function Layout({ children }) {
  const router = useRouter();
  const { getValues, setValues } = useSignedInStoreState();
  const signedIn = getValues().signedIn;
  console.log(signedIn, 'signedIn');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  if (!signedIn) {
    router.push('/signin');
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex text-2xl w-full text-center">
      <Script src="/db.js" crossOrigin="anonymous" defer />
      <button
        className="sticky top-3 left-7 z-10 w-9 h-9 flex justify-center items-center text-center text-white bg-gray-700 rounded-full hover:bg-gray-600"
        onClick={toggleSidebar}
      >
        <RxAvatar className="w-10 h-10" />
      </button>
      <SideNavbar open={sidebarOpen} />
      <div
        className={`${
          sidebarOpen ? 'w-1/6 ' : 'w-0'
        } h-screen bg-background overflow-hidden transition-width duration-300 ease-in-out`}
      ></div>
      <div
        className={`${
          sidebarOpen ? 'w-5/6 ' : 'w-screen'
        } h-screen transition-width duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
