import React from 'react';
import MyProjectCard from './myProjectCard';
import Search from './search';

export default function MyProjectSlider() {
  return (
    <div className="pt-9">
      <Search />
      <div>
        <h1 className="text-left py-5 font-semibold">My Projects</h1>
      </div>

      <div className="flex flex-row overflow-x-auto">
        <MyProjectCard name="name" address="address" />
        <MyProjectCard name="name" address="address" />
        <MyProjectCard name="name" address="address" />
      </div>
    </div>
  );
}
