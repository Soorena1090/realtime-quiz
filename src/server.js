const http = require('http');
const WebSocket = require('ws');
const app = require('./index');
const updateController = require('./controllers/updateController');
const connectDB = require('./database/dbConnect')

connectDB();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
