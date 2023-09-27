import React from 'react';

export default function SearchListElement({
  name,
  address,
}: {
  name: string;
  address: string;
}) {
  return (
    <li className="grid grid-cols-10 gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50">
      <div className="col-start-1 col-end-11 pl-8  border-solid border-gray">
        <h3 className="text-gray-900 font-medium text-md">{name}</h3>
        <p className="text-gray-600 mt-1 font-regular text-sm">{address}</p>
      </div>
    </li>
  );
}
