document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("charlas");

  if (!container) return;

  mostrarProximamente();

  fetch("json/invitados.json")
    .then(res => {
      if (!res.ok) throw new Error("No existe JSON");
      return res.json();
    })
    .then(data => {

      if (!data.invitados || data.invitados.length === 0) return;

      container.innerHTML = "";

      data.invitados.forEach(charla => {

        const section = document.createElement("section");

        section.className =
          "max-w-4xl mx-4 md:mx-auto bg-gray-900/80 border-2 border-[#a64ca6] p-6 rounded-2xl mt-16 shadow-[0_0_20px_rgba(166,76,166,0.2)] backdrop-blur-sm";;

        // 🔹 Autores
        const autoresHTML = (charla.autores || []).map(autor => `
          <div class="flex gap-4 mt-4">

            <img src="${autor.foto}" 
                 class="w-20 h-20 rounded-full object-cover">

            <div>
              <p class="font-semibold">${autor.nombre}</p>
              <p class="text-purple-300 text-sm">${autor.cargo}</p>
              <p class="text-sm text-gray-400">${autor.bio}</p>
            </div>

          </div>
        `).join("");

        // 🔹 Recursos
        const recursosHTML = (charla.recursos || []).map(recurso => `
          <a href="${recurso.url}" 
             class="text-yellow-400 text-right hover:underline block mt-2"
             target="_blank">
             ${recurso.name}
          </a>
        `).join("");

        section.innerHTML = `
          <h2 class="text-xl font-bold text-yellow-400 mb-2">
            ${charla.titulo}
          </h2>

          <h3 class="text-purple-300 text-sm mb-4">
            ${charla.fecha} · ${charla.horario}
          </h3>

          <div class="mb-4">
            ${charla.descripcion}
          </div>

          <h3 class="font-semibold text-left mt-6"><u>Ponentes</u></h3>

          ${autoresHTML}

          <h3 class="font-semibold text-right mt-6">Recursos</h3>

          ${recursosHTML}
        `;

        container.appendChild(section);

      });

    })
    .catch(() => {
      // Se queda el "PRÓXIMAMENTE"
    });

});


// 🔥 Igual que equipos (robusto)
function mostrarProximamente() {

  const container = document.getElementById("charlas");

  if (!container) return;

  container.innerHTML = "";

  const section = document.createElement("section");

  section.className =
          "max-w-4xl mx-4 md:mx-auto bg-gray-900/80 border-2 border-[#a64ca6] p-6 rounded-2xl mt-16 shadow-[0_0_20px_rgba(166,76,166,0.2)] backdrop-blur-sm";;

  section.innerHTML = `
    <h2 class="font-press-start text-yellow-400 text-lg md:text-2xl text-center">
      PRÓXIMAMENTE
    </h2>

    <h3 class="mt-4 text-center text-purple-300">
      Los invitados y sus charlas se anunciarán pronto.
    </h3>
  `;

  container.appendChild(section);
}
