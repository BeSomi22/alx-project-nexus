import { useFavoritesStore } from "@/store/favouritesStore";
import { useState, useEffect } from "react";
import Carousel from "@/components/ui/Carousal";
import MovieCard from "@/components/ui/MovieCard";

export default function FavoriteCarousel() {
    const favorites = useFavoritesStore((state) => state.favorites);
    const [isMounted, setIsMounted] = useState(false);

    // Ensures component only renders on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || favorites.length === 0) return null;

    return (
        <section className="w-full mx-auto px-10 sm:px-6 lg:px-10 py-10 mb-10">
            <div className="flex justify-between items-center mb-6 px-2 sm:px-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white border-b-2 border-[#FFC107] pb-1">
                    My Favorites
                </h2>
            </div>

            <Carousel>
                {favorites.map((movie) => (
                    <div
                        key={movie.tmdb_id}
                        className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[250px] max-w-[90vw] flex-shrink-0"
                    >
                        <MovieCard {...movie} />
                    </div>
                ))}
            </Carousel>
        </section>

    );
}
