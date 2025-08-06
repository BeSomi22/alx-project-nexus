# CinePick

CinePick is a movie recommendation platform that helps users discover trending, popular, and similar movies based on their preferences. Powered by a movie API, CinePick provides a smooth and engaging movie discovery experience.

---

## Features

- **Search Movies** – Quickly find movies by title.
- **Personalized Recommendations** – Get similar movies based on what you like.
- **Trending & Popular Lists** – Stay up-to-date with what’s hot right now.
- **Responsive Design** – Works on desktop, tablet, and mobile.
- **Detailed Movie Pages** – See movie posters, ratings, genres, and more.
- **User Authentication** – Secure sign-up and sign-in functionality to create and manage your account.
- **Favorites System** – Save your favorite movies to easily access them later.

---

## Installation & Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/cinepick.git
```

### 2️⃣ Navigate to the Project Folder

```bash
cd cinepick
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create an `.env.local` File

Inside the root folder, create a `.env.local` file and add your API key:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
NEXT_PUBLIC_API_KEY=your_api_key_here
```

If using authentication and favorites, also include:

```env
NEXT_PUBLIC_AUTH_API_URL=https://your-auth-api-endpoint.com
NEXT_PUBLIC_FAVORITES_API_URL=https://your-favorites-api-endpoint.com
```

### 5️⃣ Start the Development Server

```bash
npm run dev
```

Now open **http://localhost:3000** in your browser to see CinePick in action.

---

## Screenshots

| Home Page                                | Movie Details                                        | Favorites                                          |
| ---------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| ![Home Screenshot](screenshots/home.png) | ![Movie Details Screenshot](screenshots/details.png) | ![Favorites Screenshot](screenshots/favorites.png) |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
