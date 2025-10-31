/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#F9F9F9',  // Nuestro fondo claro
        'brand-dark': '#111111',   // Nuestro texto oscuro
        'brand-accent': '#3498DB', // El azul de acento para botones
      }
    },
  },
  plugins: [],
}