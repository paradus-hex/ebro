import React, { useEffect } from 'react';
import { useState } from 'react';
import MyProjectCard from './ProjectCard';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { getProjectsForCarousel } from '../lib/firebasedb';
import { useCreatePageStore } from '../stores/createPageStore';
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
  const { setProjectList } = useCreatePageStore();
  const { getValues, getUser_id } = useSignInPageStore();

  const delFromSelectedCards = (key: string) => {
    const filteredCards = selectedCards.filter((e) => e.key != key);
    setSelectedCards(filteredCards);
  };
  const favSelectedCards = (key: string) => {
    let temp = [...selectedCards];
    const filteredCards = temp.filter((e) => e.key == key);
    filteredCards[0].isFavorite = !filteredCards[0].isFavorite;
    const restOfTheCards = temp.filter((e) => e.key != key);
    let secondaryTemp = [...filteredCards, ...restOfTheCards];
    secondaryTemp.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return b.isFavorite - a.isFavorite;
      }
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });

    setSelectedCards([...secondaryTemp]);
  };
  const fillCarousel = async () => {
    const projects = await getProjectsForCarousel(
      `${getValues().email}_${getUser_id()}`,
    );
    setProjectList(projects);
    setSelectedCards(projects);
  };
  useEffect(() => {}, [selectedCards]);
  useEffect(() => {
    fillCarousel();
  }, []);

  selectedCards.sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return b.isFavorite - a.isFavorite;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
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
              favSelectedCards={favSelectedCards}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
