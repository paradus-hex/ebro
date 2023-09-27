import React, { useEffect, useRef } from 'react';
import SearchRecommendationBox from './searchRecommendationBox';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState(false);
  const searchClick = () => {
    setSearch(true);
  };

  const searchRef = useRef(null);

  useEffect(() => {
    const clickAway = (e) => {
      // setSearch(searchRef.current.contains(e.target));
      console.log(searchRef?.current?.contains(e.target));
      if (!searchRef?.current?.contains(e.target)) {
        setSearch(false);
      }
      // console.log(e.target);
    };
    document.addEventListener('mousedown', clickAway);
    return () => {
      document.removeEventListener('mousedown', clickAway);
    };
  });
  console.log('search');
  return (
    <div className="px-12 flex flex-row w-full">
      <div className="relative">
        {/* <!-- INPUT --> */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 flex items-center px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onFocus={() => {
              searchClick();
            }}
            type="text"
            placeholder="Search for elixir..."
            className="pl-16 pr-4 py-4 rounded-md shadow-md bg-white border-0 w-full outline-none"
          />
        </div>

        {/* <!-- INPUT --> */}
        {search && <SearchRecommendationBox searchRef={searchRef} />}
      </div>
    </div>
  );
}
