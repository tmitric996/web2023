const express = require('express');
const authController = require('../controllers/authController.js');
const carRentalObjectController = require('../controllers/carRentalObjectController.js');
const vehicleController = require('../controllers/vehicleController.js');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.post('/register/manager', authController.registerManager);

router.post('/facility', carRentalObjectController.addFacility);
router.get('/facility', carRentalObjectController.getFacility);

router.post('/vehicle', vehicleController.addVehicle);
router.put('/vehicle/:id', vehicleController.updateVehicle);
router.delete('/vehicle/:id', vehicleController.deleteVehicle);

module.exports = router;
