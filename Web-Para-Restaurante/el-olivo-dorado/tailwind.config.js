/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Esta línea es vital
  ],
  theme: {
    extend: {
      // Aquí añadimos nuestros colores personalizados
      colors: {
        'brand-bg': '#F9F9F7',       // Nuestro fondo "Lienzo"
        'brand-dark': '#2D2D2D',      // Nuestro texto "Carbón"
        'brand-primary': '#4A5A40',    // Nuestro acento "Olivo"
        'brand-secondary': '#D4A056', // Nuestro acento "Dorado"
      }
    },
  },
  plugins: [],
}