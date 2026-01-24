
const API = "https://script.google.com/macros/s/AKfycbwkLfh6ZMyuuyAxSQ9swLPbbpZwEMlmI8S6_cuOoOhJxJuDA5DrPCWQyqbBh1tLd5jW/exec";
const lista = document.getElementById("lista");

if(!localStorage.getItem("rol")) location.href="login.html";

fetch(`${API}?action=citas`)
.then(r=>r.json())
.then(c=>{
  c.forEach(x=>{
    if(x[6]==="activa"){
      lista.innerHTML += `
        <p>${x[1]} ${x[2]} ${x[4]}
        <button onclick="cancelar('${x[0]}')">❌</button></p>`;
    }
  });
});

function cancelar(id){
  fetch(`${API}?action=cancelar&id=${id}`)
  .then(()=>location.reload());
}

function logout(){
  localStorage.clear();
  location.href="index.html";
}



