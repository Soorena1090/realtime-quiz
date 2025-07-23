const http = require('http');
const WebSocket = require('ws');
const app = require('./index');
const updateController = require('./controller/updateController');

const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

updateController.setWssInstance(websocketServer);

websocketServer.on('connection', socket => {
  console.log('websocket ok');
  websocketServer.send('server on');
  socket.on('message' , message => {
    websocketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
    }
  });
  })
});

app.get('/long-polling', (req, res) => {
  updateController.addClient(res);
  req.setTimeout(30000, () => {
    res.json({ message: 'no data', time: new Date() });
  });
});

app.post('/update', updateController.sendUpdate);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(port);
});
