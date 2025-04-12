import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, Trash2, ArrowLeft } from "lucide-react";

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if the movie is in favorites
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        setIsFavorite(favorites.some(fav => fav.imdbID === id));
    }, [id]);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?i=${id}&apikey=e20e14d9`
                );
                setMovie(res.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des détails", err);
                setError("Impossible de charger les détails du film");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleToggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        
        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => fav.imdbID !== id);
            localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            // Add to favorites
            const movieToAdd = {
                imdbID: movie.imdbID,
                Title: movie.Title,
                Poster: movie.Poster,
                Year: movie.Year,
                imdbRating: movie.imdbRating,
                Runtime: movie.Runtime,
                Genre: movie.Genre,
                Type: movie.Type
            };
            const updatedFavorites = [...favorites, movieToAdd];
            localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
            setIsFavorite(true);
        }
        
        // Dispatch custom event to notify other components about the change
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const goBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-400">Chargement du film...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto mt-20 bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Erreur</h2>
                <p className="text-white">{error}</p>
            </div>
        );
    }

    if (!movie) {
        return <div className="text-center mt-20 text-lg font-semibold text-gray-500">Aucune information disponible</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                
                {/* Backdrop Image with Gradient Overlay */}
                <div 
                    className="absolute top-0 left-0 w-full h-96 bg-cover bg-center opacity-20 z-0"
                    style={{ 
                        backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
                        filter: "blur(40px)"
                    }}
                ></div>
                
                <div className="relative z-10">
                    {/* Movie Content */}
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                        <div className="md:flex">
                            {/* Poster Column */}
                            <div className="md:w-1/3 p-6">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                                    <img
                                        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                                        alt={movie.Title}
                                        className="relative w-full h-full object-cover rounded-lg shadow-xl"
                                    />
                                </div>
                                
                                {/* Ratings Card */}
                                <div className="mt-6 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-yellow-400 font-bold text-3xl">{movie.imdbRating}</span>
                                            <span className="text-gray-400 text-lg">/10</span>
                                        </div>
                                        <div className="text-yellow-400 text-xl">
                                            {"★".repeat(Math.floor(movie.imdbRating / 2))}
                                            {movie.imdbRating % 2 >= 0.5 ? "½" : ""}
                                            {"☆".repeat(5 - Math.ceil(movie.imdbRating / 2))}
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        IMDb: {movie.imdbVotes} votes
                                    </div>
                                </div>
                                
                                {/* Favorites Button */}
                                <div className="mt-6">
                                    <button 
                                        onClick={handleToggleFavorite}
                                        className={`w-full py-3 rounded-lg flex items-center justify-center font-semibold ${
                                            isFavorite 
                                                ? "bg-red-600 hover:bg-red-700 text-white" 
                                                : "bg-gray-700 hover:bg-gray-600 text-white"
                                        } transition-colors duration-300`}
                                    >
                                        {isFavorite ? (
                                            <>
                                                <Trash2 size={20} className="mr-2" />
                                                Retirer des favoris
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={20} className="mr-2" />
                                                Ajouter aux favoris
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Details Column */}
                            <div className="md:w-2/3 p-6 md:p-8">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                    {movie.Title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm">{movie.Year}</span>
                                    <span className="px-3 py-1 bg-gray-900/40 text-gray-300 rounded-full text-sm">{movie.Runtime}</span>
                                    <span className="px-3 py-1 bg-gray-900/40 text-gray-300 rounded-full text-sm">{movie.Rated}</span>
                                </div>
                                
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {movie.Genre.split(', ').map(genre => (
                                            <span key={genre} className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mt-6 bg-gray-900/30 rounded-lg p-4">
                                    <h2 className="text-xl font-semibold text-gray-200 mb-2">Synopsis</h2>
                                    <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-gray-900/30 rounded-lg p-4">
                                        <h2 className="text-lg font-semibold text-gray-200 mb-2">Équipe de production</h2>
                                        <div className="space-y-3">
                                            <p>
                                                <span className="font-medium text-gray-400">Réalisateur:</span><br />
                                                <span className="text-white">{movie.Director}</span>
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-400">Scénariste:</span><br />
                                                <span className="text-white">{movie.Writer}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-900/30 rounded-lg p-4">
                                        <h2 className="text-lg font-semibold text-gray-200 mb-2">Casting principal</h2>
                                        <div className="space-y-1">
                                            {movie.Actors.split(', ').map(actor => (
                                                <p key={actor} className="text-white">{actor}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {movie.Awards !== "N/A" && (
                                    <div className="mt-6 bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-4">
                                        <h2 className="text-lg font-semibold text-yellow-300 mb-1">Récompenses</h2>
                                        <p className="text-yellow-100">{movie.Awards}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;