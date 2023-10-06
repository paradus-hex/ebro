import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import SideNavbar from './ui/SideNavbar';
import { RxAvatar } from 'react-icons/rx';
import { useRouter } from 'next/router';
import { useSignInPageStore } from '../stores/signInPageStore';
import useStore from '../stores/useStore';

// const { getValues, setValues } = useSignedInStoreState();

// const signedIn = getValues().signedIn;

// if (!signedIn) {
//   Router.push('/login');
// }

export default function Layout({ children }) {
  const signedIn = useStore(useSignInPageStore, (state) => state.signedIn);
  const { getSignedIn, setSignedIn } = useSignInPageStore();
  // const signedIn = getSignedIn();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    if (!signedIn) {
      router.push('/signin');
    }
  }, []);

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
