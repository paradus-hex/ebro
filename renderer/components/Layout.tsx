import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import SideNavbar from './ui/SideNavbar';
import { RxAvatar } from 'react-icons/rx';
import { useRouter } from 'next/router';
import useStore from '../stores/useStore';
import { useSignInPageStore } from '../stores/signInPageStore';
import { set } from 'lodash';

export default function Layout({ children }) {
  const { getSignedIn, setSignedIn } = useSignInPageStore();
  // const signedIn = getSignedIn();
  // const signedIn = useStore(useSignInPageStore, (state) => state.signedIn);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (getSignedIn() == false) {
      router.push('/signin');
    }
  }, []);

  console.log('sign in state', getSignedIn());

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
        {getSignedIn() ? children : null}
      </div>
    </div>
  );
}
