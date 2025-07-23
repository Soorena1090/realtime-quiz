
let waitingClients = [];
let wss; 
const setWssInstance = (wssInstance) => {
  wss = wssInstance;
};

const latestData = null;

const updateData = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const data = { message, timestamp: new Date() };

  waitingClients.forEach(clientRes => clientRes.json(data));
  waitingClients = [];

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

  res.json({ status: 'Data updated and sent' });
};

const addWaitingClient = (res) => {
  waitingClients.push(res);
};

module.exports = {
  updateData,
  addWaitingClient,
  setWssInstance,
};
