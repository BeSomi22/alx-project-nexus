export default function PopularMoviesSkeleton() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 mt-10 animate-pulse">

            {/* Fake carousel slides */}
            <div className="flex gap-4 overflow-hidden pt-10">
                {[...Array(3)].map((_, idx) => (
                    <div
                        key={idx}
                        className="relative min-w-full h-[400px] rounded-lg overflow-hidden bg-gray-800"
                    >
                        {/* Backdrop placeholder */}
                        <div className="absolute inset-0 bg-gray-700" />

                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        {/* Poster + Info placeholders */}
                        <div className="absolute bottom-4 left-4 flex items-end gap-4">
                            {/* Poster placeholder */}
                            <div className="w-[120px] h-[180px] bg-gray-700 rounded-lg shadow-lg" />

                            {/* Movie info placeholder */}
                            <div className="space-y-2">
                                <div className="h-5 w-40 bg-gray-700 rounded" />
                                <div className="h-4 w-24 bg-gray-700 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
