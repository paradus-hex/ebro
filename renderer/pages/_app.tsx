import React, { ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';
import SideNavbar from '../components/ui/SideNavbar';
import { RxAvatar } from 'react-icons/rx';
import Layout from '../components/Layout';
import { firebaseConfig as firebaseConstant } from '../firebase-constants';

import type { NextPage } from 'next';
// import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
