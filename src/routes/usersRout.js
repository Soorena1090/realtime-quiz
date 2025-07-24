const express = require('express');
const router = express.Router();
const {allUser} = require('../controllers/userController');

router.get('/users',allUser);

module.exports = router