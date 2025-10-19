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


///FRASE MOTIVADORA
window.addEventListener("DOMContentLoaded", async () => {
  const fraseElemento = document.getElementById("texto-frase");

  async function traducirTexto(texto) {
    const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(texto) + "&langpair=en|es";
    const res = await fetch(url);
    const data = await res.json();
    return data.responseData.translatedText;
  }

  async function cargarFrase() {
    const apiURL = "https://corsproxy.io/?" + encodeURIComponent("https://zenquotes.io/api/random");

    try {
      const respuesta = await fetch(apiURL);
      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      const data = await respuesta.json();
      const frase = data[0].q;
      const autor = data[0].a;

      // Traducir la frase al español
      const fraseTraducida = await traducirTexto(frase);

      fraseElemento.textContent = `"${fraseTraducida}" — ${autor}`;
      fraseElemento.classList.add("visible");
    } catch (error) {
      console.error("Error al obtener la frase:", error);
      fraseElemento.textContent = "No se pudo cargar la frase motivadora 😅";
    }
  }

  cargarFrase();
});

