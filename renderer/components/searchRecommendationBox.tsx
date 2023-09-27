import React from 'react';
import SearchListElement from './searchListElement';

export default function SearchRecommendationBox() {
  return (
    <ul className="rounded-md shadow-md bg-white absolute left-0 right-0 -bottom-18 mt-3 p-3">
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
      <SearchListElement name="Energy Elixir" address="project address" />
    </ul>
  );
}
