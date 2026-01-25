
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // Tema guardado
  const theme = localStorage.getItem("theme");

  if (theme === "light") {
    document.body.classList.add("light");
    btn.textContent = "🌙";
  } else {
    document.body.classList.remove("light");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    btn.textContent = isLight ? "🌙" : "☀️";
  });
});


