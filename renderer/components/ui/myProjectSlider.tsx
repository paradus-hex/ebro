import React from 'react';
import MyProjectCard from './myProjectCard';

export default function MyProjectSlider() {
  return (
    <div className="w-full flex flex-row overflow-x-scroll bg-black">
      <MyProjectCard />
      <MyProjectCard />
      <MyProjectCard />
    </div>
  );
}
