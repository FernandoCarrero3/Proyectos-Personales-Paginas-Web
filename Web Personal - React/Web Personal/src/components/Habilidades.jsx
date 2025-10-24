import { useState, useEffect, useRef } from 'react';

export default function Habilidades() {

    const [isVisible, setIsVisible] = useState(false);
    // 1. La ref que usará el observer
    const seccionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        });

        // Observamos el elemento SOLO si 'seccionRef.current' existe
        if (seccionRef.current) {
            observer.observe(seccionRef.current);
        }

        // Limpieza
        return () => {
            if (seccionRef.current) {
                observer.unobserve(seccionRef.current);
            }
        };
    }, []); // El array vacío asegura que esto solo se ejecuta una vez

    return (
        /* 2. Conectamos la 'ref' a la etiqueta <section> */
        <section id="habilidades" ref={seccionRef}>
            <h2>Habilidades</h2>

            <div className="habilidad">
                <span>C#</span>
                <div className="barra">
                    <div
                        className="progreso"
                        style={{ width: isVisible ? '80%' : '0' }}
                    ></div>
                </div>
            </div>

            {/* Rellenando las habilidades que faltaban */}
            <div className="habilidad">
                <span>Python</span>
                <div className="barra">
                    <div
                        className="progreso"
                        style={{ width: isVisible ? '50%' : '0' }}
                    ></div>
                </div>
            </div>

            <div className="habilidad">
                <span>React</span>
                <div className="barra">
                    <div
                        className="progreso"
                        style={{ width: isVisible ? '30%' : '0' }}
                    ></div>
                </div>
            </div>

            {/* El bloque de Java corregido */}
            <div className="habilidad">
                <span>Java</span>
                <div className="barra">
                    <div
                        className="progreso"
                        style={{ width: isVisible ? '60%' : '0' }}
                    ></div>
                </div>
            </div>

        </section>
    );
}