import React, { useState } from "react";

const Search = () => {
  const [searchMovie, setSearchMovie] = useState("");
  return (
    <div className="search">
      <div>
        <img src="./search-Icon.svg" alt="Search-Icon" />
        <input
          type="text"
          placeholder="Search for Movie"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
      </div>
      
    </div>
  );
};

export default Search;
