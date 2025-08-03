import Link from 'next/link';
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface TrendingMovie {
    id: number;
    title: string;
    poster: string;
    rating: number;
}

interface TrendingMoviesProps {
    movies: TrendingMovie[];
}

export default function TrendingMovies({ movies }: TrendingMoviesProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="max-w-full mx-auto px-4 py-12 h-[50%]"
        // className="max-w-7xl mx-auto px-4 py-12"
        >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white border-b border-[#FFC107] pb-1 w-fit">
                    Trending Now
                </h2>

            </div>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 sm:gap-6">
                    {movies.slice(0, 10).map((movie, index) => (
                        <Link
                            href={`/movie/${movie.id}`}
                            key={movie.id}
                            className="flex-shrink-0"
                        >
                            <div className="relative flex items-end gap-2">
                                {/* Ranking Number */}
                                <span
                                    className={`font-extrabold ${index === 0
                                        ? "text-[5rem] sm:text-[7rem] lg:text-[9rem]"
                                        : "text-[4rem] sm:text-[6rem] lg:text-[8rem]"
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
                                <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className={`${index === 0
                                            ? "w-40 sm:w-52 lg:w-52 h-56 sm:h-72 lg:h-72" // Slightly smaller on lg
                                            : "w-36 sm:w-44 lg:w-44 h-52 sm:h-64 lg:h-64" // Smaller on lg as well
                                            } object-cover`}
                                        loading="lazy"
                                    />
                                    {/* Rating Badge */}
                                    <div className="absolute top-2 right-2 bg-gradient-to-bl from-[#FFC107] via-[#FF3D3D] to-[#E50914] text-white font-bold px-2 py-0.5 rounded-full text-xs shadow-md">
                                        ⭐ {movie.rating.toFixed(1)}
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

                {/* Buttons container - centered */}
                <div className="flex justify-center gap-4">
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
        </section>
    );
}

