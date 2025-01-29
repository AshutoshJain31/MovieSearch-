//@ts-nocheck
import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/search";
import Spinner from "./components/Spineer";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  console.log({ movies });

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (response.status != 200) {
        throw new Error(`Failed to fetch movies`);
      }
      const data = await response.json();
      console.log({ data });
      if (data.response === false) {
        setErrorMessage(data.error || "Failed to fetch Movie");
      }
      setMovies(data.results || []);
    } catch (error) {
      console.log(`error fetching movies ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className="patten">
        <div className="wrapper">
          <header>
            <img src="./Hero_Img.png" alt="Header_Logo" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => {
                  return <li className="text-white">{movie.title}</li>;
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
