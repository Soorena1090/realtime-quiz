const http = require('http');
const WebSocket = require('ws');
const app = require('./index');
const updateController = require('./controller/updateController');

const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

updateController.setWebsocket(websocketServer);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(port);
});
