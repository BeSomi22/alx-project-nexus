import { useEffect, useState } from "react";
import MovieCard from '@/components/ui/MovieCard'

interface TopRatedMovie {
    tmdb_id: number;
    title: string;
    poster_url: string;
    vote_average: number;
    genres?: string[];
}

export default function TopRatedMovies() {
    const [movies, setMovies] = useState<TopRatedMovie[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL is not configured");

                const endpoint = `${apiUrl}/api/v1/movies/top-rated/`;
                const res = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                    mode: "cors",
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                }

                const data = await res.json();
                setMovies((data.data?.results || data.results || []).slice(0, 15));
            } catch (err: any) {
                console.error("Failed to fetch top rated movies:", err);
                setError(err.message || "Failed to fetch top rated movies");
            } finally {
                setLoading(false);
            }
        };

        fetchTopRatedMovies();
    }, []);

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-5">
                        Top Rated Movies
                    </h2>
                </div>
                <p className="text-gray-400">Loading top rated movies...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold text-white mb-4">Top Rated Movies</h2>
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-semibold">⚠️ Failed to load top rated movies:</p>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    if (movies.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold text-white mb-4">⭐ Top Rated Movies</h2>
                <p className="text-gray-400">No top rated movies found.</p>
            </section>
        );
    }

    return (
        <section className="max-w-full mx-auto  px-10 py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-5">
                    Top Rated Movies
                </h2>
            </div>

            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-1     
                    md:grid-cols-3    
                    lg:grid-cols-5  
                "
            >
                {movies
                    .slice(0, 15)
                    .map((movie) => (
                        <MovieCard
                            key={movie.tmdb_id}
                            tmdb_id={movie.tmdb_id}
                            title={movie.title}
                            poster_url={movie.poster_url}
                            vote_average={movie.vote_average}
                            genres={movie.genres}
                        />
                    ))}

            </div>
        </section>
    );
}


