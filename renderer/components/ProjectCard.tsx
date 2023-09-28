import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsHouse } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';

export default function MyProjectCard({
  name,
  address,
  id,
}: {
  name: string;
  address: string;
  id: string;
}) {
  return (
    <div
      key={id}
      className=" p-5 grid-cols-5 flex justify-start items-center text-left min-w-[200px] min-h-[150px] rounded-lg  m-2 transition ease-in-out delay-1000 start-translate-x-0 end-translate-x-10"
    >
      <div className="col-span-4 bgh-green-600 w-full">
        <BsHouse className="w-[50px] h-[50px] mb-5"></BsHouse>
        <h1>{name}</h1>
        <p>{address}</p>
      </div>
      <div className="col-span-1 bgh-red-500 flex flex-col justify-between h-full">
        <AiOutlineStar></AiOutlineStar>
        <RiDeleteBin2Line></RiDeleteBin2Line>
      </div>
    </div>
  );
}
