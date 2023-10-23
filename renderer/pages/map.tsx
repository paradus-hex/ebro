'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const MapWithNoSSR = dynamic(() => import('../components/map2'), {
  ssr: false,
});
// import Map2 from '../components/map2';
export default function map() {
  return (
    <div>
      hello
      {/* <Map></Map> */}
      <MapWithNoSSR></MapWithNoSSR>
    </div>
  );
}
