// Registro del service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("SW error", err));
}

// Solicitar permiso de notificaciones
function pedirPermisoNotificaciones() {
  if (!("Notification" in window)) {
    alert("Este navegador no soporta notificaciones");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("Citas Barbería", {
        body: "Notificaciones activadas correctamente ✂️"
      });
    }
  });
}

