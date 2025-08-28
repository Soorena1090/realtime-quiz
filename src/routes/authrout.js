const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const auhtController = require('../controllers/authcontroller')
router.post('/register', auhtController.register);
router.post('/login', auhtController.login);

module.exports = router;
