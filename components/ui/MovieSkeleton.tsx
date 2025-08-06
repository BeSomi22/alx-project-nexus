export default function MovieSkeleton() {
    return (
        <div className="max-w-5xl mx-auto p-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Poster placeholder */}
                <div className="flex-shrink-0">
                    <div className="w-[260px] h-[390px] bg-gray-800 rounded-2xl" />
                </div>

                {/* Details placeholder */}
                <div className="flex-1 space-y-6">
                    <div className="h-8 bg-gray-800 rounded w-3/4" /> {/* Title */}
                    <div className="h-4 bg-gray-800 rounded w-1/2" /> {/* Tagline */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-800 rounded w-full" />
                        <div className="h-4 bg-gray-800 rounded w-5/6" />
                        <div className="h-4 bg-gray-800 rounded w-2/3" />
                    </div>

                    {/* Movie meta info */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-800 rounded w-3/4" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
