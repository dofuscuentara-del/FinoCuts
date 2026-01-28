/* =========================
   SERVICE WORKER
========================= */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker registrado"))
    .catch(err => console.error("❌ SW error", err));
}

/* =========================
   PUSH CONFIG
========================= */
// 🔴 CAMBIA esta clave por la tuya (VAPID PUBLIC KEY)
const VAPID_PUBLIC_KEY = "BMNIgV6ByYDtvFwuzJu2KWAqV1mmBpFM4coCzrs6NREnWQQwoAO0zDzOI4jZhBJZi9b9g3kdAljNNxfu4FRYh1Q";

// Detectar tipo de usuario
// index.html  -> cliente
// panel.html  -> barbero
const tipoUsuario = location.pathname.includes("panel")
  ? "barbero"
  : "cliente";

/* =========================
   PEDIR PERMISO + SUSCRIBIR
========================= */
async function pedirPermisoNotificaciones() {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    alert("Este navegador no soporta notificaciones");
    return;
  }

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") {
    alert("Permiso de notificaciones denegado");
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  console.log("📩 Push subscription creada", subscription);

  // Enviar suscripción a Apps Script
  guardarSuscripcion(subscription);
}

/* =========================
   GUARDAR EN APPS SCRIPT
========================= */
function guardarSuscripcion(subscription) {
  const session = JSON.parse(localStorage.getItem("session") || "{}");

  fetch(`${API}?action=guardarPush`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: tipoUsuario,
      barbero_id: session.barbero_id || "",
      subscription
    })
  })
    .then(r => r.json())
    .then(res => {
      if (res.ok) {
        new Notification("Citas Barbería", {
          body: "Notificaciones activadas correctamente ✂️"
        });
      }
    });
}

/* =========================
   HELPER VAPID
========================= */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
