// 1. Limpiamos imports innecesarios (logos)
//    Dejamos solo 'useState' si lo vas a usar, si no, quítalo también.
// import { useState } from 'react'
import './App.css'

// 2. Importamos la imagen
import fotoPerfil from './assets/img/Foto CV.jpeg'; // Asegúrate de que la ruta es correcta

function App() {
  // 3. Limpiamos el estado 'count' que no se usa
  // const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Fernando - Estudiante de Ingeniería Informática</h1>
        <nav>
          <a href="#Sobre-mi">Sobre mí</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <section id="frase">
        <h2>Frase del día</h2>
        <p id="texto-frase">Cargando frase motivadora...</p>

        <section id="clima">
          <h2>Clima actual (Huelva)</h2>
          <div id="info-clima">Cargando clima...</div>
        </section>
      </section>

      <section id="sobre-mi">
        <h2>Sobre mí</h2>
        {/* 4. Usamos la imagen importada y CERRAMOS la etiqueta con "/>" */}
        <img 
          src={fotoPerfil} 
          alt="Foto de Fernando"
          className="foto-perfil" 
        />
        <p>Me apasiona la tecnología, la programación y aprender cosas
          nuevas. Actualmente estudio Ingeniería Informática y desarrollo
          proyectos personales para mejorar mis habilidades.</p>
      </section>

      <section id="habilidades">
        <h2>Habilidades</h2>
        <div className="habilidad">
          <span>C#</span>
          <div className="barra">
            <div className="progreso" data-ancho="80%"></div>
          </div>
        </div>
        {/* ... (resto de habilidades) ... */}
        <div className="habilidad">
          <span>Java</span>
          <div className="barra">
            <div className="progreso" data-ancho="60%"></div>
          </div>
        </div>
      </section>

      <section id="proyectos">
        <h2>Proyectos</h2>
        <div className="proyecto">
          <h3>Proyecto 1</h3>
          <p>Descripción breve del proyecto.</p>
        </div>
      </section>

      {/* 5. Fusionamos las DOS secciones de "contacto" en UNA SOLA */}
      <section id="contacto">
        <h2>Contacto</h2>
        
        {/* Parte 1: Info de contacto */}
        <p>Email: <a
          href="mailto:fernaandocp3@gmail.com">fernaandocp3@gmail.com</a></p>
        <p>LinkedIn: <a
          href="#">https://www.linkedin.com/in/fernando-carrero/</a></p>

        {/* Parte 2: Formulario */}
        <form id="form-contacto"
          action="https://formspree.io/f/movkozoz" method="POST">
          <label>Nombre:</label>
          {/* 6. CERRAMOS las etiquetas <input> con "/>" */}
          <input type="text" name="nombre" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Mensaje:</label>
          <textarea name="mensaje" rows="4" required></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
        <p id="estado-envio"></p>
      </section>

      <footer>
        <p>© 2025 Fernando – Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default App