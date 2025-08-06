export default function MoviesListSkeleton() {
    return (
        <section className="max-w-7xl mx-auto px-10 py-10 mb-10 animate-pulse">
            {/* Section title */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-40 bg-gray-700 rounded"></div>
            </div>

            {/* Grid placeholders */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        {/* Poster placeholder */}
                        <div className="w-full h-[270px] bg-gray-700 rounded-lg"></div>

                        {/* Title placeholder */}
                        <div className="h-4 w-3/4 bg-gray-700 rounded"></div>

                        {/* Rating placeholder */}
                        <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
