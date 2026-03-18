
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("charlas");

  if (!container) return;

  // Mostrar por defecto
  mostrarProximamente();

  fetch("json/invitados.json")
    .then(res => {
      if (!res.ok) throw new Error("No JSON");
      return res.json();
    })
    .then(data => {

      // Si no hay charlas
      if (!data.invitados || data.invitados.length === 0) return;

      // Limpiar el "PRÓXIMAMENTE"
      container.innerHTML = "";

      data.invitados.forEach(charla => {

        const autoresHTML = charla.autores.map(autor => `
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

        const recursosHTML = charla.recursos.map(recurso => `
          <a href="${recurso.url}" 
             class="text-yellow-400 text-right hover:underline block mt-2"
             target="_blank">
             ${recurso.name}
          </a>
        `).join("");

        const section = document.createElement("section");

        section.className =
          "container max-w-5xl mx-auto p-8 md:p-10 mt-8 bg-gray-900/80 border-t-4 border-[#a64ca6] rounded-3xl shadow-[0_-5px_25px_rgba(166,76,166,0.2)]";

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
      // Si falla, ya está mostrado "PRÓXIMAMENTE"
    });

});


// 🔥 función reutilizable
function mostrarProximamente() {

  const container = document.getElementById("charlas");

  if (!container) return;

  container.innerHTML = `
    <section class="max-w-3xl mx-auto mt-16 p-8 text-center bg-[#4a004a]/40 border-2 border-[#a64ca6] rounded-3xl shadow-[0_0_30px_rgba(166,76,166,0.4)]">

      <h2 class="font-press-start text-yellow-400 text-lg md:text-2xl">
        PRÓXIMAMENTE
      </h2>

    <h3 class="mt-4 text-center text-purple-300">
      Los equipos participantes se anunciarán pronto.
    </h3>

    </section>
  `;
}
