import React, { useEffect, useState } from 'react';
import { AiOutlineStar, AiOutlineArrowRight } from 'react-icons/ai';
import { BsHouse } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsStarFill } from 'react-icons/bs';
import { isFav, deleteProject } from '../lib/firebasedb';
import { useRouter } from 'next/router';

export default function MyProjectCard({
  projectName,
  address,
  id,
  isFavourite,
  delFromSelectedCards,
}: {
  projectName: string;
  address: string;
  id: string;
  isFavourite: boolean;
  delFromSelectedCards: (key: string) => void;
}) {
  const router = useRouter();
  const setFav = (id: string) => {
    // console.log('is fav', id);
  };
  const setNotFave = (id: string) => {
    // console.log('is not fav', id);
  };
  const handleProjectArrowClick = () => {
    // console.log(
    //   `Address ${address}, ProjectName ${projectName}, ID ${id}, Isfav ${isFavourite}`,
    // );
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          key: id,
          passedProjectName: projectName,
          intention: 'update',
        }),
      )}`,
    );
  };
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  useEffect(() => {
    setIsFavoriteState(isFavourite);
  }, []);

  return (
    <div
      key={id}
      className=" p-5 relative  flex justify-start items-center text-left min-w-[200px] min-h-[150px] rounded-lg  m-2 "
    >
      <div className="w-[90%]   ">
        <BsHouse className="text-gray-700 w-[50px] h-[50px] mb-5"></BsHouse>
        <h1 className="text-white font-bold ">{projectName}</h1>
        <p className="text-gray font-bold text-sm">{address}</p>
      </div>
      <div className="w-[10%] h-[120px] flex flex-col justify-between ">
        <div
          onClick={() => {
            setIsFavoriteState((prev) => !prev);
          }}
        >
          {isFavoriteState ? (
            <BsStarFill
              onClick={(e) => {
                setNotFave(id);
                isFav(id, false);
              }}
              className="text-yellow-300 hover:text-yellow-300  transition-colors ease-in-out delay-200"
            />
          ) : (
            <AiOutlineStar
              onClick={(e) => {
                setFav(id);
                isFav(id, true);
              }}
              className=" hover:text-yellow-300  transition-colors ease-in-out delay-200"
            ></AiOutlineStar>
          )}
        </div>
        <AiOutlineArrowRight
          onClick={handleProjectArrowClick}
          className=" hover:text-white transition-colors ease-in-out delay-200"
        ></AiOutlineArrowRight>
        <RiDeleteBin2Line
          onClick={(e) => {
            delFromSelectedCards(id);
            deleteProject(id);
          }}
          className=" hover:text-red-500 transition-colors ease-in-out delay-200"
        ></RiDeleteBin2Line>
      </div>
    </div>
  );
}
