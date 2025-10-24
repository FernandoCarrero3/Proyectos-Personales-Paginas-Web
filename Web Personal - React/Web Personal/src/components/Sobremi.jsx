import fotoPerfil from '../assets/img/Foto CV.jpeg';

export default function SobreMi() {
    return (
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
    );
}