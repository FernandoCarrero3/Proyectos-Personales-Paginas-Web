// src/components/NoteList.jsx
import Note from './Note';
import styles from './NoteList.module.css';

// 1. Recibimos el nuevo prop { alEditarClick }
function NoteList({ notas, alBorrarNota, alEditarClick }) {

    return (
        <div className={styles.listaContenedor}>
            <h2>Mis Notas</h2>

            {notas.length === 0 ? (
                // 3. Aplicar clase al mensaje
                <p className={styles.mensajeVacio}>No hay notas. ¡Crea una!</p>
            ) : (
                notas.map((nota) => (
                    <Note
                        key={nota._id}
                        nota={nota}
                        alBorrarNota={alBorrarNota}
                        alEditarClick={alEditarClick}
                    />
                ))
            )}
        </div>
    );
}

export default NoteList;