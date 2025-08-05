// import { useFavoritesStore } from "@/store/favouritesStore";
// import MovieCard from "@/components/ui/MovieCard";
// import Navbar from "@/components/layout/Navbar";
// import ReverseDivider from "@/components/ui/ReverseDivider";
// import Link from 'next/link'

// export default function FavoritesPage() {
//     const favorites = useFavoritesStore((state) => state.favorites);

//     if (!favorites.length) {
//         return <p className="text-white p-10">No favorites yet.</p>;
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-6xl mx-auto px-5 pb-12 pt-25">


//                 <div className="flex justify-between items-center mb-6 px-5">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-white border-b-2 border-[#FFC107] pb-1">
//                         My Favorites
//                     </h2>
//                 </div>

//                 {/* <section >
//                     {favorites.length === 0 ? (
//                         <p className="text-gray-400 text-lg">You haven’t added any favorites yet.</p>
//                     ) : (
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//                             {favorites.map((movie) => (
//                                 <MovieCard key={movie.tmdb_id} {...movie} />
//                             ))}
//                         </div>
//                     )}
//                 </section> */}
//                 <section className="flex flex-col items-center justify-center text-center py-16">
//                     {favorites.length === 0 ? (
//                         <>
//                             <p className="text-gray-400 text-lg mb-4">
//                                 You haven’t added any favorite movies yet.
//                             </p>
//                             <p className="text-gray-300 mb-6">
//                                 Browse our movies and click the <span className="text-[#FFC107] font-semibold">⭐</span> to add them here.
//                             </p>
//                             <Link
//                                 href="/"
//                                 className="bg-[#FFC107] text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors"
//                             >
//                                 Browse Movies
//                             </Link>
//                         </>
//                     ) : (
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//                             {favorites.map((movie) => (
//                                 <MovieCard key={movie.tmdb_id} {...movie} />
//                             ))}
//                         </div>
//                     )}
//                 </section>

//             </div>
//             <ReverseDivider />
//         </div>
//     );

// }


import { useFavoritesStore } from "@/store/favouritesStore";
import MovieCard from "@/components/ui/MovieCard";
import Navbar from "@/components/layout/Navbar";
import ReverseDivider from "@/components/ui/ReverseDivider";
import Link from 'next/link';

export default function FavoritesPage() {
    const favorites = useFavoritesStore((state) => state.favorites);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto px-5 pb-12 min-h-screen pt-25">
                <div className="flex justify-between items-center mb-6 px-5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white border-b-2 border-[#FFC107] pb-1">
                        My Favorites
                    </h2>
                </div>

                <section className="flex flex-col items-center justify-center text-center pt-10 pb-16">
                    {favorites.length === 0 ? (
                        <>
                            <p className="text-gray-400 text-lg mb-4">
                                You haven’t added any favorite movies yet.
                            </p>
                            <p className="text-gray-300 mb-6">
                                Browse our movies and click the <span className="text-[#FFC107] font-semibold">⭐</span> to add them here.
                            </p>
                            <Link
                                href="/dashboard"
                                className="bg-[#FFC107] text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors"
                            >
                                Browse Movies
                            </Link>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {favorites.map((movie) => (
                                <MovieCard key={movie.tmdb_id} {...movie} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <ReverseDivider />
        </div>
    );
}
