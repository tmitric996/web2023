
const CarRentalObjectService = require('../services/carRentalObjectService');
const User = require('../models/User');
const CarRentalObject = require('../models/CarRentalObject');
const AuthService = require("../services/authService");

const authService = new AuthService();
const carRentalObjectService = new CarRentalObjectService();

const carRentalObjectController = {
    addFacility(req, res) {

        authService.verifyToken(req, res, 'ADMIN');
        if (res.statusCode === 401) {
            return;
        }
        const { name, location, workingHour, logo, manager} = req.body;

        if (!name || !location || !workingHour || !logo || !manager) {
            return res.status(400).json({ message: 'Molimo popunite sva polja.' });
        }

        const newCarRentalObject = new CarRentalObject(
            name,
            null,
            workingHour,
            null,
            location,
            logo,
            null,
            manager

        );

        carRentalObjectService.saveCarRentalObject(newCarRentalObject);
        return res.status(200).json({message: 'Novi objekat je sacuvan.'});


    },

    getFacility(req, res) {
        const facilities = carRentalObjectService.getCarRentalObjectsSortedByWorkingHour();
        return res.status(200).json({ facilities:facilities });
    },
};
module.exports = carRentalObjectController;

