import { create } from "zustand";

interface Movie {
  tmdb_id: number;
  title: string;
  poster_url: string;
  vote_average: number;
  genres?: string[];
}

interface FavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [],

  addFavorite: (movie) => {
    const updated = [...get().favorites, movie];
    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  removeFavorite: (id) => {
    const updated = get().favorites.filter((m) => m.tmdb_id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  isFavorite: (id) => get().favorites.some((m) => m.tmdb_id === id),
}));
