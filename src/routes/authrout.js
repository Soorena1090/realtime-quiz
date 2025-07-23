const express = require('express');
const router = express.Router();

const auhtController = require('../controllers/authcontroller')
router.post('/register', auhtController.register);
router.post('/login', auhtController.login);

module.export = router;
