/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx,ts}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        myblue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: {
        pattern: "url('/src/Assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};
