import React, { useEffect, useState } from 'react';
import { AiOutlineStar, AiOutlineArrowRight } from 'react-icons/ai';
import { BsHouse } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsStarFill } from 'react-icons/bs';
import {
  isFav,
  deleteProject,
  deleteProjectPhotosFromCloud,
} from '../lib/firebasedb';
import { useRouter } from 'next/router';
import { useSignInPageStore } from '../stores/signInPageStore';

export default function MyProjectCard({
  projectName,
  address,
  id,
  isFavourite,
  delFromSelectedCards,
  favSelectedCards,
}: {
  projectName: string;
  address: string;
  id: string;
  isFavourite: boolean;
  delFromSelectedCards: (key: string) => void;
  favSelectedCards: (key: string) => void;
}) {
  const router = useRouter();
  const { getUser_id, getValues } = useSignInPageStore();
  const setFav = (id: string) => {
    // console.log('is fav', id);
  };
  const setNotFave = (id: string) => {
    // console.log('is not fav', id);
  };
  const handleProjectArrowClick = () => {
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          projectID: id,
          passedProjectName: projectName,
          intention: 'update',
          prev: 'home',
          userID: `${getValues().email}_${getUser_id()}`,
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
      className=" p-5 relative  flex justify-start items-center text-left w-[220px] h-[120px] rounded-lg  m-2 "
    >
      <div className="w-[90%]   ">
        <BsHouse className="text-gray-700 w-[40px] h-[35px] mb-5"></BsHouse>
        <h1 className="text-white font-bold truncate">{projectName}</h1>
        <p className="text-gray font-bold text-sm truncate">{address}</p>
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
                favSelectedCards(id);
              }}
              className="text-yellow-300 hover:text-yellow-300  transition-colors ease-in-out delay-200 mt-2"
            />
          ) : (
            <AiOutlineStar
              onClick={(e) => {
                setFav(id);
                isFav(id, true);
                favSelectedCards(id);
              }}
              className=" hover:text-yellow-300  transition-colors ease-in-out delay-200 mt-2"
            ></AiOutlineStar>
          )}
        </div>
        <AiOutlineArrowRight
          onClick={handleProjectArrowClick}
          className=" hover:text-white transition-colors ease-in-out delay-200"
        ></AiOutlineArrowRight>
        <RiDeleteBin2Line
          onClick={(e) => {
            deleteProjectPhotosFromCloud(
              `images/${
                getValues().email
              }_${getUser_id()}/${projectName}_${id}`,
            );
            delFromSelectedCards(id);
            deleteProject(id);
          }}
          className=" hover:text-red-500 transition-colors ease-in-out delay-200 w-5 h-5 mb-2"
        ></RiDeleteBin2Line>
      </div>
    </div>
  );
}
