import React from 'react';
import { useRouter } from 'next/router';

export default function SearchListElement({
  name,
  address,
  projectId,
}: {
  projectId: string;
  name: string;
  address: string;
}) {
  const router = useRouter();
  const handleProjectArrowClick = () => {
    router.push(
      `/create?params=${encodeURIComponent(
        JSON.stringify({
          projectID: projectId,
          passedProjectName: name,
          intention: 'update',
          prev: 'home',
        }),
      )}`,
    );
  };
  return (
    <li
      onClick={handleProjectArrowClick}
      className="grid grid-cols-10 gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50"
    >
      <div className=" pl-8  border-solid border-gray flex flex-row">
        <h3 className="text-gray-900 font-medium text-md">{name}</h3>

        {/* <p className="text-gray-600 mt-1 font-regular text-sm">{address}</p> */}
      </div>
    </li>
  );
}
