import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/Spineer";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import axios from "axios";
import { useDebounce } from 'react-use'

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchMovie), 500, [searchMovie])
  useEffect(() => {
    if (!searchMovie) {
      return;
    }
    getMoviesByName();
  }, [debouncedSearchTerm]);
  const getMoviesByName = async () => {
    try {
      console.log(errorFlag);

      setErrorMessage("");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchMovie}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setMovies(response.data.results);
      console.log({ response });
      if (response.data.results.length == 0) {
        setErrorFlag(true);
        throw new Error("Sorry! Movie not found.");
      }
    } catch (error) {
      if (errorFlag == true) {
        setErrorMessage("Sorry! Movie not found.");
      }
      console.log(error);
    }
  };
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
            <Search searchMovie={searchMovie} onSearch={setSearchMovie} />
          </header>
          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies
                  .filter((movie) =>
                    movie.title
                      .toLowerCase()
                      .includes(searchMovie.toLowerCase())
                  )
                  .map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
