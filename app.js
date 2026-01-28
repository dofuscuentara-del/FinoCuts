const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

let reservando = false;

document.addEventListener("DOMContentLoaded", () => {

  const fechaInput = document.getElementById("fecha");
  const barberoSelect = document.getElementById("barbero");
  const horaSelect = document.getElementById("hora");

  horaSelect.disabled = true;

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

  fechaInput.addEventListener("change", cargarHorarios);
  barberoSelect.addEventListener("change", cargarHorarios);

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
          horaSelect.innerHTML = '<option>🚫 No hay horarios</option>';
          return;
        }

        data.forEach(h => {
          const opt = document.createElement("option");
          opt.value = h;
          opt.textContent = h;
          horaSelect.appendChild(opt);
        });

        horaSelect.disabled = false;
      });
  }
});

function reservar() {
  if (reservando) return;

  const cliente = cliente.value.trim();
  const email = email.value.trim();
  const fecha = fecha.value;
  const barbero = barbero.value;
  const hora = hora.value;

  if (!cliente || !email || !fecha || !barbero || !hora) {
    alert("Completa todos los campos");
    return;
  }

  reservando = true;

  fetch(
    `${API}?action=reservar&cliente=${encodeURIComponent(cliente)}&email=${encodeURIComponent(email)}&fecha=${fecha}&barbero=${barbero}&hora=${hora}`
  )
    .then(r => r.json())
    .then(res => {
      reservando = false;
      alert(res.ok ? "✅ Cita reservada" : "❌ Error");
    });
}

