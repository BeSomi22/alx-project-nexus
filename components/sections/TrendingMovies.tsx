import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import TrendingMoviesSkeleton from "../ui/TrendingMoviesSkeleton";
import Image from "next/image";

interface TrendingMovie {
    tmdb_id: number;
    title: string;
    poster_url: string;
    vote_average: number;
}

export default function TrendingMovies() {
    const [movies, setMovies] = useState<TrendingMovie[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL is not configured");

                const endpoint = `${apiUrl}/api/v1/movies/trending/`;
                // console.log("Fetching Trending Movies from:", endpoint);

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
                setMovies(data.data?.results || data.results || []);
            } catch (err: any) {
                console.error("Failed to fetch trending movies:", err);
                setError(err.message || "Failed to fetch trending movies");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);


    if (loading) {
        return <TrendingMoviesSkeleton />;
    }

    return (
        <section className="max-w-full mx-auto px-10 py-20 h-[50%]">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-5">
                    Trending Now
                </h2>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-semibold">⚠️ Failed to load trending movies:</p>
                    <p>{error}</p>
                </div>
            )}

            {/* Carousel */}
            {movies.length > 0 && (
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4 sm:gap-6">
                        {movies.slice(0, 10).map((movie, index) => (
                            <Link
                                href={`/movie/${movie.tmdb_id}`}
                                key={movie.tmdb_id}
                                className="flex-shrink-0"
                            >
                                <div className="relative flex items-end gap-2">
                                    {/* Ranking Number */}
                                    <span
                                        className={`font-extrabold ${index === 0
                                            ? "text-[6rem] sm:text-[8rem] lg:text-[8rem]"
                                            : "text-[4rem] sm:text-[6rem] lg:text-[6rem]"
                                            }`}
                                        style={{
                                            WebkitTextStroke: "3px #FFC107",
                                            color: "transparent",
                                            lineHeight: "0.85",
                                        }}
                                    >
                                        {index + 1}
                                    </span>

                                    {/* Poster */}
                                    {/* <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"> */}
                                    <div
                                        className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                        style={{
                                            width: index === 0 ? "208px" : "176px",
                                            height: index === 0 ? "288px" : "256px",
                                        }}
                                    >


                                        <Image
                                            src={movie.poster_url}
                                            alt={movie.title}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Rating Badge */}
                                        <div className="absolute top-2 right-2 bg-gradient-to-bl from-[#FFC107] via-[#FF3D3D] to-[#E50914] text-white font-bold px-2 py-0.5 rounded-full text-xs shadow-md">
                                            ⭐ {movie.vote_average.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                                {/* Movie Title */}
                                <p className="mt-2 text-center text-white font-semibold text-xs sm:text-sm lg:text-base truncate w-full">
                                    {movie.title}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Buttons container */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={scrollPrev}
                            className="bg-[#1E293B] text-white p-3 rounded-full hover:bg-[#FFC107] hover:text-black transition"
                        >
                            ◀
                        </button>
                        <button
                            onClick={scrollNext}
                            className="bg-[#1E293B] text-white p-3 rounded-full hover:bg-[#FFC107] hover:text-black transition"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}



