import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cardspage from "../components/Cardspage";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("");
    const { search } = useLocation();
    const inputname = new URLSearchParams(search).get("search") ;

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?s=${inputname}&apikey=e20e14d9`
                );
                const basicMovies = res.data.Search || [];

                const moviesWithDetails = await Promise.all(
                    basicMovies.map(async (movie) => {
                        const detailRes = await axios.get(
                            `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e20e14d9`
                        );
                        return detailRes.data;
                    })
                );

                setMovies(moviesWithDetails);
            } catch (err) {
                console.error("Erreur lors de la récupération des films", err);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [inputname]);

    const filteredMovies = selectedGenre
        ? movies.filter((movie) =>
            movie.Genre?.toLowerCase().includes(selectedGenre.toLowerCase())
        )
        : movies;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                Résultats pour : <span className="text-red-600">{inputname}</span>
            </h2>

            <div className="mb-6">
                <select
                    id="genreFilter"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full md:w-64 bg-slate-950 border border-slate-950 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
                >
                    <option value="">Tous les genres</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Aventure</option>
                    <option value="Comedy">Comédie</option>
                    <option value="Drama">Drame</option>
                    <option value="Horror">Horreur</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Science-fiction</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Fantasy">Fantasy</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center mt-10 animate-pulse">Chargement...</div>
            ) : filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredMovies.map((movie) => (
                      <Cardspage key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-500 mt-10">
                    Aucun film trouvé pour ce genre.
                </p>
            )}
        </div>
    );
};

export default Home;