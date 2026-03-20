
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("equipos");
  const contador = document.getElementById("contador-equipos");

  if (!container) return;

  mostrarProximamente();

  fetch("json/equipos.json")
    .then(res => {
      if (!res.ok) throw new Error("No existe JSON");
      return res.json();
    })
    .then(data => {

      if (!data.equipos || data.equipos.length === 0) return;

      container.innerHTML = "";

      if (contador)
        contador.textContent = "🎮 " + data.equipos.length + " equipos confirmados";

      data.equipos.forEach(equipo => {

        const miembrosHTML = equipo.miembros.map(m => `
          <li>
            <b>${m.nombre}</b> — ${m.rol}<br>
            <span class="text-sm text-gray-400 text-justify">${m.descripcion}</span>
          </li>
        `).join("");

        const section = document.createElement("section");

        section.className =
          "max-w-4xl mx-4 md:mx-auto bg-gray-900/80 border-2 border-[#a64ca6] p-6 rounded-2xl mt-16 shadow-[0_0_20px_rgba(166,76,166,0.2)] backdrop-blur-sm";;

        const descargaHTML = equipo.descarga ? `
          <div class="flex justify-end mt-4">
          <a href="${equipo.descarga}" 
            rel="noopener noreferrer"
            target="_blank"
            class="inline-block bg-[#a64ca6] text-left text-white font-press-start
            text-[8px] md:text-[10px] py-2 px-4 rounded-lg hover:bg-yellow-400
            hover:text-[#4a004a] hover:-translate-y-1 transition-all duration-300
            shadow-[0_4px_0_#4a004a] hover:shadow-[0_6px_0_#4a004a]">
            🕹️ Descargar juego
          </a>
          </div>
` : "";

        section.innerHTML = `
          <div class="flex flex-col md:flex-row gap-6">

            <img src="${equipo.logo}" class="w-32 h-32 object-contain">

            <div>

              <h2 class="text-xl font-bold text-yellow-400">
                ${equipo.titulo}
              </h2>

              <p class="text-purple-300 mb-3">${equipo.equipo}</p>

              <p class="mb-4">${equipo.descripcion}</p>

              <p class="text-sm mb-3">
                <b>Género:</b> ${equipo.genero} |
                <b>Motor:</b> ${equipo.motor} |
                <b>Jugadores:</b> ${equipo.jugadores}
              </p>

              <ul class="list-disc ml-5">
                ${miembrosHTML}
              </ul>
<div class="mt-4 text-right">
  ${descargaHTML}
</div>
            </div>

          </div>
        `;

        container.appendChild(section);

      });

    })
    .catch(() => {

      if (contador)
        contador.textContent = "";

    });

});


function mostrarProximamente() {

  const container = document.getElementById("equipos");

  const section = document.createElement("section");

  section.className =
    "max-w-4xl mx-4 md:mx-auto bg-gray-900/80 border-2 border-[#a64ca6] p-6 rounded-2xl mt-16 shadow-[0_0_20px_rgba(166,76,166,0.2)] backdrop-blur-sm";

  section.innerHTML = `
    <h2 class="font-press-start text-center text-yellow-400 text-xl">
      PRÓXIMAMENTE
    </h2>

    <h3 class="mt-4 text-center text-purple-300">
      Los equipos participantes se anunciarán pronto.
    </h3>
  `;

  container.appendChild(section);

}

