const BASEURL = "http://127.0.0.1:8000";

export const connectIncomingCallSocket = (userId, onMessage) => {

  if (!userId) return null;

  const socket = new WebSocket(
    `${BASEURL.replace("http", "ws")}/call/ws/call/${userId}`
  );

  socket.onopen = () =>
    console.log("✅ socket connected");

  socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    console.log("📩 socket:", data);

    onMessage(data);
  };

  socket.onerror = (err) =>
    console.log("❌ socket error", err);

  socket.onclose = () =>
    console.log("🔌 socket closed");

  return socket;
};