import React, { useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import SideNavbar from '../components/ui/SideNavbar';

function MyApp({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex text-2xl w-full text-center">
      <button
        className="p-2 absolute top-2 left-8 z-10 text-white bg-gray-700 rounded-full hover:bg-gray-600"
        onClick={toggleSidebar}
      >
        Avatar
      </button>
      <SideNavbar open={sidebarOpen} />
      <div
        className={`${
          sidebarOpen ? 'w-1/6 ' : 'w-0'
        } h-screen bg-background overflow-hidden transition-width duration-300 ease-in-out`}
      ></div>
      <div className={`w-screen h-screen bg-blue-600`}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
