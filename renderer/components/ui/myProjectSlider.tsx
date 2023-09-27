import React from 'react';
import MyProjectCard from './myProjectCard';

export default function MyProjectSlider() {
  return (
    <div className="pt-9">
      <div>
        <h1 className="text-left py-5 font-semibold">My Projects</h1>
      </div>

      <div
        className="w-full flex flex-row justify-center  overflow-x-auto bg-black p-5"
        id="journal-scroll"
      >
        <MyProjectCard />
        <MyProjectCard />
        <MyProjectCard />
        {/* <MyProjectCard />
        <MyProjectCard />
        <MyProjectCard />
        <MyProjectCard /> */}
      </div>
    </div>
  );
}
