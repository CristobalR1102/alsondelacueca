/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rojo:    "#C0392B",
        dorado:  "#B8860B",
        crema:   "#FAF3E0",
        carbon:  "#1A1A1A",
        tierra:  "#5C3D2E",
        hueso:   "#EDE8DC",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
