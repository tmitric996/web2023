const express = require('express');
const authController = require('../controllers/authController.js');
const carRentalObjectController = require('../controllers/carRentalObjectController.js');
const vehicleController = require('../controllers/vehicleController.js');
const orderController = require('../controllers/orderController.js');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.get('/managers', authController.getManagers);
router.get('/managers/free', authController.getManagers);
router.get('/profile/:username', authController.getUserProfile);
router.put('/profile/:id', authController.editProfile);


router.post('/facility', carRentalObjectController.addFacility);
router.put('/facility/:id', carRentalObjectController.editFacility);
router.get('/facility', carRentalObjectController.getFacility);
router.get('/facility/:id', carRentalObjectController.getFacilityById);

router.post('/vehicle', vehicleController.addVehicle);
router.put('/vehicle/:id', vehicleController.updateVehicle);
router.delete('/vehicle/:id', vehicleController.deleteVehicle);

router.post('/order', orderController.addOrder);
router.get('/order/customer/:id', orderController.getUserOrder);
router.get('/order/object/:id', orderController.getObjectOrder);


module.exports = router;
