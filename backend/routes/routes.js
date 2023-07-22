const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.post('/register/manager', authController.registerManager);


module.exports = router;
