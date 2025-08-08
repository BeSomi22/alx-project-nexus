import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Toast from "@/components/ui/Toast";
import PopularMovies from "@/components/common/PopularMovies";
import Divider from "@/components/ui/Divider";
import TrendingMovies from "@/components/sections/TrendingMovies";
import FavoriteCarousel from "@/components/sections/FavoriteCarousel";
import TopRatedMovies from "@/components/common/TopRatedMovies";
import ReverseDivider from '@/components/ui/ReverseDivider';
import MoviesList from "@/components/common/MovieList";

export default function Dashboard() {
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success") === "signIn") {
            alert("Sign In successful! Welcome to CinePick.");
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("cinepick_token");
        if (!token) {
            router.push("/auth/signin");
        }
    }, [router]);

    return (
        <div className="min-h-screen w-full bg-[#0F172A] text-white flex flex-col items-center justify-center">
            <Navbar />
            <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            <PopularMovies />
            <Divider />
            <TrendingMovies />
            {/* Favorites Carousel */}
            <FavoriteCarousel />
            <MoviesList />
            <TopRatedMovies />
            <ReverseDivider />
        </div>
    );
}