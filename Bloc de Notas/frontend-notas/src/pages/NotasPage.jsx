// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

const API_URL = 'http://localhost:4000/api/notas';

function NotasPage() {
  const [notas, setNotas] = useState([]);

  // ---- ¡NUEVO ESTADO! ----
  // 1. Guardará el objeto de la nota que queremos editar.
  //    Si es 'null', significa que estamos creando una nota nueva.
  const [notaAEditar, setNotaAEditar] = useState(null);

  // --- (Funciones existentes) ---
  const cargarNotas = async () => {
    try {
      const respuesta = await axios.get(API_URL);
      setNotas(respuesta.data);
    } catch (error) {
      console.error("Error al cargar las notas:", error);
    }
  };
  useEffect(() => { cargarNotas(); }, []);
  const handleCrearNota = async (datosNota) => {
    try {
      await axios.post(API_URL, datosNota);
      // Después de crear, vuelve a cargar las notas
      cargarNotas();
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
  };
  const handleBorrarNota = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Después de borrar, vuelve a cargar las notas
      cargarNotas();
    } catch (error) {
      console.error("Error al borrar la nota:", error);
    }
  };

  // ---- ¡NUEVA FUNCIÓN! ----
  // 2. Se llama cuando el usuario hace clic en "Editar" en una nota.
  const handleEditarClick = (nota) => {
    // Guardamos la nota completa en el estado 'notaAEditar'
    setNotaAEditar(nota);
  };

  // ---- ¡NUEVA FUNCIÓN! ----
  // 3. Se llama cuando se envía el formulario en modo "edición".
  const handleActualizarNota = async (datosNota) => {
    try {
      // Obtenemos el ID de la nota que está guardada en el estado
      const id = notaAEditar._id;
      // Hacemos la petición PUT a la API
      await axios.put(`${API_URL}/${id}`, datosNota);

      // Refrescamos la lista de notas
      cargarNotas();

      // Limpiamos el estado de "nota a editar" (para volver al modo "Crear")
      setNotaAEditar(null);
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  };

  // ---- ¡NUEVA FUNCIÓN! ----
  // 4. Se llama si el usuario cancela la edición
  const handleCancelarEdicion = () => {
    setNotaAEditar(null);
  };

  return (
    <div className='app-container'>
      <h1>Mi Bloc de Notas Full-Stack</h1>

      <NoteForm
        alCrearNota={handleCrearNota}
        alActualizarNota={handleActualizarNota}
        notaAEditar={notaAEditar}
        alCancelarEdicion={handleCancelarEdicion}
      />

      <NoteList
        notas={notas}
        alBorrarNota={handleBorrarNota}
        alEditarClick={handleEditarClick}
      />
    </div>
  );
}

export default NotasPage;