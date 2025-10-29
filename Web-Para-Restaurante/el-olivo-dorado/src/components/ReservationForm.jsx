import React, { useState } from 'react';

const ReservationForm = () => {
    // 1. ESTADO PARA LOS CAMPOS DEL FORMULARIO
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: 1, // Valor inicial
        comments: ''
    });

    // 2. ESTADO PARA EL MENSAJE DE ENVÍO
    const [message, setMessage] = useState('');

    // 3. MANEJADOR PARA CADA CAMBIO EN UN INPUT
    const handleChange = (e) => {
        // 'e.target' es el input que disparó el evento
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData, // Copia todo lo que ya había
            [name]: value // Sobrescribe solo el campo que cambió
        }));
    };

    const handleSubmit = async (e) => { // <-- ¡Añade 'async'!
        e.preventDefault();
        setMessage('Enviando reserva...');

        try {
            // ESTA ES LA MAGIA:
            const response = await fetch('https://formspree.io/f/movkozoz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Éxito
                setMessage('¡Reserva enviada con éxito! Te contactaremos pronto.');
                setFormData({ name: '', email: '', date: '', time: '', guests: 1, comments: '' });
            } else {
                // Error
                setMessage('Hubo un error al enviar. Intenta de nuevo.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Hubo un error de red.');
        }

    };

    return (
        <section id="reservas" className="py-20 bg-gray-50"> {/* Fondo ligeramente gris */}
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-brand-primary mb-12">
                    Haz tu Reserva
                </h2>

                {/* El 'onSubmit' va en la etiqueta <form> */}
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-xl"
                >

                    {/* --- Grid para Nombre y Email --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-brand-dark font-medium mb-2">Nombre</label>
                            <input
                                type="text" id="name" name="name"
                                value={formData.name} onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-brand-dark font-medium mb-2">Email</label>
                            <input
                                type="email" id="email" name="email"
                                value={formData.email} onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                    </div>

                    {/* --- Grid para Fecha, Hora y Personas --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label htmlFor="date" className="block text-brand-dark font-medium mb-2">Fecha</label>
                            <input
                                type="date" id="date" name="date"
                                value={formData.date} onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-brand-dark font-medium mb-2">Hora</label>
                            <input
                                type="time" id="time" name="time"
                                value={formData.time} onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="guests" className="block text-brand-dark font-medium mb-2">Personas</label>
                            <input
                                type="number" id="guests" name="guests"
                                value={formData.guests} onChange={handleChange}
                                min="1" max="10" required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                    </div>

                    {/* --- Comentarios --- */}
                    <div className="mb-6">
                        <label htmlFor="comments" className="block text-brand-dark font-medium mb-2">Comentarios (Opcional)</label>
                        <textarea
                            id="comments" name="comments"
                            value={formData.comments} onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        ></textarea>
                    </div>

                    {/* --- Botón de Enviar --- */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-brand-primary text-white px-10 py-3 rounded-md text-lg font-medium 
                         hover:bg-brand-secondary hover:text-brand-dark transition-colors duration-300"
                        >
                            Enviar Reserva
                        </button>
                    </div>

                    {/* --- Mensaje de Estado --- */}
                    {message && (
                        <p className="text-center text-brand-primary mt-6">{message}</p>
                    )}

                </form>
            </div>
        </section>
    );
};

export default ReservationForm;