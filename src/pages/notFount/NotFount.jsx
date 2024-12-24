import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col min-h-[600px] bg-gray-900 text-white py-10 px-4">
      <div className="flex items-center justify-center mb-6">
        <FaExclamationTriangle className="text-red-800 text-6xl mr-3 animate-bounce" />
        <h1 className="text-8xl font-extrabold text-red-800 mb-6 animate-pulse">404</h1>
      </div>
      <p className="text-2xl mb-8 text-center">Page not found</p>
      <button
        onClick={() => navigate("/")}
        className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
        aria-label="Go back to home page"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
