import { useFavorites } from "@/components/saved/FavoritesContext";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import Empty from "@/assets/images/mates.mp4";

const Latest = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="py-6 container">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[530px] text-center">
          <video
            src={Empty}
            alt=""
            className="mb-4"
            style={{ width: "30%", height: "20%" }}
            autoPlay
            muted
            loop
          />
          <p className="text-lg text-gray-500">
            Start from the home page - you can search for movies or category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {favorites.slice(0, 12).map((movie) => (
            <div
              key={movie.id}
              className="bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Movie Poster */}
              <img
                className="rounded-t-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />

              {/* Remove from Favorites Icon */}
              <button
                onClick={() => removeFromFavorites(movie)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full transition duration-300"
                aria-label="Remove from favorites"
              >
                <FaBookmark className="text-red-500 text-[25px]" />
              </button>

              {/* Movie Info */}
              <div className="p-4">
                <p className="line-clamp-1 font-semibold text-white text-lg">
                  {movie.title}
                </p>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Latest;
