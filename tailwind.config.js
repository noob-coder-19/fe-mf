/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ebony: {
          50: "#edf1ff",
          100: "#dfe4ff",
          200: "#c4cdff",
          300: "#a1acff",
          400: "#7b80fe",
          500: "#615cf8",
          600: "#523eed",
          700: "#4631d1",
          800: "#392ba8",
          900: "#322a85",
          950: "#0a0819",
        },
        heliotrope: {
          50: "#fcf3ff",
          100: "#f9e7ff",
          200: "#f1ceff",
          300: "#eba7ff",
          400: "#e17aff",
          500: "#ce3ef7",
          600: "#b41edb",
          700: "#9915b6",
          800: "#7f1395",
          900: "#6b1679",
          950: "#460151",
        },
      },
    },
  },
  plugins: [],
};
