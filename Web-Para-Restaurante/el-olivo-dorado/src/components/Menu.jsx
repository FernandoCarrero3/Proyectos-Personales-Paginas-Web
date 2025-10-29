import React from 'react';

// Definimos los datos del menú en arrays para que el JSX sea más limpio
const entrantes = [
    {
        nombre: 'Pan de la Casa con Tomate y Alioli',
        desc: 'Pan de masa madre horneado al momento.',
        precio: '4.50€',
    },
    {
        nombre: 'Croquetas de Jamón Ibérico',
        desc: '8 unidades de pura cremosidad.',
        precio: '12.00€',
    },
    {
        nombre: 'Ensaladilla Rusa "El Olivo"',
        desc: 'Con ventresca de atún y picos sevillanos.',
        precio: '9.50€',
    },
];

const principales = [
    {
        nombre: 'Pulpo a la Brasa',
        desc: 'Con puré de patata trufado y pimentón de la Vera.',
        precio: '21.00€',
    },
    {
        nombre: 'Solomillo de Vaca Madurada',
        desc: 'Acompañado de patatas pont-neuf y pimientos del padrón.',
        precio: '24.00€',
    },
    {
        nombre: 'Arroz Meloso de Bogavante',
        desc: '(Mínimo 2 personas).',
        precio: '19.00€ p.p.',
    },
];

const Menu = () => {
    return (
        // id="menu" para el ancla del Navbar
        <section data-aos="fade-up" data-aos-delay="200" id="menu" className="py-20 bg-brand-bg">
            <div className="container mx-auto px-4">
                <h2 data-aos="fade-up" className="text-4xl font-bold text-center text-brand-primary mb-12">
                    Nuestro Menú
                </h2>

                {/* --- Sección Entrantes --- */}
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-brand-dark border-b-2 border-brand-secondary pb-2 mb-6">
                        Entrantes
                    </h3>
                    <div className="space-y-4">
                        {/* Usamos .map() para "dibujar" cada item del array */}

                        {entrantes.map((item) => (
                            <div key={item.nombre} className="flex justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-brand-dark">{item.nombre}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                                <p className="text-lg font-bold text-brand-dark">{item.precio}</p>
                            </div>
                        ))}

                    </div>
                </div>

                {/* --- Sección Principales --- */}
                <div>
                    <h3 className="text-2xl font-semibold text-brand-dark border-b-2 border-brand-secondary pb-2 mb-6">
                        Platos Fuertes
                    </h3>
                    <div className="space-y-4">
                        {principales.map((item) => (
                            <div key={item.nombre} className="flex justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-brand-dark">{item.nombre}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                                <p className="text-lg font-bold text-brand-dark">{item.precio}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Podrías añadir "Postres" y "Bebidas" siguiendo la misma estructura */}

            </div>
        </section>
    );
};

export default Menu;