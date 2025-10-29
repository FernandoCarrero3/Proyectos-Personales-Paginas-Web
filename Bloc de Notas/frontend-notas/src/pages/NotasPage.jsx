// src/pages/NotasPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import Spinner from '../components/Spinner';

// 1. ¡¡ARREGLADO!! Volvemos a la URL absoluta del back-end
const API_URL = 'http://localhost:4000/api/notas'; 

function NotasPage() { 
  const [notas, setNotas] = useState([]); // Inicia como array vacío
  const [notaAEditar, setNotaAEditar] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarNotas = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.get(API_URL); 
      
      // 2. ¡¡MEDIDA DE SEGURIDAD!!
      //    Nos aseguramos de que lo que llegó es SÍ o SÍ un array.
      if (Array.isArray(respuesta.data)) {
        setNotas(respuesta.data); 
      } else {
        setNotas([]); // Si no, usamos un array vacío
      }
    } catch (error) {
      console.error("Error al cargar las notas:", error);
      setNotas([]); // Si hay un error, también usamos un array vacío
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, []); 

  // --- (El resto de tus funciones no cambia) ---

  const handleCrearNota = async (datosNota) => {
    try {
      await axios.post(API_URL, datosNota);
      cargarNotas();
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
  };
  
  const handleActualizarNota = async (datosNota) => {
    try {
      const id = notaAEditar._id;
      // Usamos la URL completa aquí también
      await axios.put(`${API_URL}/${id}`, datosNota);
      setNotaAEditar(null);
      cargarNotas();
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  };

  const handleBorrarNota = async (id) => {
    try {
      // Y aquí
      await axios.delete(`${API_URL}/${id}`);
      cargarNotas();
    } catch (error) {
      console.error("Error al borrar la nota:", error);
    }
  };

  const handleEditarClick = (nota) => {
    setNotaAEditar(nota);
  };

  const handleCancelarEdicion = () => {
    setNotaAEditar(null);
  };

  return (
    <> 
      <NoteForm 
        alCrearNota={handleCrearNota}
        alActualizarNota={handleActualizarNota}
        notaAEditar={notaAEditar}
        alCancelarEdicion={handleCancelarEdicion}
      />
      
      {loading ? (
        <Spinner />
      ) : (
        <NoteList 
          notas={notas} 
          alBorrarNota={handleBorrarNota}
          alEditarClick={handleEditarClick}
        />
      )}
    </>
  );
}

export default NotasPage;