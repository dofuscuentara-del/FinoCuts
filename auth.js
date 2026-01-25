
function requireAuth() {
  const session = localStorage.getItem("session");
  if (!session) {
    window.location.href = "login.html";
  }
}

function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}









