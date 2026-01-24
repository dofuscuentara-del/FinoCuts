
const API = "https://script.google.com/macros/s/AKfycbx5mES2F8BUsFJO6jhUYdDydqa5X_RLU3a1gtnW5iIIzrPHbGQ0joPnst1FI1E1-1xY/exec";
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



