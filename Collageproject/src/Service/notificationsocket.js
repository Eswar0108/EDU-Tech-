// Service/notificationsocket.js

let notificationSocket = null;

export const initNotificationSocketSafe = (onMessage) => {

  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {

    console.warn("⚠️ No token found. Notification socket not started.");

    return;

  }

  // close existing socket if already open
  if (notificationSocket) {

    notificationSocket.close();

  }

  try {

    notificationSocket = new WebSocket(
      `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/notifications/ws/notifications?token=${token}`
    );

    notificationSocket.onopen = () => {

      console.log("✅ Notification socket connected");

    };

    notificationSocket.onmessage = (event) => {

      try {

        const data = JSON.parse(event.data);

        console.log("🔔 Notification received:", data);

        if (onMessage) {

          onMessage(data);

        }

      } catch (err) {

        console.error("Invalid socket message format:", err);

      }

    };

    notificationSocket.onclose = () => {

      console.warn("❌ Notification socket disconnected");

    };

    notificationSocket.onerror = (error) => {

      console.error("Socket error:", error);

    };

  } catch (error) {

    console.error("WebSocket init failed:", error);

  }

};


// optional cleanup function
export const closeNotificationSocket = () => {

  if (notificationSocket) {

    notificationSocket.close();

    notificationSocket = null;

  }

};