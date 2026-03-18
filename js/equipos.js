
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
            <span class="text-sm text-gray-400">${m.descripcion}</span>
          </li>
        `).join("");

        const section = document.createElement("section");

        section.className =
          "container max-w-5xl mx-auto p-8 md:p-10 mt-8 bg-gray-900/80 border-t-4 border-[#a64ca6] rounded-3xl";

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
    "container max-w-5xl mx-auto p-8 md:p-10 mt-8 bg-gray-900/80 border-t-4 border-[#a64ca6] rounded-3xl shadow-[0_-5px_25px_rgba(166,76,166,0.2)]"

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

