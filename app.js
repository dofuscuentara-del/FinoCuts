
const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // Cargar tema guardado
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
});


// ================= BARBEROS =================
async function cargarBarberos(){
  const res = await fetch(`${API}?action=barberos`);
  const data = await res.json();

  const select = document.getElementById("barbero");
  select.innerHTML = '<option value="">Selecciona barbero</option>';

  data.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.nombre;
    select.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", cargarBarberos);













