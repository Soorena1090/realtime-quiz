const express = require('express');
const router = express.Router();
const {allUser} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
router.get('/users',authMiddleware,allUser);

module.exports = router