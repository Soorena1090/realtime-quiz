
let clients = []; 
let websocket; 
const setWebsocket = (ws) => {
  websocket = ws;
};

let data = null; 

const sendUpdate = (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({ error: 'need message' });
  }

  const newData = { message: message, time: new Date() }; 
  data = newData; 
  
  for (let i = 0; i < clients.length; i++) {
    clients[i].json(newData);
  }
  clients = [];

  
  websocket.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(newData.message);
    }
  });

  res.json({ status: 'data sent ok' });
};

const addClient = (res) => {
  clients.push(res);
};

module.exports = {
  sendUpdate,
  addClient,
  setWebsocket
};