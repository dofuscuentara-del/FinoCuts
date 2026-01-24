
const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

document.addEventListener("DOMContentLoaded", () => {

  // ================= TEMA =================
  const btn = document.getElementById("themeToggle");
  if (btn) {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.body.classList.add("light");
      btn.textContent = "☀️";
    } else {
      btn.textContent = "🌙";
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      btn.textContent = isLight ? "☀️" : "🌙";
    });
  }

  // ================= ELEMENTOS =================
  const fechaInput = document.getElementById("fecha");
  const barberoSelect = document.getElementById("barbero");
  const horaSelect = document.getElementById("hora");

  // ================= BARBEROS =================
  cargarBarberos();

  async function cargarBarberos() {
    const res = await fetch(`${API}?action=barberos`);
    const data = await res.json();

    barberoSelect.innerHTML = '<option value="">Selecciona barbero</option>';

    data.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.id;
      opt.textContent = b.nombre;
      barberoSelect.appendChild(opt);
    });
  }

  // ================= EVENTOS =================
  fechaInput.addEventListener("change", cargarHorarios);
  barberoSelect.addEventListener("change", cargarHorarios);

  // ================= HORARIOS =================
  function cargarHorarios() {
    const fecha = fechaInput.value;
    const barbero = barberoSelect.value;

    horaSelect.innerHTML = '<option value="">Selecciona horario</option>';

    if (!fecha || !barbero) return;

    fetch(`${API}?action=horariosDisponibles&fecha=${fecha}&barbero=${barbero}`)
      .then(r => r.json())
      .then(data => {

        if (!Array.isArray(data) || data.length === 0) {
          horaSelect.innerHTML = '<option>No hay horarios</option>';
          return;
        }

        data.forEach(h => {
          const opt = document.createElement("option");
          opt.value = h;
          opt.textContent = h;
          horaSelect.appendChild(opt);
        });
      })
      .catch(err => {
        console.error("Error horarios:", err);
        horaSelect.innerHTML = '<option>Error al cargar</option>';
      });
  }

});



















