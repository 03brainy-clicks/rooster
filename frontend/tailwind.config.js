/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rooster: {
          accent: "#0057FF",
          blue: "#044dd6",
          white: "#fff",
          black: "#000",
          gray: "#f5f5f5",
          textPrimary:"#000",
          textSecondary:"#505050",
          textSimple:"#747474"
        },
      },
    },
  },
  plugins: [],
};
