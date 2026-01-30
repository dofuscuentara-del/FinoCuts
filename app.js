const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

let reservando = false;

document.addEventListener("DOMContentLoaded", () => {

  /* ================= TEMA ================= */
  const btn = document.getElementById("themeToggle");
  if (btn) {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.body.classList.add("light");
      btn.textContent = "🌙";
    } else {
      btn.textContent = "☀️";
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      btn.textContent = isLight ? "🌙" : "☀️";
    });
  }

  /* ================= ELEMENTOS ================= */
  const fechaInput = document.getElementById("fecha");
  const barberoSelect = document.getElementById("barbero");
  const horaSelect = document.getElementById("hora");

  horaSelect.disabled = true;

  /* ================= BARBEROS ================= */
  cargarBarberos();

  async function cargarBarberos() {
    const res = await fetch(`${API}?action=barberos`);
    const data = await res.json();

    barberoSelect.innerHTML = '<option value="">Selecciona barbero</option>';

    data.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.id;          // ID REAL (importante)
      opt.textContent = b.nombre;
      barberoSelect.appendChild(opt);
    });
  }

  /* ================= EVENTOS ================= */
  fechaInput.addEventListener("change", cargarHorarios);
  barberoSelect.addEventListener("change", cargarHorarios);

  /* ================= HORARIOS ================= */
  function cargarHorarios() {
    const fecha = fechaInput.value;
    const barbero = barberoSelect.value;

    horaSelect.innerHTML = '<option value="">Selecciona horario</option>';
    horaSelect.disabled = true;

    if (!fecha || !barbero) return;

    fetch(`${API}?action=horariosDisponibles&fecha=${fecha}&barbero=${barbero}`)
      .then(r => r.json())
      .then(data => {

        if (!Array.isArray(data) || data.length === 0) {
          horaSelect.innerHTML =
            '<option value="">🚫 No hay horarios disponibles</option>';
          return;
        }

        data.forEach(h => {
          const opt = document.createElement("option");
          opt.value = h;
          opt.textContent = h;
          horaSelect.appendChild(opt);
        });

        horaSelect.disabled = false;
      })
      .catch(err => {
        console.error("Error horarios:", err);
        horaSelect.innerHTML =
          '<option value="">Error al cargar horarios</option>';
      });
  }
});

/* ================= RESERVAR ================= */
function reservar() {
  if (reservando) return;

  const cliente = document.getElementById("cliente").value.trim();
  const email   = document.getElementById("email").value.trim();
  const fecha   = document.getElementById("fecha").value;
  const barbero = document.getElementById("barbero").value;
  const hora    = document.getElementById("hora").value;
  const horaSelect = document.getElementById("hora");

  if (!cliente || !email || !fecha || !barbero || !hora) {
    alert("Completa todos los campos");
    return;
  }

  reservando = true;

  const url = `${API}?action=reservar`
    + `&cliente=${encodeURIComponent(cliente)}`
    + `&email=${encodeURIComponent(email)}`
    + `&fecha=${fecha}`
    + `&barbero=${barbero}`
    + `&hora=${hora}`;

  fetch(url)
    .then(r => r.json())
    .then(res => {
      reservando = false;

      if (res.ok) {
        alert("✅ Cita reservada correctamente");

        // limpiar horario y bloquear
        horaSelect.innerHTML =
          '<option value="">Selecciona horario</option>';
        horaSelect.disabled = true;
      } else {
        alert("❌ Hora no Disponible");
      }
    })
    .catch(err => {
      reservando = false;
      console.error(err);
      alert("❌ Error de conexión");
    });
}





