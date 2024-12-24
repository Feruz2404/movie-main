import { request } from '@/api';
import Genre from '@/components/genre/Genre';
import Movies from '@/components/movies/Movies';
import React, { useEffect, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    request("/discover/movie", {
      params: {
        page,
        with_genres: selectedGenre.join(","),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch movies.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, selectedGenre]);

  useEffect(() => {
    request("/genre/movie/list")
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        setError("Failed to fetch genres.");
        console.error(err);
      });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <p className="text-lg text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className='bg-black text-white mb-6'>
      <Genre data={genres} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
      <Movies data={data} />
      <div className="flex justify-center py-6">
        <Pagination
          page={page}
          onChange={handleChange}
          count={data?.total_pages <= 500 ? data?.total_pages : 500}
          disabled={loading}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              backgroundColor: "#2c2c2c",
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "8px 16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "#ff4040",
                color: "#fff", 
                transform: "scale(1.1)",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#ff4040", 
              color: "#fff", 
              border: "1px solid #ff7373", 
              boxShadow: "0px 0px 10px rgba(255, 64, 64, 0.6)",
              "&:hover": {
                backgroundColor: "#ff7373",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#ff7373",
              fontWeight: "bold",
            },
            "& .MuiPaginationItem-text": {
              fontSize: "14px",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Category;
