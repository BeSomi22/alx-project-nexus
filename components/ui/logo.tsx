// components/ui/Logo.tsx
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            // className="font-extrabold bg-gradient-to-bl from-[#FFC107] via-[#FF3D3D] to-[#E50914] bg-clip-text text-transparent tracking-wide ml-2 text-2xl sm:text-2xl md:text-2xl"
            className="font-extrabold text-2xl md:text-2xl sm:text-2xl bg-gradient-to-tr from-[#FFC107] via-[#FF3D3D] to-[#E50914] bg-clip-text text-transparent tracking-wide drop-shadow-lg"
        // className="font-extrabold bg-gradient-to-bl from-white via-[#FFC107] via-[#FF3D3D] to-[#E50914] bg-clip-text text-transparent tracking-wide ml-2 text-2xl sm:text-2xl md:text-2xl"
        // className="text-3xl font-extrabold bg-gradient-to-r from-[#FFC107] to-[#E50914] bg-clip-text text-transparent tracking-wide"
        >
            CinePick
        </Link>
    );
}
