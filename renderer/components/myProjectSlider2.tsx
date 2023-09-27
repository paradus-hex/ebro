import React from 'react';
import { useState } from 'react';
import MyProjectCard from './myProjectCard';
export default function myProjectSlider2() {
  const [selectedCards, setselectedCards] = useState<
    { name: string; address: string }[]
  >([
    { name: 'project name1', address: 'project address' },
    { name: 'project name2', address: 'project address' },
    { name: 'project name3', address: 'project address' },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handlePrevImage = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? selectedCards.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === selectedCards.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleIndex = (index: number) => {
    if (index > selectedCards.length - 1) {
      return index - selectedCards.length;
    }
    return index;
  };

  return (
    <div className="flex flex-col items-center w-full bg-blue text-left mt-16">
      <h1>My Project</h1>
      <div className="flex flex-row gap-3 w-[80%]">
        <button
          className=" bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          onClick={handlePrevImage}
        >
          &larr;
        </button>
        <div className="flex flex-row overflow-x-auto">
          <MyProjectCard
            name={selectedCards[handleIndex(currentCardIndex)].name}
            address={selectedCards[handleIndex(currentCardIndex)].address}
          />
        </div>
        <button
          className=" bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          onClick={handleNextImage}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
