/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: {
          primary: "#0e7490",
          secondary: "#5469D0",
          dark: "#164e63",
          light: "#06b6d4",
          superlight: "#67e8f9",
        },
        new: {
          primary: "#ad596d",
          light: "#bf7e8e",
        },
      },
    },
  },
  plugins: [],
};
