import React from 'react';
import SearchListElement from './searchListElement';

export default function SearchRecommendationBox({
  searchRef,
}: {
  searchRef: React.MutableRefObject<any>;
}) {
  return (
    <ul
      ref={searchRef}
      className="rounded-md shadow-md bg-white absolute left-0 right-0 -bottom-18 mt-3 p-3 transition ease-in-out delay-150 "
    >
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
    </ul>
  );
}
