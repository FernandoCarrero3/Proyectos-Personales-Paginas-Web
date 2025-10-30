// src/context/LangContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const LangContext = createContext();

// 2. Crear el Proveedor (Provider)
// Este componente envolverá nuestra app y proveerá el estado
export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('es'); // Idioma por defecto

  const toggleLang = () => {
    setLang(prevLang => (prevLang === 'es' ? 'en' : 'es'));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

// 3. Crear un "Custom Hook"
// Esto es un atajo para no tener que importar useContext y LangContext
// en cada componente. Solo importaremos useLang().
export const useLang = () => {
  return useContext(LangContext);
};