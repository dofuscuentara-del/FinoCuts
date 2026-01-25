const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

/* ======================
   FORMATEO (NO TOCAR)
====================== */
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
}

function formatearHora(horaISO) {
  const hora = new Date(horaISO);
  return hora.toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

/* ======================
   SESIÓN
====================== */
const session = JSON.parse(localStorage.getItem("session"));
if (!session) location.href = "login.html";

/* ======================
   FILTRO
====================== */
let filtroActual = "todas";

function setFiltro(filtro) {
  filtroActual = filtro;
  cargarCitas();
}

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  actualizarTitulo();
  cargarCitas();
});

/* ======================
   CARGAR CITAS
====================== */
function cargarCitas() {
  fetch(`${API}?action=citas`)
    .then(r => r.json())
    .then(data => {

      const contenedor = document.getElementById("listaCitas");
      contenedor.innerHTML = "";

      const hoyStr = new Date().toISOString().slice(0, 10);
      const mananaStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

      let totalTodas = 0;
      let totalHoy = 0;
      let totalManana = 0;

      data.sort((a, b) => {
        const aKey = `${a[1]} ${a[2]}`;
        const bKey = `${b[1]} ${b[2]}`;
        return aKey.localeCompare(bKey);
      });

      data.forEach(c => {
        if (session.rol === "barbero" && Number(c[3]) !== session.barbero_id) return;

        const fechaCita = c[1].slice(0, 10);

        totalTodas++;
        if (fechaCita === hoyStr) totalHoy++;
        if (fechaCita === mananaStr) totalManana++;

        if (filtroActual === "hoy" && fechaCita !== hoyStr) return;
        if (filtroActual === "mañana" && fechaCita !== mananaStr) return;

        const fecha = formatearFecha(c[1]);
        const hora = formatearHora(c[2]);
        const estado = c[7];

        const botonEstado =
          estado === "activa"
            ? `<button class="btn-cancelar" onclick="cancelar('${c[0]}')">Cancelar</button>`
            : `<button class="btn-editar" onclick="activar('${c[0]}')">Activar</button>`;

        const card = document.createElement("div");
        card.className = "cita-card";

        card.innerHTML = `
          <div class="cita-row">
            <strong>${fecha} · ${hora}</strong>
          </div>
          <div class="cita-row"><span>Cliente</span><span>${c[5]}</span></div>
          <div class="cita-row"><span>Telefono</span><span>${c[6]}</span></div>
          <div class="cita-row"><span>Barbero</span><span>${c[4]}</span></div>
          <div class="cita-row estado ${estado}">
            <span>Estado</span><span>${estado}</span>
          </div>
          <div class="cita-actions">${botonEstado}</div>
        `;

        contenedor.appendChild(card);
      });

      actualizarBadge("countTodas", totalTodas);
      actualizarBadge("countHoy", totalHoy);
      actualizarBadge("countManana", totalManana);
    });
}

/* ======================
   BADGES
====================== */
function actualizarBadge(id, total) {
  const badge = document.getElementById(id);
  if (!badge) return;

  if (total > 0) {
    badge.textContent = total;
    badge.style.display = "inline-flex";
  } else {
    badge.style.display = "none";
  }
}

/* ======================
   TITULO
====================== */
function actualizarTitulo() {
  const titulo = document.getElementById("titulo");
  titulo.textContent =
    session.rol === "admin" ? "Panel Administrador" : "Mis citas";
}

/* ======================
   ACCIONES
====================== */
function cancelar(id) {
  if (!confirm("¿Cancelar esta cita?")) return;
  fetch(`${API}?action=cancelar&id=${id}`).then(cargarCitas);
}

function activar(id) {
  if (!confirm("¿Activar esta cita?")) return;
  fetch(`${API}?action=activar&id=${id}`).then(cargarCitas);
}

function logout() {
  localStorage.removeItem("session");
  location.href = "login.html";
}






