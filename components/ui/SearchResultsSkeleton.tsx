// export default function SearchResultsSkeleton() {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
//             {Array.from({ length: 10 }).map((_, i) => (
//                 <div
//                     key={i}
//                     className="animate-pulse flex flex-col items-center bg-[#1E293B] rounded-lg overflow-hidden shadow-md"
//                 >
//                     {/* Poster placeholder */}
//                     <div className="w-full h-60 bg-gray-700"></div>

//                     {/* Title placeholder */}
//                     <div className="w-3/4 h-4 bg-gray-600 mt-4 rounded"></div>

//                     {/* Rating placeholder */}
//                     <div className="w-1/4 h-4 bg-gray-600 mt-2 rounded"></div>
//                 </div>
//             ))}
//         </div>
//     );
// }

export default function SearchResultsSkeleton() {
    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="animate-pulse flex flex-col items-center bg-[#1E293B] rounded-lg overflow-hidden shadow-md"
                >
                    {/* Poster placeholder */}
                    <div className="w-full h-60 bg-gray-700"></div>

                    {/* Title placeholder */}
                    <div className="w-3/4 h-4 bg-gray-600 mt-4 rounded"></div>

                    {/* Rating placeholder */}
                    <div className="w-1/4 h-4 bg-gray-600 mt-2 rounded"></div>
                </div>
            ))}
        </div>
    );
}
