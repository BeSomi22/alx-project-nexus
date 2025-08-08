import Link from "next/link";
import { MovieCardProps } from "@/interfaces";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavoritesStore } from "@/store/favouritesStore";
import { useEffect } from "react";


export default function MovieCard({
    tmdb_id,
    title,
    poster_url,
    vote_average,
    genres,
}: MovieCardProps) {
    const { addFavorite, removeFavorite, isFavorite, } = useFavoritesStore();

    const favorite = isFavorite(tmdb_id);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        if (favorite) {
            removeFavorite(tmdb_id);
        } else {
            addFavorite({ tmdb_id, title, poster_url, vote_average, genres });
        }
    };

    return (
        <Link
            href={`/movie/${tmdb_id}`}
            className="group block rounded-xl overflow-hidden shadow-lg cursor-pointer select-none relative"
        >
            {/* Poster */}
            <div className="relative w-full h-80">
                <img
                    src={poster_url || "/img/fallback-poster.png"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"

                />

                {/* Favorite button */}
                <button
                    onClick={toggleFavorite}
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-black/80 transition"
                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {favorite ? (
                        <FaHeart className="text-red-500 text-lg" />
                    ) : (
                        <FaRegHeart className="text-white text-lg" />
                    )}
                </button>

                {/* Rating badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-bl from-yellow-400 via-red-500 to-pink-600 text-white font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 text-sm shadow-md select-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                    <span>{vote_average.toFixed(1)}</span>
                </div>

                {/* Hover overlay */}
                <div
                    className="
                        absolute inset-x-0 bottom-0
                        bg-gradient-to-t from-black/90 to-transparent
                        p-4
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        pointer-events-none
                    "
                >
                    <h3 className="text-white font-bold text-lg truncate">{title}</h3>
                    {genres && genres.length > 0 && (
                        <p className="text-gray-300 text-sm truncate">{genres.join(", ")}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
