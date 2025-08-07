//Favorites system using LocalStorage
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

//Favorites system using backend instead of localStorage
// import { create } from "zustand";

// interface Movie {
//   tmdb_id: number;
//   title: string;
//   poster_url: string;
//   vote_average: number;
//   genres?: string[];
// }

// interface FavoritesStore {
//   favorites: Movie[];
//   fetchFavorites: () => Promise<void>;
//   addFavorite: (movie: Movie) => Promise<void>;
//   removeFavorite: (id: number) => Promise<void>;
//   isFavorite: (id: number) => boolean;
// }

// export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
//   favorites: [],

//   fetchFavorites: async () => {
//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${apiUrl}/api/v1/favorites/`);
//       if (!res.ok) throw new Error("Failed to fetch favorites");
//       const data = await res.json();
//       set({ favorites: data });
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   addFavorite: async (movie) => {
//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${apiUrl}/api/v1/favorites/create/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(movie),
//       });
//       if (!res.ok) throw new Error("Failed to add favorite");
//       // update local state after successful add
//       set({ favorites: [...get().favorites, movie] });
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   removeFavorite: async (id) => {
//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${apiUrl}/api/v1/favorites/${id}/delete/`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to remove favorite");
//       // update local state after successful removal
//       set({ favorites: get().favorites.filter((m) => m.tmdb_id !== id) });
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   isFavorite: (id) => get().favorites.some((m) => m.tmdb_id === id),
// }));
