import { MovieType } from "@/interfaces";
import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import PopularMoviesSkeleton from "../ui/PopularMoviesSkeleton";
import Image from "next/image";
import Link from "next/link";


export default function PopularMovies() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const autoplay = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    );
    const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
        autoplay.current,
    ]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) {
                    throw new Error("API URL is not configured");
                }

                const endpoint = `${apiUrl}/api/v1/movies/popular/`;
                console.log("Fetching from:", endpoint);

                const res = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'ngrok-skip-browser-warning': 'true',
                    },
                    mode: 'cors',
                    cache: 'no-store',
                });

                // Check if response is ok
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                // Check if response is JSON
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                }

                const data = await res.json();

                // Adjust based on API shape
                setMovies(data.data?.results || data.results || []);
            } catch (err: any) {
                console.error("Failed to fetch popular movies:", err);
                setError(err.message || "Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    if (loading) {
        return <PopularMoviesSkeleton />;
    }

    return (
        <section className="w-full max-w-7xl mx-auto py-3 px-4 md:px-10 pt-11 mt-10">
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-semibold">⚠️ Failed to load movies:</p>
                    <p>{error}</p>
                    <p className="text-sm mt-2">
                        Check console for more details and verify your API endpoint.
                    </p>
                </div>
            )}

            {movies.length === 0 && !error && (
                <p className="text-gray-500">No movies found.</p>
            )}

            {movies.length > 0 && (
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.tmdb_id}
                                className="relative min-w-full h-[400px] rounded-lg overflow-hidden shadow-lg group"
                            >

                                {/* Backdrop Image */}
                                <Image
                                    src={movie.backdrop_url || "/fallback-backdrop.jpg"}
                                    alt={`${movie.title} backdrop`}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Dark overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Poster + Info */}
                                <div className="absolute bottom-4 left-4 flex items-end gap-4">
                                    {/* Poster */}
                                    <Link
                                        href={`/movie/${movie.tmdb_id}`}
                                        key={movie.tmdb_id}
                                        className="flex-shrink-0"
                                    >
                                        <Image
                                            src={movie.poster_url || "/fallback-poster.jpg"}
                                            alt={movie.title}
                                            width={120}
                                            height={180}
                                            className="rounded-lg shadow-lg object-cover"
                                        />
                                    </Link>
                                    {/* Movie Details */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                                        <div className="flex items-center gap-2 text-yellow-300">
                                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                                            <span className="text-gray-300">• {movie.release_year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}




