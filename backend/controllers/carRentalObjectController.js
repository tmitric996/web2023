
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
        console.log('req.body', req.body);
        const { name, location, workingHour, logo, manager} = req.body;

        if (!name || !location || !workingHour || !logo) {
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
            manager || null

        );

        carRentalObjectService.saveCarRentalObject(newCarRentalObject);
        return res.status(200).json({message: 'Novi objekat je sacuvan.', facility: newCarRentalObject});


    },

    editFacility(req, res) {
        authService.verifyToken(req, res, 'ADMIN');
        if (res.statusCode === 401) {
            return;
        }
        const id = parseInt(req.params.id);
        const facilityData = req.body;

        const isUpdated = carRentalObjectService.updateFacility(facilityData, id);
        if (isUpdated) {
            return res.status(200).json({message: 'Objekat je uspešno ažurirano.'});
        } else {
            return res.status(404).json({error: 'Objekat sa datim ID-em nije pronađeno.'});
        }
    },

    getFacility(req, res) {
        const facilities = carRentalObjectService.getCarRentalObjectsSortedByWorkingHour();
        return res.status(200).json({ facilities:facilities });
    },

    getFacilityById(req, res) {
        const id = parseInt(req.params.id);

        const facility = carRentalObjectService.getCarRentalObjectsById(id);
        return res.status(200).json({ facility:facility });
    },
};
module.exports = carRentalObjectController;

