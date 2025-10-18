document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("Boton1");
    boton.addEventListener("click", () => {
        alert("¡Hola! Has hecho clic en el botón.");
    });
});

const botonModo = document.createElement("button");
botonModo.textContent = "🌙 Modo oscuro";
botonModo.style.position = "fixed";
botonModo.style.bottom = "10px";
botonModo.style.right = "10px";
document.body.appendChild(botonModo);

botonModo.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.querySelector("footer p").innerHTML = `© ${new Date().getFullYear()} Fernando – Todos los derechos reservados`;

///HABILIDADES

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const barras = entry.target.querySelectorAll(".progreso");
            barras.forEach(b => {
                const ancho = b.getAttribute("data-ancho");
                b.style.width = ancho;
            })
            observer.unobserve(entry.target);
        }
    })
})

const seccionHabilidades = document.querySelector("#habilidades");
observer.observe(seccionHabilidades);
