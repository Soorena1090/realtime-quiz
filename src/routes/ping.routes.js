const express = require('express');
const roter = express.Router();
const {ping} = require('../controllers/ping.controller')

router.get('/ping',ping);
module.exports= roter;