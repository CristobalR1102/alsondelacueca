/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta tomada del logo: azul marino, dorado bordado, rojo copihue y azul de la "S"
        rojo:    "#D7262E",
        granate: "#A91D24",
        dorado:  "#D4A23A",
        crema:   "#FAF6EC",
        carbon:  "#08142A",
        tierra:  "#1E3A8A",
        hueso:   "#EEEBE2",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
