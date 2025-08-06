import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import MovieCard from "@/components/ui/MovieCard";
import ReverseDivider from "@/components/ui/ReverseDivider";
import Divider from "@/components/ui/Divider";

export default function SearchPage() {
    const router = useRouter();
    const { q } = router.query;

    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!q) return;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL not configured");

                const url = `${apiUrl.replace(/\/$/, "")}/api/v1/movies/search?q=${encodeURIComponent(q as string)}`;
                // console.log("Fetching:", url);

                const res = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                // console.log("Response status:", res.status);

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();

                // console.log("Response data:", data);

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
    }, [q]);

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

            <div className="max-w-6xl min-h-screen mx-auto px-5 ">
                {loading && <SearchResultsSkeleton />}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && movies.length === 0 && (
                    <p className="text-gray-400">
                        No movies found. Try another search.
                    </p>
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

                            // Fallback image if poster_url is missing or empty
                            poster_url={
                                movie.poster_url && movie.poster_url.trim() !== ""
                                    ? movie.poster_url
                                    : "/fallback-poster.jpg"
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

            </div>

            <ReverseDivider />
        </div>
    );
}
