const http = require('http');
const WebSocket = require('ws');
const app = require('./index');
const updateController = require('./controller/updateController');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

updateController.setWssInstance(wss);

wss.on('connection', ws => {
  console.log('WebSocket connected');
  ws.send(JSON.stringify({ message: 'Welcome!' }));
});

app.get('/long-polling', (req, res) => {
  updateController.addWaitingClient(res);
  
  req.setTimeout(30000, () => {
    res.json({ message: 'Timeout - no new data', timestamp: new Date() });
  });
});

app.post('/update', updateController.updateData);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
