import { useEffect, useState, useRef } from "react";
import MoviesListSkeleton from "../ui/MoviesListSkeleton";
import MovieCard from "@/components/ui/MovieCard";

interface Movie {
    tmdb_id: number;
    title: string;
    poster_url: string;
    vote_average: number;
    genres?: string[];
}

export default function MoviesList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [shouldScroll, setShouldScroll] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const PAGE_SIZE = 20;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL is not configured");

                const res = await fetch(`${apiUrl}/api/v1/movies/?page=${page}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();

                const results = Array.isArray(data.data?.results)
                    ? data.data.results
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data)
                            ? data
                            : [];

                setMovies(results);
            } catch (err: any) {
                console.error("Failed to fetch movies:", err);
                setError(err.message || "Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    // Scroll effect runs after movies load and when shouldScroll is true
    useEffect(() => {
        if (!loading && shouldScroll && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
            setShouldScroll(false);
        }
    }, [loading, shouldScroll]);

    const handleNext = () => {
        if (movies.length === PAGE_SIZE) {
            setPage((prev) => prev + 1);
            setShouldScroll(true);
        }
    };

    const handlePrevious = () => {
        setPage((prev) => {
            const newPage = Math.max(prev - 1, 1);
            if (newPage !== prev) setShouldScroll(true);
            return newPage;
        });
    };

    if (loading) return <MoviesListSkeleton />;

    if (error)
        return (
            <div className="p-10 text-red-500">
                <p>Failed to load movies:</p>
                <p>{error}</p>
            </div>
        );

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-10 py-10 mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white border-b-2 border-[#FFC107] pb-1">
                    All Movies
                </h2>
            </div>

            {movies.length === 0 ? (
                <p className="text-gray-400">No movies found.</p>
            ) : (
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.tmdb_id} {...movie} />
                    ))}
                </div>
            )}

            <div className="flex justify-between gap-4 mt-10">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer disabled:opacity-50"
                >
                    ⬅ Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={movies.length < PAGE_SIZE}
                    className="px-4 py-2 bg-yellow-500 text-black font-semibold cursor-pointer rounded disabled:opacity-50"
                >
                    Next ➡
                </button>
            </div>
        </section>
    );
}
