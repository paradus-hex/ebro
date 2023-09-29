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
        className="sticky top-2 left-6 z-10 w-12 h-12 text-center text-white bg-gray-700 rounded-full hover:bg-gray-600"
        onClick={toggleSidebar}
      >
        AV
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
  );
}

export default MyApp;
