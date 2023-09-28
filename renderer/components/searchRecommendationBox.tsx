import React from 'react';
import SearchListElement from './searchListElement';

export default function SearchRecommendationBox({
  searchRef,
  suggestions,
}: {
  searchRef: React.MutableRefObject<any>;
  suggestions: any[];
}) {
  return (
    <ul
      ref={searchRef}
      className="z-50 rounded-md shadow-md bg-white absolute left-0 right-0 -bottom-18 mt-3 p-3 transition ease-in-out delay-150 "
    >
      {suggestions.length != 0
        ? suggestions.map((project, index) => {
            return (
              <SearchListElement
                name={project.name}
                address={project.address}
                key={index}
              />
            );
          })
        : 'No results found'}
    </ul>
  );
}
