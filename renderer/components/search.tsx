import React, { useEffect, useRef } from 'react';
import SearchRecommendationBox from './searchRecommendationBox';
import { useState } from 'react';
// import { useSearch } from '../context/searchContext';
import { projects } from '../lib/constants';
import { useCreatePageStore } from '../stores/createPageStore';

export default function Search() {
  const [search, setSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { getProjectList } = useCreatePageStore();
  const searchClick = () => {
    setSearch(true);
  };

  const searchRef = useRef(null);
  const check = (e) => {
    setSuggestions(
      getProjectList().filter((project) =>
        project.projectName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()),
      ),
    );
    console.log('suggestions in check', suggestions);
  };

  useEffect(() => {
    const clickAway = (e) => {
      // console.log(searchRef?.current?.contains(e.target));
      if (!searchRef?.current?.contains(e.target)) {
        setSearch(false);
      }
    };
    document.addEventListener('mousedown', clickAway);
    return () => {
      document.removeEventListener('mousedown', clickAway);
    };
  });

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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onFocus={() => {
              searchClick();
            }}
            onChange={(e) => check(e)}
            type="text"
            placeholder="Search for project..."
            className="pl-16 pr-4 py-4 rounded-xl bg-white border-0 w-full outline-none shadow-md shadow-gray-300"
          />
        </div>

        {/* <!-- INPUT --> */}
        {search && (
          <SearchRecommendationBox
            searchRef={searchRef}
            suggestions={suggestions}
          />
        )}
      </div>
    </div>
  );
}
