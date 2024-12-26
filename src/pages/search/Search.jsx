import { request } from "@/api";
import Movies from "@/components/movies/Movies";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineFileSearch } from "react-icons/ai";
import { ReactTyped } from "react-typed";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState(""); 
  const { data, isLoading } = useQuery({
    queryKey: ["movie", query], 
    queryFn: () =>
      request
        .get("/search/movie", {
          params: {
            query,
          },
        })
        .then((res) => res.data),
    enabled: !!query,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchValue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSearch}
        className="border rounded-lg shadow-md bg-white p-4 max-w-[800px] mx-auto flex items-center gap-4"
      >
        <ReactTyped
          strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
          className="flex-1 text-xl font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-12 px-4 py-2 border rounded-lg text-black outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Search for movies..."
          />
        </ReactTyped>
        <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition duration-300">
          <CiSearch className="text-xl" />
        </button>
      </form>

      <div className="mt-8 min-h-[400px] flex justify-center items-center">
        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-2">Searching...</p>
          </div>
        )}

        {!isLoading && query && data?.results?.length === 0 && (
          <div className="flex flex-col items-center">
            <AiOutlineFileSearch className="text-4xl text-gray-500" />
            <p className="text-gray-500 mt-2">No movies found.</p>
          </div>
        )}

        {!isLoading && !query && (
          <div className="flex flex-col items-center">
            <AiOutlineFileSearch className="text-4xl text-gray-400" />
            <p className="text-gray-400 mt-2">No content yet. Start searching!</p>
          </div>
        )}

        {!isLoading && data?.results?.length > 0 && <Movies data={data} />}
      </div>
    </div>
  );
};

export default Search;
