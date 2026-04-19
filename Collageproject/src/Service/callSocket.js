const getWsUrl = (path) => {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${window.location.host}${path}`;
};

export const connectIncomingCallSocket = (userId, onMessage) => {

  if (!userId) return null;

  const socket = new WebSocket(
    getWsUrl(`/call/ws/call/${userId}`)
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