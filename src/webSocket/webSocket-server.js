require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.WS_PORT || 8080;

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.send(JSON.stringify({ message: 'Welcome to WebSocket server' }));

  ws.on('message', (message) => {
    console.log('📩 Received from client:', message.toString());
    
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message.toString()}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`ws running on ws://localhost:${PORT}`);
});
