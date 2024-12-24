import React from "react";

const Genre = ({ data, setSelectedGenre, selectedGenre }) => {
  const handleChange = (id) => {
    if (selectedGenre.includes(id)) {
      setSelectedGenre((prev) => prev.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedGenre((prev) => [...prev, id]);
    }
  };

  return (
    <div className="container flex gap-3 overflow-x-auto py-4 mb-8">
      <div className="flex gap-3">
        {data?.map((item) => (
          <div
            onClick={() => handleChange(item.id)}
            key={item.id}
            className={`whitespace-nowrap px-4 py-2 border border-[#C61F1F] text-white rounded-full hover:cursor-pointer select-none
              ${selectedGenre.includes(item.id) ? "bg-[#C61F1F] text-white shadow-lg" : "bg-[#333]"}
              transition-all duration-200 ease-in-out transform hover:scale-105`}
            aria-selected={selectedGenre.includes(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .container::-webkit-scrollbar {
          height: 6px; /* Horizontal scroll height */
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #ff4040; /* Scroll thumb color */
          border-radius: 8px; /* Rounded corners */
        }
        .container::-webkit-scrollbar-thumb:hover {
          background-color: #ff7373; /* Hover effect color */
        }
        .container::-webkit-scrollbar-track {
          background: transparent; /* Track color */
        }
      `}</style>
    </div>
  );
};

export default Genre;
