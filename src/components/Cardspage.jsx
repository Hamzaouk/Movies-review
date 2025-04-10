import React from "react";
import { Link } from "react-router-dom";

const Cardspage = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.imdbID}`} 
      className="block transition-all duration-300 transform hover:scale-105 hover:z-10 rounded-lg overflow-hidden shadow-lg bg-gray-800 border border-gray-700 hover:shadow-xl hover:border-orange-500"
    >
      <div className="relative h-80 overflow-hidden">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-400">Image non disponible</span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded-md">
            {movie.Year}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-white truncate mb-1">{movie.Title}</h3>
        
        <div className="flex items-center gap-2 text-sm mb-2">
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-red-600">{movie.imdbRating}</span>
            </div>
          )}
          <span className="text-gray-400 text-xs">{movie.Runtime}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.Genre && movie.Genre.split(',').map((genre, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
            >
              {genre.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Cardspage;