import React from 'react';

const Location = () => {
  return (
    // id="ubicacion" para el ancla
    <section id="ubicacion" className="py-20 bg-white"> 
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-brand-primary mb-12">
          Encuéntranos
        </h2>

        {/* Contenedor grid con 2 columnas en escritorio, 1 en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* --- Columna 1: Información --- */}
          <div className="text-lg">
            <h3 className="text-2xl font-semibold text-brand-dark mb-4">Horario</h3>
            <ul className="mb-6 space-y-1 text-gray-700">
              <li><strong>Lunes a Viernes:</strong> 13:00 - 16:00 | 20:00 - 23:30</li>
              <li><strong>Sábados:</strong> 13:00 - 23:30 (Cocina ininterrumpida)</li>
              <li><strong>Domingos:</strong> 13:00 - 16:00</li>
            </ul>

            <h3 className="text-2xl font-semibold text-brand-dark mb-4">Contacto</h3>
            <p className="text-gray-700 mb-2">Calle Ficticia, 123</p>
            <p className="text-gray-700 mb-2">41001, Sevilla, España</p>
            <p className="text-gray-700">(+34) 954 123 456</p>
          </div>

          {/* --- Columna 2: Mapa --- */}
          <div className="w-full h-80 md:h-96">
            {/* CÓMO OBTENER ESTE MAPA:
              1. Ve a Google Maps.
              2. Busca una ubicación (ej. "Catedral de Sevilla").
              3. Haz clic en "Compartir".
              4. Elige la pestaña "Insertar un mapa".
              5. Copia el HTML que empieza con "<iframe ...".
              6. Pégalo aquí abajo, reemplazando el 'src' de ejemplo.
              7. Añádele las clases de Tailwind: className="w-full h-full border-0 rounded-lg shadow-lg"
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.339190117088!2d-5.994079824647847!3d37.38609833502917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c111421b835%3A0x3b33b9c76b90f670!2sCatedral%20de%20Sevilla!5e0!3m2!1ses!2ses!4v1728471200123"
              className="w-full h-full border-0 rounded-lg shadow-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;