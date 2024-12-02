/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontChillOne: [ "Rampart One" ],
        fontChillTwo: [ "Indie Flower" ],
      }
    },
  },
  plugins: [],
}