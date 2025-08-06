import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MovieType } from "@/interfaces";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Carousel from "@/components/ui/Carousal";
import MovieCard from "@/components/ui/MovieCard";
import ReverseDivider from "@/components/ui/ReverseDivider";


export default function MovieDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [movie, setMovie] = useState<MovieType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [similarMovies, setSimilarMovies] = useState<MovieType[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        if (!id) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;

        const commonHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        };

        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const endpoint = `${apiUrl}/api/v1/movies/${id}/`;
                const res = await fetch(endpoint, { headers: commonHeaders, mode: "cors" });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                }

                const data = await res.json();
                setMovie(data.data || data || null);
            } catch (err: any) {
                console.error("Failed to fetch movie details:", err);
                setError(err.message || "Failed to fetch movie details");
            } finally {
                setLoading(false);
            }
        };

        const fetchSimilarMovies = async () => {
            try {
                const endpoint = `${apiUrl}/api/v1/movies/${id}/similar/`;
                const res = await fetch(endpoint, { headers: commonHeaders, mode: "cors" });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                }

                const data = await res.json();
                setSimilarMovies(
                    Array.isArray(data.data?.similar_movies) ? data.data.similar_movies : []
                );
            } catch (err) {
                console.error("Failed to fetch similar movies:", err);
            }
        };

        const fetchRecommendedMovies = async () => {
            try {
                const endpoint = `${apiUrl}/api/v1/movies/${id}/recommendations/`;
                const res = await fetch(endpoint, { headers: commonHeaders, mode: "cors" });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Server returned non-JSON response");
                }

                const data = await res.json();
                setRecommendedMovies(
                    Array.isArray(data.data?.recommendations) ? data.data.recommendations : []
                );
            } catch (err) {
                console.error("Failed to fetch recommended movies:", err);
            }
        };

        fetchMovieDetails();
        fetchSimilarMovies();
        fetchRecommendedMovies();
    }, [id]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className=" min-h-screen text-white text-center p-10">Loading movie details...</div>
            </div>
        );
    }


    if (error)
        return (
            <div className="p-10 text-red-500">
                <p>Failed to load movie details:</p>
                <p>{error}</p>
            </div>
        );

    if (!movie) return <p className="text-white p-10">Movie not found.</p>;

    return (
        <div>
            {/* Movie Details */}
            <section
                className="relative w-full text-white">
                <Navbar />

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-10">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <Image
                            src={movie.poster_url}
                            alt={movie.title}
                            width={280}
                            height={420}
                            className="rounded-2xl shadow-2xl border border-white/10"
                            priority
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="italic text-gray-300 text-lg">{`"${movie.tagline}"`}</p>
                        )}

                        <p className="leading-relaxed text-base md:text-lg text-gray-200 max-w-3xl">
                            {movie.overview}
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-lg text-sm md:text-base">
                            <div>
                                <span className="font-semibold text-white">Release Year:</span>{" "}
                                {movie.release_year}
                            </div>
                            {movie.runtime_formatted && (
                                <div>
                                    <span className="font-semibold text-white">Runtime:</span>{" "}
                                    {movie.runtime_formatted}
                                </div>
                            )}
                            <div>
                                <span className="font-semibold text-white">Rating:</span> ⭐{" "}
                                {movie.vote_average.toFixed(1)}
                            </div>
                            <div>
                                <span className="font-semibold text-white">Language:</span>{" "}
                                {movie.original_language.toUpperCase()}
                            </div>
                            {movie.genres && movie.genres.length > 0 && (
                                <div className="col-span-2">
                                    <span className="font-semibold text-white">Genres:</span>{" "}
                                    {movie.genres.map((g) => g.name).join(", ")}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Movies */}
            {similarMovies.length > 0 && (
                <section className="max-w-6xl mx-auto mt-12 px-6 py-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-5">
                            Similar Movies
                        </h2>
                    </div>
                    <Carousel>
                        {similarMovies.map((movie) => (
                            <div key={movie.tmdb_id} className="min-w-[180px] flex-shrink-0">
                                <MovieCard
                                    tmdb_id={movie.tmdb_id}
                                    title={movie.title}
                                    poster_url={movie.poster_url}
                                    vote_average={movie.vote_average}
                                    genres={[]}
                                />
                            </div>
                        ))}
                    </Carousel>
                </section>
            )}

            {/* Recommended movies */}
            {recommendedMovies.length > 0 && (
                <section className="max-w-6xl mx-auto mt-12 px-6 py-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit ml-5">
                            Recommended Movies
                        </h2>
                    </div>
                    <Carousel>
                        {recommendedMovies.map((movie) => (
                            <div key={movie.tmdb_id} className="min-w-[180px] flex-shrink-0">
                                <MovieCard
                                    tmdb_id={movie.tmdb_id}
                                    title={movie.title}
                                    poster_url={movie.poster_url}
                                    vote_average={movie.vote_average}
                                    genres={[]} // optional
                                />
                            </div>
                        ))}
                    </Carousel>
                </section>
            )}
            <ReverseDivider />
        </div >

    );
}
