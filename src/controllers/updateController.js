let clients = [];
const websocketServer = null;

const setWebsocket = (wss) => {
  websocketServer = wss;

  websocketServer.on("connecting", (ws) => {
    console.log("WebSocket connect");
    ws.on("message", (message) => {
      console.log("Received:", message);
      ws.send(message);
    });
  });
};

const addClient = (res) => {
  clients.push(res);
};

const sendUpdate = (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  clients.forEach((client) => client.json({ message }));
  clients = [];

  if (websocketServer) {
    websocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  res.json({ status: "Message sent to all clients" });
};

module.exports = {
  setWebsocket,
  addClient,
  sendUpdate,
};
