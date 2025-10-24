// src/components/NoteForm.jsx
import { useState, useEffect } from 'react'; // 1. ¡Importamos useEffect!
import styles from './NoteForm.module.css';

// 2. Recibimos las nuevas props
function NoteForm({ alCrearNota, alActualizarNota, notaAEditar, alCancelarEdicion }) {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    // 3. ¡NUEVO HOOK! Este 'useEffect' vigila la prop 'notaAEditar'
    //    Se ejecutará cada vez que 'notaAEditar' cambie.
    useEffect(() => {
        if (notaAEditar) {
            // Si 'notaAEditar' tiene una nota, rellenamos el formulario
            setTitulo(notaAEditar.titulo);
            setContenido(notaAEditar.contenido);
        } else {
            // Si 'notaAEditar' es null, limpiamos el formulario
            setTitulo('');
            setContenido('');
        }
    }, [notaAEditar]); // El array [notaAEditar] es la "dependencia"

    // 4. (MODIFICADO) El 'handleSubmit' ahora decide qué hacer
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo) {
            alert('Por favor, añade un título');
            return;
        }

        const datosNota = { titulo, contenido };

        if (notaAEditar) {
            // Si estamos editando, llamamos a la función de actualizar
            alActualizarNota(datosNota);
        } else {
            // Si NO estamos editando, llamamos a la función de crear
            alCrearNota(datosNota);
            // Limpiamos el form solo al crear (al actualizar se limpia con el useEffect)
            setTitulo('');
            setContenido('');
        }
    };

    return (
        <div className={styles.form}>
            <h2>{notaAEditar ? 'Editar Nota' : 'Crear Nota'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <textarea
                    placeholder="Contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    rows="4" // Añadimos 'rows' para hacerlo más alto
                ></textarea>

                <div className={styles.botonesForm}>
                    <button type="submit">
                        {notaAEditar ? 'Actualizar' : 'Crear Nota'}
                    </button>

                    {notaAEditar && (
                        <button type="button" className='btn-cancelar' onClick={alCancelarEdicion}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NoteForm;