const VehicleService = require("../services/vehicleService");
const AuthService = require("../services/authService");
const Vehicle = require('../models/Vehicle');

const authService = new AuthService();
const vehicleService = new VehicleService();

const vehicleController = {
    addVehicle(req, res) {
        authService.verifyToken(req, res, 'MANAGER');
        if (res.statusCode === 401) {
            return;
        }
        const { make, model, picture, numberOfSeats, numberOfDoors, typeFuel, consumption, type, description} = req.body;
        if (!make || !model || !picture || !numberOfSeats || !numberOfDoors || !typeFuel || !consumption || !type) {
            return res.status(400).json({ message: 'Molimo popunite sva polja.' });
        }

        const newVehicle = new Vehicle(
            make,
            model,
            picture,
            numberOfSeats,
            numberOfDoors,
            typeFuel,
            consumption,
            type,
            description? description:null
        );

        vehicleService.saveVehicles(newVehicle);
        return res.status(200).json({message: 'Novo vozilo je sacuvan.'});

    },
};
module.exports = vehicleController;
