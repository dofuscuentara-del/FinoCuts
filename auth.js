
const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";
const email = document.getElementById("email");

function login(){

    fetch(`${API}?action=login&email=${encodeURIComponent(email.value)}`)
  .then(r=>r.json())
  .then(d=>{
    if(!d.ok) return alert("Acceso denegado");
    localStorage.setItem("rol",d.rol);
    location.href="panel.html";
  });
}





