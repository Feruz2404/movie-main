import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/components/saved/FavoritesContext";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const Moviesitem = ({ id, title, poster_path, release_date }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    // Check if the movie is already in favorites
    const isMovieFavorite = favorites.some((movie) => movie.id === id);
    setIsFavorite(isMovieFavorite);
  }, [favorites, id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites({ id });
    } else {
      addToFavorites({ id, title, poster_path, release_date });
    }
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
      {/* Movie Poster */}
      <img
        className="rounded-t-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        src={`${IMAGE_URL}${poster_path}`}
        alt={title}
        onClick={() => navigate(`/movie/${id}`)}
      />

      {/* Favorite Icon */}
      <button
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full transition duration-300"
      >
        {isFavorite ? (
          <FaBookmark className="text-red-500 text-[25px]" />
        ) : (
          <FaRegBookmark className="text-gray-300 text-[25px]" />
        )}
      </button>

      {/* Movie Info */}
      <div className="p-4">
        <p className="line-clamp-1 font-semibold text-white text-lg">{title}</p>
        <p className="text-slate-400 text-sm font-medium mt-1">{release_date}</p>
      </div>
    </div>
  );
};

export default memo(Moviesitem);
