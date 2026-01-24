const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";

async function login(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Completa todos los campos");
    return;
  }

  const res = await fetch(
    `${API}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  const data = await res.json();

  if(!data.ok){
    alert("Credenciales incorrectas");
    return;
  }

  localStorage.setItem("usuario", JSON.stringify(data));
  window.location.href = "panel.html";
}


