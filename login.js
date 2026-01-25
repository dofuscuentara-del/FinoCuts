
const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("Login:", email, password);

  if (!email || !password) {
    alert("Completa todos los campos");
    return;
  }

  fetch(`${API}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    .then(r => r.json())
    .then(d => {
      console.log("Respuesta:", d);

      if (!d.ok) {
        alert("Acceso denegado");
        return;
      }

      localStorage.setItem("session", JSON.stringify(d));
      window.location.href = "panel.html";
    })
    .catch(err => {
      console.error(err);
      alert("Error de conexión");
    });
}



