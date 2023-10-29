import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import SideNavbar from './ui/SideNavbar';
import { useRouter } from 'next/router';
import { useSignInPageStore } from '../stores/signInPageStore';

export default function Layout({ children }) {
  const { getSignedIn, signedIn, sideBarIsOpen, setSideBarIsOpen } =
    useSignInPageStore();
  const router = useRouter();

  useEffect(() => {
    if (signedIn == false) {
      router.push('/signin');
    }
  }, [signedIn]);

  const toggleSidebar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };
  return (
    <div className="flex text-2xl w-full text-center">
      <Script src="/db.js" crossOrigin="anonymous" defer />
      {signedIn ? (
        <button
          className="fixed top-3 left-7 z-10 w-9 h-9 flex justify-center items-center text-center text-white bg-gray-700 rounded-full hover:bg-gray-600"
          onClick={toggleSidebar}
        >
          <img src="/images/avatar.png" alt="alt" className="w-14 h-10" />
        </button>
      ) : (
        ' '
      )}
      {signedIn ? <SideNavbar /> : ''}

      <div
        className={`${
          sideBarIsOpen ? 'w-1/6 ' : 'w-0'
        } h-screen bg-background overflow-hidden transition-width duration-300 ease-in-out`}
      ></div>
      <div
        className={`${
          sideBarIsOpen ? 'w-5/6 ' : 'w-screen'
        } h-screen transition-width duration-300 ease-in-out`}
      >
        {getSignedIn() ? children : null}
      </div>
    </div>
  );
}
