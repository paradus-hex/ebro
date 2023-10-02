import React, { useState } from 'react';
import { AiOutlineStar, AiOutlineArrowRight } from 'react-icons/ai';
import { BsHouse } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsStarFill } from 'react-icons/bs';

export default function MyProjectCard({
  projectName,
  address,
  id,
}: {
  projectName: string;
  address: string;
  id: string;
}) {
  const handleProjectArrowClick = () => {
    console.log(`Address ${address}, ProjectName ${projectName}, ID ${id}`);
  };
  const [isFavorite, setIsFavorite] = useState(false);
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
            setIsFavorite((prev) => !prev);
          }}
        >
          {isFavorite ? (
            <BsStarFill className="text-yellow-300 hover:text-yellow-300  transition-colors ease-in-out delay-200" />
          ) : (
            <AiOutlineStar className=" hover:text-yellow-300  transition-colors ease-in-out delay-200"></AiOutlineStar>
          )}
        </div>
        <AiOutlineArrowRight
          onClick={handleProjectArrowClick}
          className=" hover:text-white transition-colors ease-in-out delay-200"
        ></AiOutlineArrowRight>
        <RiDeleteBin2Line className=" hover:text-red-500 transition-colors ease-in-out delay-200"></RiDeleteBin2Line>
      </div>
    </div>
  );
}
