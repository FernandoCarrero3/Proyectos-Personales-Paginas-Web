// src/components/Note.jsx

import styles from './Note.module.css';

// 1. Recibimos el prop { alEditarClick }
function Note({ nota, alBorrarNota, alEditarClick }) {

    const fechaFormateada = new Date(nota.fecha).toLocaleDateString('es-ES');
    const handleBorrarClick = () => { alBorrarNota(nota._id); };

    // 2. ¡NUEVA FUNCIÓN! Llama a la función de App con ESTA nota
    const handleEditarClick = () => {
        alEditarClick(nota);
    };

    return (
        <div className={styles.nota}>
            <h3>{nota.titulo}</h3>
            <p>{nota.contenido}</p>
            <small>{fechaFormateada}</small>

            {/* Añadimos un div para alinear los botones */}
            <div className={styles.botones}>
                {/* 4. Usamos clases globales (de index.css) y locales */}
                <button className='btn-editar' onClick={handleEditarClick}>
                    Editar
                </button>
                <button className='btn-borrar' onClick={handleBorrarClick}>
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default Note;