const express = require('express');
const app = express();

app.use(express.json());
app.use(require('./routes/updateRout'));
app.use(require('./routes/authrout'));
app.use(require('./routes/ping.routes'));
app.use(require('./routes/usersRout'))



app.get('/', (req, res) => {
  res.send('Api run');
});

module.exports = app;
