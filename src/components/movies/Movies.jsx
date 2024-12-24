import React from "react";
import Moviesitem from "./Moviesitem";
import { useFavorites } from "../saved/FavoritesContext";

const Movies = ({ data, isLoading, error }) => {
  const { addToFavorites } = useFavorites();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies: {error.message}</div>;
  }

  return (
    <div className="container py-4">
      <div className="grid grid-cols-4 gap-5">
        {data?.results?.slice(0, 12).map((movie) => (
          <div key={movie.id} className="bg-slate-900 rounded-lg p-3">
            <Moviesitem {...movie} onAddToFavorites={addToFavorites} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
