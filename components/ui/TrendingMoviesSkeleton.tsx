export default function TrendingMoviesSkeleton() {
    return (
        <section className="w-full mx-auto px-10 py-20 animate-pulse">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-40 bg-gray-700 rounded"></div>
            </div>

            {/* Carousel placeholders */}
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex-shrink-0">
                        <div className="flex items-end gap-2">
                            {/* Ranking number placeholder */}
                            <div className="h-[6rem] sm:h-[8rem] w-10 bg-gray-700 rounded"></div>

                            {/* Poster placeholder */}
                            <div
                                className={`bg-gray-700 rounded-lg shadow-lg ${index === 0
                                        ? "w-40 sm:w-52 lg:w-52 h-56 sm:h-72 lg:h-72"
                                        : "w-36 sm:w-44 lg:w-44 h-52 sm:h-64 lg:h-64"
                                    }`}
                            ></div>
                        </div>

                        {/* Movie title placeholder */}
                        <div className="mt-2 h-4 bg-gray-700 rounded w-24 sm:w-32"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
