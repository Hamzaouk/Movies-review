import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Cardspage = ({ movie, onRemoveFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if movie is in favorites when component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  // Extract first genre for color coding
  const primaryGenre = movie.Genre?.split(',')[0]?.trim();
  
  // Map genres to color schemes
  const genreColors = {
    "Action": "blue",
    "Drama": "purple",
    "Comedy": "green",
    "Horror": "red",
    "Thriller": "yellow",
    "Romance": "pink",
    "Sci-Fi": "indigo",
    "Adventure": "orange",
    "Fantasy": "teal",
    "Crime": "gray"
  };
  
  // Default color if genre not in map
  const colorScheme = genreColors[primaryGenre] || "blue";
  
  // Dynamic color classes based on genre
  const colorClasses = {
    blue: "border-blue-500 group-hover:border-blue-400 hover:shadow-blue-500/20",
    purple: "border-purple-500 group-hover:border-purple-400 hover:shadow-purple-500/20",
    green: "border-green-500 group-hover:border-green-400 hover:shadow-green-500/20",
    red: "border-red-500 group-hover:border-red-400 hover:shadow-red-500/20",
    yellow: "border-yellow-500 group-hover:border-yellow-400 hover:shadow-yellow-500/20",
    pink: "border-pink-500 group-hover:border-pink-400 hover:shadow-pink-500/20",
    indigo: "border-indigo-500 group-hover:border-indigo-400 hover:shadow-indigo-500/20",
    orange: "border-orange-500 group-hover:border-orange-400 hover:shadow-orange-500/20",
    teal: "border-teal-500 group-hover:border-teal-400 hover:shadow-teal-500/20",
    gray: "border-gray-500 group-hover:border-gray-400 hover:shadow-gray-500/20"
  };
  
  // Badge color based on genre
  const badgeColors = {
    blue: "bg-blue-600 text-blue-100",
    purple: "bg-purple-600 text-purple-100",
    green: "bg-green-600 text-green-100",
    red: "bg-red-600 text-red-100",
    yellow: "bg-yellow-600 text-yellow-100",
    pink: "bg-pink-600 text-pink-100",
    indigo: "bg-indigo-600 text-indigo-100",
    orange: "bg-orange-600 text-orange-100",
    teal: "bg-teal-600 text-teal-100",
    gray: "bg-gray-600 text-gray-100"
  };

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation(); // Stop event propagation
    
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      
      // If this component was rendered in Favoris page, call the provided callback
      if (onRemoveFavorite) {
        onRemoveFavorite(movie.imdbID);
      } else {
        // Dispatch custom event for other components to listen to
        window.dispatchEvent(new Event('favoritesUpdated'));
      }
    } else {
      // Add to favorites
      const movieToAdd = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year,
        imdbRating: movie.imdbRating || "N/A",
        Runtime: movie.Runtime || "N/A",
        Genre: movie.Genre || "N/A",
        Type: movie.Type || "movie"
      };
      localStorage.setItem("favoriteMovies", JSON.stringify([...favorites, movieToAdd]));
      setIsFavorite(true);
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new Event('favoritesUpdated'));
    }
  };

  return (
    <div className="group block relative transition-all duration-300 transform hover:scale-105 rounded-xl overflow-hidden bg-gray-900 border-2 hover:shadow-2xl cursor-pointer">
      <Link 
        to={`/Detailpage/movie/${movie.imdbID}`} 
        className={`block ${colorClasses[colorScheme]}`}
      >
        <div className="relative h-80 overflow-hidden">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Rating badge - always visible */}
          <div className="absolute top-3 right-3 z-10">
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="flex items-center px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="text-white font-bold">{movie.imdbRating}</span>
              </div>
            )}
          </div>
          
          {/* Year badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${badgeColors[colorScheme]}`}>
              {movie.Year}
            </span>
          </div>
        </div>
        
        <div className="p-4 relative">
          {/* Title with gradient text effect */}
          <h3 className="text-xl font-bold truncate mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-gray-400 transition-colors duration-300">
            {movie.Title}
          </h3>
          
          {/* Info row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {movie.Runtime && movie.Runtime !== "N/A" && (
                <div className="flex items-center text-xs">
                  <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-400">{movie.Runtime}</span>
                </div>
              )}
            </div>
            
            {/* Type badge */}
            {movie.Type && (
              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full capitalize">
                {movie.Type}
              </span>
            )}
          </div>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.Genre && movie.Genre.split(',').map((genre, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 transition-colors duration-300"
              >
                {genre.trim()}
              </span>
            ))}
          </div>
          
          {/* Hover reveal button */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-medium">
              Voir les détails
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button (visible on hover) */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-12 right-3 z-20 p-2 rounded-full shadow-lg transition-all duration-300 ${
          isFavorite 
            ? 'bg-red-600 text-white visible opacity-100' 
            : 'bg-gray-900/80 text-white opacity-0 group-hover:opacity-100 hover:bg-red-600'
        }`}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart size={18} fill={isFavorite ? "white" : "none"} />
      </button>
    </div>
  );
};

export default Cardspage;