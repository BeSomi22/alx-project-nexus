
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import ReverseDivider from "@/components/ui/ReverseDivider";

interface Genre {
    id: number;
    tmdb_id: number;
    name: string;
    slug: string;
    is_primary: boolean;
    weight: number;
}

interface MovieDetailType {
    tmdb_id: number;
    title: string;
    overview: string;
    release_year?: string;
    vote_average: number;
    poster_url: string;
    backdrop_url: string;
    genres?: Genre[];
    tagline?: string;
    runtime_formatted?: string;
    homepage?: string;
    imdb_url?: string;
    tmdb_url?: string;
    original_language: string;

}



export default function MovieDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [movie, setMovie] = useState<MovieDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                if (!apiUrl) throw new Error("API URL is not configured");

                const endpoint = `${apiUrl}/api/v1/movies/${id}/`;
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
                setMovie(data.data || data || null);
            } catch (err: any) {
                console.error("Failed to fetch movie details:", err);
                setError(err.message || "Failed to fetch movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
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
            <section className="max-w-5xl mx-auto p-6 pt-25 pb-20 text-white">
                <Navbar />
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <Image
                            src={movie.poster_url}
                            alt={movie.title}
                            width={260}
                            height={390}
                            className="rounded-2xl shadow-lg"
                            priority
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-6 text-gray-300">
                        <h1 className="text-4xl md:text-5xl text-white font-extrabold mb-4 tracking-tight">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="italic text-gray-400 mb-6 text-lg max-w-3xl">{`"${movie.tagline}"`}</p>
                        )}
                        <p className="leading-relaxed text-lg">{movie.overview}</p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                            <div>
                                <span className="font-semibold text-white">Release Date:</span> {movie.release_year}
                            </div>
                            {movie.runtime_formatted && (
                                <div>
                                    <span className="font-semibold text-white">Runtime:</span> {movie.runtime_formatted}
                                </div>
                            )}
                            <div>
                                <span className="font-semibold text-white">Rating:</span> ⭐ {movie.vote_average.toFixed(1)}
                            </div>
                            <div>
                                <span className="font-semibold text-white">Original Language:</span> {movie.original_language.toUpperCase()}
                            </div>
                            {movie.genres && movie.genres.length > 0 && (
                                <div className="col-span-2">
                                    <span className="font-semibold text-white">Genres:</span>{" "}
                                    {movie.genres.map((g) => g.name).join(", ")}
                                </div>
                            )}
                        </div>

                        {/* External Links */}
                        {/* <div className="flex items-center space-x-6 mt-6">
                           
                    </div> */}
                    </div>
                </div>
            </section >
            <ReverseDivider />
        </div >

    );
}
