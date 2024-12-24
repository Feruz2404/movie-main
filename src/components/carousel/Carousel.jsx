import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

const Carousel = ({ data = { results: [] } }) => {  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  const handleOnlineClick = (title, type) => {
    const searchQuery = encodeURIComponent(title);
    let searchURL = "";
    
    if (type === "trailer") {
      searchURL = `https://www.youtube.com/results?search_query=${searchQuery} trailer`;
    } else {
      searchURL = `https://www.google.com/search?q=${searchQuery}`;
    }

    window.open(searchURL, "_blank");
  };

  return (
    <div className="my-5 container mx-auto">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        navigation={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {data.results.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${item?.backdrop_path}`}
                alt="Backdrop"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                  {item.title || "No Title"}
                </h2>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white text-[18px] px-8 py-2 rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-2xl"
                    onClick={() => handleOnlineClick(item.title, "trailer")}
                  >
                    Trailer
                  </button>
                  <button
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[18px] px-8 py-2 rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-2xl"
                    onClick={() => handleOnlineClick(item.title, "online")}
                  >
                    Online
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5"
      >
        {data.results?.map((item) => (
          <SwiperSlide key={item.id} className="cursor-pointer">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item.backdrop_path}`}
              alt="Thumbnail"
              className="w-full h-[80px] sm:h-[100px] md:h-[120px] object-cover rounded-md hover:opacity-80 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(Carousel);
