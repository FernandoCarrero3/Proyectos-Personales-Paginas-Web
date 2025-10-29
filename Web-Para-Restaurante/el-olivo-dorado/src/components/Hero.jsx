import React from 'react';
// Importamos nuestra imagen de fondo
import HeroImage from '../assets/hero-bg.jpg'; 

const Hero = () => {
  return (
    // 'id="inicio"' es importante para que el enlace del Navbar funcione
    <section 
      id="inicio" 
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      // Así se aplica una imagen de fondo en React
      style={{ backgroundImage: `url(${HeroImage})` }} 
    >
      {/* Capa oscura semitransparente para que el texto resalte */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Contenedor del texto (z-10 lo pone por encima de la capa oscura) */}
      <div className="text-center z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          El Olivo Dorado
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mt-4 mb-8">
          Cocina Mediterránea Moderna. Sabor Local.
        </p>
        <a 
          href="#reservas"
          className="bg-brand-primary text-white px-8 py-3 rounded-md text-lg font-medium
                     hover:bg-brand-secondary hover:text-brand-dark transition-colors duration-300"
        >
          Haz tu Reserva
        </a>
      </div>
    </section>
  );
};

export default Hero;