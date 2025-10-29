import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-gray-400 py-10">
      <div className="container mx-auto px-4 text-center">

        {/* Aquí podrías poner iconos SVG de redes sociales */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">TripAdvisor</a>
        </div>

        <p className="text-sm mb-2">
          &copy; 2025 El Olivo Dorado. Todos los derechos reservados.
        </p>
        <p className="text-xs">
          Este es un sitio web ficticio creado con React y Tailwind CSS para portfolio.
        </p>
        {/* ¡Considera poner un enlace a tu propio portfolio aquí! */}
        {/* <p className="text-xs mt-2">Diseñado por <a href="[tu-github-o-web]" className="underline hover:text-white">Tu Nombre</a></p> */}
      </div>
    </footer>
  );
};

export default Footer;