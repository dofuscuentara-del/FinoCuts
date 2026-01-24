
const API = "https://script.google.com/macros/s/AKfycbzOOqANPk603mMj5exdUQDgwqVE-6aMBLYLbQv6i5N5y7bC5SajqSjHPzt8UJUqbZ8a/exec";
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




