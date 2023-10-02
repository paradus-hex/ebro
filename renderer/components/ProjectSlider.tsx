import React, { useEffect } from 'react';
import { useState } from 'react';
import MyProjectCard from './ProjectCard';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getProjectsForCarousel } from '../lib/firebasedb';
import { set } from 'zod';
export default function ProjectSlider2() {
  const [selectedCards, setSelectedCards] = useState<
    {
      projectName: any;
      address: any;
      key: any;
      updatedAt: any;
      isFavorite: any;
    }[]
  >([]);
  const delFromSelectedCards = (key: string) => {
    const filteredCards = selectedCards.filter((e) => e.key != key);
    setSelectedCards(filteredCards);
  };
  const fillCarousel = async () => {
    const projects = await getProjectsForCarousel('user3'); // TODO: get username from context
    console.log('Projects: ', projects);
    setSelectedCards(projects);
  };
  useEffect(() => {
    fillCarousel();
  }, []);

  selectedCards.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateA > dateB ? 1 : -1;
  });

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
              projectName={selectedCards[index].projectName}
              address={selectedCards[index].address}
              isFavourite={selectedCards[index].isFavorite}
              delFromSelectedCards={delFromSelectedCards}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
