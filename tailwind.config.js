/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // For reusable components
    "./app/**/*.{js,ts,jsx,tsx}", // If using the /app directory
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A3E72", // Deep navy blue
        accent: "#FF6F3C", // Vibrant orange
        background: "#0F1C2E", // Darker navy background
      },
    },
  },
  plugins: [],
};
