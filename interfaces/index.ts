export interface MovieCardProps {
  tmdb_id: number;
  title: string;
  poster_url: string;
  vote_average: number;
  genres?: string[];
}

export interface Genre {
  id: number;
  tmdb_id: number;
  name: string;
  slug: string;
  is_primary: boolean;
  weight: number;
}
export interface MovieType {
  tmdb_id: number;
  title: string;
  overview: string;
  release_year?: string;
  vote_average: number;
  poster_url: string;
  backdrop_url: string;
  genres?: Genre[];
  tagline?: string;
  runtime_formatted?: string;
  homepage?: string;
  imdb_url?: string;
  tmdb_url?: string;
  original_language: string;
  popularity: string;
  status: string;
  main_trailer_embed_url?: string;
}

export interface TopRatedMovie {
  tmdb_id: number;
  title: string;
  poster_url: string;
  vote_average: number;
  genres?: string[];
}
