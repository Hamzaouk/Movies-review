import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cardspage from "../components/Cardspage";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const { search } = useLocation();
    const inputname = new URLSearchParams(search).get("search");

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let res;
                if (inputname) {
                    res = await axios.get(
                        `http://www.omdbapi.com/?s=${inputname}&apikey=e20e14d9`
                    );
                } else {
                    res = await axios.get(
                        `http://www.omdbapi.com/?s=Avengers&apikey=e20e14d9`
                    );
                }

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

    // Filtrage des films selon les sélections
    const filteredMovies = movies.filter((movie) => {
        const matchesGenre =
            !selectedGenre ||
            movie.Genre?.toLowerCase().includes(selectedGenre.toLowerCase());

        const matchesType =
            !selectedType ||
            (selectedType === "movie" && movie.Type === "movie") ||
            (selectedType === "series" && movie.Type === "series") ||
            (selectedType === "anime" &&
                (movie.Genre?.toLowerCase().includes("animation") ||
                    movie.Genre?.toLowerCase().includes("anime")));

        return matchesGenre && matchesType;
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-semibold mb-6">
                {inputname ? (
                    <>
                        Résultats pour :{" "}
                        <span className="text-red-600">{inputname}</span>
                    </>
                ) : (
                    <>Tendances du moment 🎥</>
                )}
            </h2>

            {/* Filtres */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
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

                <select
                    id="typeFilter"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full md:w-64 bg-slate-950 border border-slate-950 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
                >
                    <option value="">Tous les types</option>
                    <option value="movie">Films</option>
                    <option value="series">Séries</option>
                    <option value="anime">Anime</option>
                </select>
            </div>

            {/* Affichage des films */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="ml-4 text-white">Chargement des films...</p>
                </div>
            ) : filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {filteredMovies.map((movie) => (
                        <Cardspage key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-white text-xl">Aucun film trouvé.</p>
                </div>
            )}
        </div>
    );
};

export default Home;