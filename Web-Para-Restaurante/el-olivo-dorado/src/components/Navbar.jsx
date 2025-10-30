import React, { useState } from 'react';
import { useLang } from '../context/LangContext';
import { content } from '../content';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang } = useLang(); // 3. Usar el Hook

  const t = content[lang]; // 4. "t" será nuestro objeto de traducciones (es o en)

  return (
    <nav className="bg-brand-bg/90 backdrop-blur-md w-full fixed top-0 z-50 shadow-md">
      {/* backdrop-blur-md crea un efecto de cristal esmerilado */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* --- 1. Logo o Nombre del Restaurante --- */}
        <a href="#inicio" className="text-2xl font-bold text-brand-primary">
          {t.heroTitle} 
        </a>

        {/* --- 2. Enlaces de Navegación (Escritorio) --- */}
        {/* 'hidden md:flex' significa: oculto en móvil, visible como flex en escritorio */}
        <div className="hidden md:flex space-x-6">
          <a href="#inicio" className="text-brand-dark hover:text-brand-primary">Inicio</a>
          <a href="#menu" className="text-brand-dark hover:text-brand-primary">Nuestro Menú</a>
          <a href="#ubicacion" className="text-brand-dark hover:text-brand-primary">Ubicación</a>
          <a 
            href="#reservas" 
            className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-secondary hover:text-brand-dark transition-colors"
          >
            {t.navReservar}
          </a>

          {/* --- 6. EL BOTÓN DE TOGGLE --- */}
          <button 
            onClick={toggleLang}
            className="border-2 border-brand-primary text-brand-primary font-bold px-3 py-1 rounded-md text-sm"
          >
            {lang === 'es' ? 'EN' : 'ES'} 🇬🇧/🇪🇸
          </button>
        </div>

        {/* --- 3. Botón de Hamburguesa (Móvil) --- */}
        {/* 'md:hidden' significa: visible en móvil, oculto en escritorio */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark">
            {/* Este es un icono SVG de hamburguesa */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- 4. Menú Desplegable (Móvil) --- */}
      {/* Esto se muestra o se oculta basado en el estado 'isOpen' */}
      {isOpen && (
        <div className="md:hidden bg-brand-bg shadow-lg absolute top-full left-0 w-full">
          <a href="#inicio" className="block text-brand-dark text-center py-3" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#menu" className="block text-brand-dark text-center py-3" onClick={() => setIsOpen(false)}>Nuestro Menú</a>
          <a href="#ubicacion" className="block text-brand-dark text-center py-3" onClick={() => setIsOpen(false)}>Ubicación</a>
          <a href="#reservas" className="block bg-brand-primary text-white text-center py-3" onClick={() => setIsOpen(false)}>
            Reservar
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;