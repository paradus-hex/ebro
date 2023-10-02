import React, { ReactElement, ReactNode } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useSignedInStoreState } from '../stores/createPageStore';

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
