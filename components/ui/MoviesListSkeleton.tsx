export default function MoviesListSkeleton() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-10 mb-10 animate-pulse w-full">
            {/* Section title placeholder */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-52 bg-gray-700 rounded"></div>
            </div>

            {/* Grid placeholders */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        {/* Poster placeholder: wider and taller */}
                        <div className="w-full h-[330px] bg-gray-700 rounded-lg"></div>

                        {/* Title placeholder */}
                        <div className="h-5 w-4/5 bg-gray-700 rounded"></div>

                        {/* Rating placeholder */}
                        <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Pagination buttons placeholder */}
            <div className="flex justify-between gap-4 mt-10">
                <div className="h-10 w-28 bg-gray-700 rounded"></div>
                <div className="h-10 w-28 bg-yellow-500 rounded"></div>
            </div>
        </section>
    );
}
