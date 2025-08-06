import Head from "next/head";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import HeroSection from "@/components/sections/heroSection";
import TrendingMovies from "@/components/sections/TrendingMovies";
import Divider from "@/components/ui/Divider";
import MoreReasons from "@/components/sections/MoreReassons";
import FAQ from "@/components/sections/F&Q";
import ReverseDivider from "@/components/ui/ReverseDivider";

export default function Home() {
  return (
    <>
      <Head>
        <title>CinePick - Your Movie Recommendations</title>
        <meta
          name="description"
          content="Discover top-rated movies and personalized recommendations with CinePick."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen w-full bg-[#0D1B2A] text-white flex flex-col ">
        <nav
          className="fixed sm:top-2.5 md:top-5.5 top-3 left-1/2 transform -translate-x-1/2 z-50 w-[98%] max-w-4xl bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-3xl flex justify-between items-center"
        >
          {/* Logo */}
          <div className="cursor-pointer">
            <Logo size="text-2xl md:text-3xl" />
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 border border-[#FFC107] text-[#FFC107] rounded hover:bg-[#FFC107] hover:text-black transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-[#FFC107] text-black font-bold rounded hover:bg-yellow-400 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <HeroSection />
        <Divider />
        <TrendingMovies />
        <MoreReasons />
        <FAQ />
        <ReverseDivider />
      </div>
    </>
  );
}

