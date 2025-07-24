const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/update', updateController.sendUpdate);
router.get('/long-polling', (req, res) => {
  updateController.addClient(res);

  req.setTimeout(10000, () => {
    res.json({ message: 'Timeout - no new data', timestamp: new Date() });
  });
});

module.exports = router;
