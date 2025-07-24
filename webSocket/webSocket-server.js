const http = require('http');
const WebSocket = require('ws');
const updateController = require('./controllers/updateController');

const server = http.createServer(); 
const wss = new WebSocket.Server({ server });

updateController.setWebsocket(wss);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`WebSocket Server running on port ${PORT}`);
});
