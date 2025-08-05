import Link from "next/link";

interface LogoProps {
    size?: string;
}

export default function Logo({ size }: LogoProps) {
    return (
        <Link
            href="/dashboard"
            className={`
        font-extrabold 
        ${size || "text-2xl"} 
        bg-gradient-to-tr 
        from-[#FFC107] 
        via-[#FF3D3D] 
        to-[#E50914] 
        bg-clip-text 
        text-transparent 
        tracking-wide 
        drop-shadow-lg
      `}
        >
            CinePick
        </Link>
    );
}
