/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#050505", // Deep black background
          card: "#0a0a0a", // Slightly lighter for cards
          border: "#1f1f1f",
          accent: "#00e1ff", // Neon Cyan
          danger: "#ff0000", // Alert Red
        }
      }
    },
  },
  plugins: [],
}