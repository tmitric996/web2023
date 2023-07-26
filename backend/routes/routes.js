const express = require('express');
const authController = require('../controllers/authController.js');
const carRentalObjectController = require('../controllers/carRentalObjectController.js');
const vehicleController = require('../controllers/vehicleController.js');
const orderController = require('../controllers/orderController.js');

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

router.post('/order', orderController.addOrder);
router.get('/order/user', orderController.getUserOrder);
router.get('/order/object', orderController.getObjectOrder);


module.exports = router;
