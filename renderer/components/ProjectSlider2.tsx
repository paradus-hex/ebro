import React, { useEffect } from 'react';
import { useState } from 'react';
import MyProjectCard from './ProjectCard';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
export default function ProjectSlider2() {
  const [selectedCards, setselectedCards] = useState<
    {
      key: string;
      name: string;
      address: string;
    }[]
  >([
    { name: 'project name1', address: 'project address', key: '10' },
    { name: 'project name2', address: 'project address', key: '20' },
    { name: 'project name3', address: 'project address', key: '30' },
    { name: 'project name4', address: 'project address', key: '40' },
    { name: 'project name5', address: 'project address', key: '50' },
    { name: 'project name6', address: 'project address', key: '60' },
    { name: 'project name7', address: 'project address', key: '70' },
    { name: 'project name8', address: 'project address', key: '80' },
    { name: 'project name9', address: 'project address', key: '90' },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  useEffect(() => {}, [currentCardIndex]);

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
    <div className="pt-9 ">
      <h1>My Project</h1>
      <Splide
        hasTrack={true}
        options={{
          // rewind: true,
          type: 'loop',
          perPage: 3,

          // width: 800,
          gap: '1rem',
          autoWidth: true,
        }}
        aria-label="My Favorite Images"
      >
        {selectedCards.map((card, index) => (
          <SplideSlide key={card.key} className="m-5">
            <MyProjectCard
              id={selectedCards[index].key}
              name={selectedCards[index].name}
              address={selectedCards[index].address}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
