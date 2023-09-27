import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-cols-12 text-2xl w-full text-center">
      <div className="col-span-2 h-screen bg-red-600"></div>
      <div className="col-span-10 h-screen bg-blue-600">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
