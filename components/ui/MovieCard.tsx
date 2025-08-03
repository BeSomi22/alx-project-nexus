// import Link from 'next/link'

// interface MovieCardProps {
//     id: number;
//     title: string;
//     poster: string;
//     rating: number;
//     genre?: string;
// }

// export default function MovieCard({ id, title, poster, rating, genre }: MovieCardProps) {
//     return (
//         <Link href={`/movie/${id}`} passHref>
//             <div
//                 className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-lg 
//                    hover:shadow-2xl hover:scale-105 transition-transform duration-300 
//                    cursor-pointer flex flex-col"
//             >
//                 {/* Poster */}
//                 <img
//                     src={poster}
//                     alt={title}
//                     className="w-full h-72 object-cover"
//                     loading="lazy"
//                 />

//                 {/* Content */}
//                 <div className="p-4 flex flex-col flex-1">
//                     {/* Title */}
//                     <h3 className="font-semibold text-lg mb-1">{title}</h3>

//                     {/* Optional Genre */}
//                     {genre && (
//                         <p className="text-sm text-gray-400 mb-2">{genre}</p>
//                     )}

//                     {/* Rating */}
//                     <div className="mt-auto inline-block bg-gradient-to-bl from-[#FFC107] via-[#FF3D3D] to-[#E50914] text-black font-bold px-3 py-1 rounded-full tracking-wide">
//                         ⭐ {rating.toFixed(1)}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

import Link from "next/link";

interface MovieCardProps {
    id: number;
    title: string;
    poster: string;
    rating: number;
    genre?: string;
}

export default function MovieCard({
    id,
    title,
    poster,
    rating,
    genre,
}: MovieCardProps) {
    return (
        <Link href={`/movie/${id}`} passHref>
            <div
                className="group relative overflow-hidden rounded-2xl 
                   bg-[#1E293B] shadow-lg hover:shadow-2xl cursor-pointer 
                   transition-transform duration-300 hover:scale-[1.03]"
            >
                {/* Poster */}
                <div className="relative">
                    <img
                        src={poster}
                        alt={title}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Rating badge */}
                    <div
                        className="absolute top-3 left-3 bg-gradient-to-bl from-[#FFC107] via-[#FF3D3D] to-[#E50914] 
                       text-white font-bold px-3 py-1 rounded-full text-sm shadow-md"
                    >
                        ⭐ {rating.toFixed(1)}
                    </div>

                    {/* Gradient overlay on hover */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-20">
                    <h3
                        className="font-bold text-lg text-white group-hover:text-[#FFC107] 
                       transition-colors duration-300 line-clamp-1"
                    >
                        {title}
                    </h3>
                    {genre && (
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            {genre}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
