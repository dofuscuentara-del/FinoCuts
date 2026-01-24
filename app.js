
const API = "https://script.google.com/macros/s/AKfycbx5mES2F8BUsFJO6jhUYdDydqa5X_RLU3a1gtnW5iIIzrPHbGQ0joPnst1FI1E1-1xY/exec";

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








