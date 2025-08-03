import Head from "next/head";
import MovieCard from "@/components/ui/MovieCard";
import HeroSection from "@/components/sections/heroSection";
import TrendingMovies from "@/components/sections/TrendingMovies";
import Divider from "@/components/ui/Divider";


const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "/inception.jpeg", // add your images in /public/posters/
    rating: 8.8,
    genre: "Sci-Fi"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "/dark-knight.jpeg",
    rating: 9.0,
    genre: "Action"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/interstellar.jpeg",
    rating: 8.6,
    genre: "Sci-Fi"
  },
  {
    id: 4,
    title: "Parasite",
    poster: "/parasite.jpeg",
    rating: 8.6,
    genre: "Thriller"
  },
  { id: 5, title: "Avatar: The Way of Water", poster: "/avatar2.jpeg", rating: 7.8 },
  { id: 6, title: "Spider-Man: No Way Home", poster: "/spiderman-nwh.jpeg", rating: 8.3 },
  { id: 7, title: "Top Gun: Maverick", poster: "/topgun-maverick.jpeg", rating: 8.4 },
  { id: 8, title: "Joker", poster: "/joker.jpeg", rating: 8.5 },
  { id: 9, title: "Black Panther: Wakanda Forever", poster: "/black-panther2.jpeg", rating: 7.4 },
  { id: 10, title: "Guardians of the Galaxy Vol. 3", poster: "/guardians3.jpeg", rating: 8.0 }
];
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

      <div className="min-h-screen bg-[#0D1B2A] text-white flex flex-col ">

        {/* Hero Section */}
        <HeroSection />
        <Divider />
        <TrendingMovies movies={movies} />
        <Divider />
        {/* Featured Movies */}
        <section className="max-w-6xl mx-auto px-4 md:px-0 pb-20">
          <h2 className="text-3xl font-semibold mb-8 text-white border-b border-[#FFC107] pb-1 w-fit">
            Featured Movies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}

          </div>
        </section>

      </div>
    </>
  );
}

