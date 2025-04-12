import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cardspage from '../components/Cardspage';

function Favoris() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from local storage
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
      setFavorites(storedFavorites);
      setIsLoading(false);
    };

    // Initial load
    loadFavorites();

    // Custom event listener for favorite changes
    const handleFavoritesChange = () => {
      loadFavorites();
    };

    // Add custom event listener
    window.addEventListener('favoritesUpdated', handleFavoritesChange);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesChange);
    };
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('favoriteMovies');
    setFavorites([]);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Function to handle removal of a single favorite
  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-white">Chargement des favoris...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Mes Films Favoris</h1>
        
        {favorites.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Tout supprimer
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 rounded-xl">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Vous n'avez pas encore de favoris</h2>
          <p className="text-gray-400 mb-6">Ajoutez des films et séries à vos favoris pour les retrouver ici</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block transition-colors"
          >
            Découvrir des films
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-400 mb-6">Vous avez {favorites.length} film(s) dans vos favoris</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {favorites.map(movie => (
              <div key={movie.imdbID} className="relative">
                <Cardspage 
                  movie={movie} 
                  onRemoveFavorite={handleRemoveFavorite} 
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favoris;