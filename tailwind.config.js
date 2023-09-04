/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "Arial", "sans-serif"],
        "black-ops": ["Black Ops", "Arial", "sans-serif"],
      }
    },
  },
  plugins: [],
}