import { useForm } from '@formspree/react';

export default function Contacto() {
  // El "movkozoz" es tu ID de formulario
  const [state, handleSubmit] = useForm('movkozoz'); 

  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <p>Email: <a href="mailto:fernaandocp3@gmail.com">fernaandocp3@gmail.com</a></p>
      <p>LinkedIn: <a href="#">https://www.linkedin.com/in/fernando-carrero/</a></p>

      <form onSubmit={handleSubmit}> {/* ¡Usa el handleSubmit de Formspree! */}
        <label>Nombre:</label>
        <input type="text" name="nombre" required />

        <label>Email:</label>
        <input type="email" name="email" required />

        <label>Mensaje:</label>
        <textarea name="mensaje" rows="4" required></textarea>

        <button type="submit" disabled={state.submitting}> {/* Deshabilitar mientras envía */}
          Enviar mensaje
        </button>
      </form>

      {/* Mensajes de estado */}
      <p id="estado-envio">
        {state.succeeded && '✅ ¡Mensaje enviado correctamente!'}
        {state.errors && '⚠️ Hubo un problema al enviar el mensaje.'}
      </p>
    </section>
  );
}