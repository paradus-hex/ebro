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

  return (
    <div className="pt-9 ">
      <h1 className="mb-5 tracking-wider text-2xl font-extrabold">
        My Projects
      </h1>
      <Splide
        hasTrack={true}
        options={{
          perPage: 3,
          gap: '1rem',
          autoWidth: true,
        }}
        aria-label="My Favorite Images"
      >
        {selectedCards.map((card, index) => (
          <SplideSlide
            key={card.key}
            className="m-5 slideRow shadow-md rounded-xl"
          >
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
