const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);

module.exports = router;
