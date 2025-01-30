import React, { useState } from "react";
interface ISearch{
  searchMovie: string;
  onSearch: (e: string) => void;
}
const Search = ({
  searchMovie,
  onSearch,
}: ISearch) => {
  return (
    <div className="search">
      <div>
        <img src="./search-Icon.svg" alt="Search-Icon" />
        <input
          type="text"
          placeholder="Search for Movie"
          value={searchMovie}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
