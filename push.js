const VAPID_PUBLIC_KEY =
  "BMNIgV6ByYDtvFwuzJu2KWAqV1mmBpFM4coCzrs6NREnWQQwoAO0zDzOI4jZhBJZi9b9g3kdAljNNxfu4FRYh1Q";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

async function activarNotificaciones() {
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  if (!session.barbero_id) return;

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return;

  const reg = await navigator.serviceWorker.ready;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  fetch(
    `${API}?action=guardarPush&barbero_id=${session.barbero_id}&sub=${encodeURIComponent(JSON.stringify(sub))}`
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}


