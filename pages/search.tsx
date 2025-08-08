import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import MovieCard from "@/components/ui/MovieCard";
import ReverseDivider from "@/components/ui/ReverseDivider";
import Divider from "@/components/ui/Divider";

export default function SearchPage() {
    const router = useRouter();
    const { q, page } = router.query;

    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const parsedPage = parseInt(page as string) || 1;
        setCurrentPage(parsedPage);
    }, [page]);

    useEffect(() => {
        if (!q) return;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL not configured");

                const url = `${apiUrl.replace(/\/$/, "")}/api/v1/movies/search?q=${encodeURIComponent(
                    q as string
                )}&page=${currentPage}`;

                const res = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();

                if (Array.isArray(data.data?.results)) {
                    setMovies(data.data.results);
                } else {
                    setMovies([]);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch search results");
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [q, currentPage]);

    const handlePageChange = (newPage: number) => {
        router.push({
            pathname: "/search",
            query: { q, page: newPage },
        });
    };

    return (
        <div>
            <Navbar />

            <h2 className="text-2xl font-bold text-white mb-6 pt-25 px-10">
                Search results for:{" "}
                <span className="text-[#FFC107]">
                    {q ? (q as string).charAt(0).toUpperCase() + (q as string).slice(1) : ""}
                </span>
            </h2>

            <Divider />

            <div className="max-w-6xl min-h-screen mx-auto px-5">
                {loading && <SearchResultsSkeleton />}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && movies.length === 0 && (
                    <p className="text-gray-400">No movies found. Try another search.</p>
                )}

                <div
                    className="
                        grid
                        gap-6
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-5
                    "
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.tmdb_id}
                            tmdb_id={movie.tmdb_id}
                            title={movie.title}
                            poster_url={
                                movie.poster_url && movie.poster_url.trim() !== ""
                                    ? movie.poster_url
                                    : "/img/fallback-poster.png"
                            }
                            vote_average={movie.vote_average}
                            genres={
                                movie.primary_genre_name
                                    ? [movie.primary_genre_name]
                                    : []
                            }
                        />
                    ))}
                </div>

                {!loading && movies.length > 0 && (
                    <div className="flex justify-center items-center gap-6 mt-10">
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            ⬅ Previous
                        </button>

                        <span className="text-white text-lg font-medium">
                            {currentPage}
                        </span>

                        <button
                            className="bg-yellow-500 hover:bg-gray-600 text-black py-2 px-4 rounded"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next ➡
                        </button>
                    </div>
                )}
            </div>

            <ReverseDivider />
        </div>
    );
}
