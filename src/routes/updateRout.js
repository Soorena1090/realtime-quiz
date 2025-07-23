const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/update', updateController.updateData);
router.get('/long-polling', (req, res) => {
  updateController.addWaitingClient(res);

  req.setTimeout(30000, () => {
    res.json({ message: 'Timeout - no new data', timestamp: new Date() });
  });
});

module.exports = router;
