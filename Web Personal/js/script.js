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


//CONFIRMACION FORMULARIO

const form = document.getElementById("form-contacto");
const estado = document.getElementById("estado-envio");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const respuesta = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" }
    });

    if (respuesta.ok) {
      estado.textContent = "✅ ¡Mensaje enviado correctamente!";
      form.reset();
    } else {
      estado.textContent = "⚠️ Hubo un problema al enviar el mensaje.";
    }
  } catch {
    estado.textContent = "⚠️ Error de conexión. Inténtalo más tarde.";
  }
});


///CLIMA

async function obtenerClimaOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const climaDiv = document.getElementById("info-clima");
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("No se pudo obtener el clima");
    const data = await respuesta.json();

    const clima = data.current_weather;  // objeto con datos
    const temp = clima.temperature;
    const viento = clima.windspeed;
    // Open-Meteo no da “descripción” textual, pero puedes interpretar según viento, etc.

    climaDiv.innerHTML = `
      <p>${temp} °C</p>
      <p>Viento: ${viento} km/h</p>
    `;
  } catch (error) {
    console.error(error);
    climaDiv.textContent = "Error al cargar el clima";
  }
}

// Por ejemplo, para Huelva (latitude ~ 37.26, longitude ~ -6.94)
obtenerClimaOpenMeteo(37.26, -6.94);



