
const API = "https://script.google.com/macros/s/AKfycbzOOqANPk603mMj5exdUQDgwqVE-6aMBLYLbQv6i5N5y7bC5SajqSjHPzt8UJUqbZ8a/exec";

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










