import Button from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center text-center py-28 px-4 md:px-0 overflow-hidden"
        >

            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-bg.jpeg"
                    alt="CinePick Background"
                    width={1920}
                    height={1080}
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl animate-fadeIn mt-5">
                <h1 className="font-extrabold text-5xl md:text-6xl bg-gradient-to-tr from-[#FFC107] via-[#FF3D3D] to-[#E50914] bg-clip-text text-transparent tracking-wide drop-shadow-lg">
                    CinePick
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-gray-300 font-light italic">
                    Discover top-rated movies, hidden gems, and personalized recommendations tailored just for you.
                </p>

                {/* Search Bar */}
                <div className="mt-6 flex items-center bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="flex-grow px-4 py-3 text-black outline-none"
                    />
                    <button className="bg-gradient-to-tl from-[#FFC107] to-[#E50914] text-white px-6 py-3 font-semibold hover:opacity-90 transition">
                        Search
                    </button>

                </div>

                {/* CTA Button */}
                <Button variant="outline" size="lg" className="mx-2 my-6" >
                    Get Started
                </Button>
            </div>
        </div>
    )
}