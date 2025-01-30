//@ts-nocheck
import React from "react";

interface Movie {
  title: string;
  id: number;
  original_language: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
interface MovieCardProps {
  movie: Movie;
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/no-poster.png"
        }
        alt={movie.title}
      />
      <div className="mt-4">
        <h3>{movie.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="./Star_Icon.svg" alt="Star" />
          </div>
          <span className="font-bold">
            {movie.vote_average ? movie.vote_average.toFixed(2) : "N/A"}
          </span>
          <span>.</span>
          <p className="lang">{movie.original_language}</p>
          <span>.</span>

          <p className="year">{movie.release_date.substring(0,4)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
