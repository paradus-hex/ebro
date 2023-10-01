import React, { useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import SideNavbar from '../components/ui/SideNavbar';
import { RxAvatar } from 'react-icons/rx';
import Script from 'next/script';
import { Test } from '../components/Test';

// import { world } from './renderer';

function MyApp({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // os?.homedir();
  // console.log(world);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      {/* <Test /> */}
      <Script
        src="/renderer.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <div className="flex text-2xl w-full text-center">
        <p id="test"> hello </p>
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
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
