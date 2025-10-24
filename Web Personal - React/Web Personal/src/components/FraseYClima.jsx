// src/components/FraseYClima.jsx

import { useState, useEffect } from 'react';

// --- Funciones auxiliares ---
// Podemos dejar la función de traducción fuera del componente, 
// ya que no depende de ningún estado o prop.

async function traducirTexto(texto) {
  const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(texto) + "&langpair=en|es";
  try {
    const res = await fetch(url);
    if (!res.ok) return texto; // Si falla, devuelve el texto original
    const data = await res.json();
    return data.responseData.translatedText || texto;
  } catch (error) {
    console.error("Error de traducción:", error);
    return texto; // Si hay error, devuelve el original
  }
}

// --- Componente Principal ---

export default function FraseYClima() {
  
  // --- Estados para la Frase ---
  const [frase, setFrase] = useState('Cargando frase motivadora...');
  const [autor, setAutor] = useState('');
  const [fraseVisible, setFraseVisible] = useState(false); // Para la animación

  // --- Estado para el Clima ---
  const [clima, setClima] = useState('Cargando clima...');

  
  // --- Efecto para cargar la FRASE ---
  // Se ejecuta solo una vez, cuando el componente se "monta" (gracias al [] vacío)
  useEffect(() => {
    
    async function cargarFrase() {
      const apiURL = "https://corsproxy.io/?" + encodeURIComponent("https://zenquotes.io/api/random");
      try {
        const respuesta = await fetch(apiURL);
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const data = await respuesta.json();
        const fraseOriginal = data[0].q;
        const autorOriginal = data[0].a;

        // Traducir la frase al español
        const fraseTraducida = await traducirTexto(fraseOriginal);

        // Actualizamos los estados
        setFrase(`"${fraseTraducida}"`);
        setAutor(autorOriginal);
        setFraseVisible(true); // Activamos la animación
        
      } catch (error) {
        console.error("Error al obtener la frase:", error);
        setFrase("No se pudo cargar la frase motivadora 😅");
      }
    }

    cargarFrase(); // Ejecutamos la función
    
  }, []); // El array vacío [] significa "ejecutar solo una vez"

  
  // --- Efecto para cargar el CLIMA ---
  // También se ejecuta solo una vez
  useEffect(() => {
    
    async function obtenerClimaOpenMeteo(lat, lon) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("No se pudo obtener el clima");
        const data = await respuesta.json();

        const climaData = data.current_weather;
        const temp = climaData.temperature;
        const viento = climaData.windspeed;

        // ¡En React, es mucho mejor guardar JSX que un string de HTML!
        // Así evitamos usar 'dangerouslySetInnerHTML'
        setClima(
          <>
            <p>{temp} °C</p>
            <p>Viento: {viento} km/h</p>
          </>
        );

      } catch (error) {
        console.error(error);
        setClima("Error al cargar el clima");
      }
    }

    obtenerClimaOpenMeteo(37.26, -6.94); // Coordenadas de Huelva
    
  }, []); // El array vacío [] significa "ejecutar solo una vez"

  
  // --- Renderizado del Componente ---
  return (
    <section id="frase">
      <h2>Frase del día</h2>
      
      {/* Usamos el estado 'fraseVisible' para añadir la clase 'visible' */}
      <p id="texto-frase" className={fraseVisible ? 'visible' : ''}>
        {frase} 
        {/* Solo mostramos el autor si existe */}
        {autor && <strong> — {autor}</strong>}
      </p>

      <section id="clima">
        <h2>Clima actual (Huelva)</h2>
        {/* Mostramos el estado 'clima' (que puede ser un string o JSX) */}
        <div id="info-clima">{clima}</div>
      </section>
    </section>
  );
}