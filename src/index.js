const express = require('express');
const app = express();
const updateController = require('./controllers/updateController');
const connectDB = require('./database/dbConnect')
const pool = require('./database/mysqlConnect');


app.use(express.json());
app.use(require('./routes/updateRout'));
app.use(require('./routes/authrout'));
app.use(require('./routes/ping.routes'));
app.use(require('./routes/usersRout'))
app.use(require('./routes/quizRout'))


connectDB();


app.get('/', (req, res) => {
  res.send('Api run');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
