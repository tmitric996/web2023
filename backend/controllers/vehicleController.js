const VehicleService = require("../services/vehicleService");
const AuthService = require("../services/authService");
const Vehicle = require('../models/Vehicle');
const CarRentalObjectService = require("../services/carRentalObjectService");

const authService = new AuthService();
const vehicleService = new VehicleService();
const carRentalObjectService = new CarRentalObjectService();

const vehicleController = {

    addVehicle(req, res) {
        authService.verifyToken(req, res, 'MANAGER');
        if (res.statusCode === 401) {
            return;
        }
        const { brand, model, price, type, rentalObject, transmission, fuelType, consumption, numberOfDoors, numberOfPersons, image, status, description } = req.body;
        if (!brand || !model || !price || !type || !rentalObject || !transmission || !fuelType || !consumption || !numberOfPersons || !image  || !numberOfDoors) {

            return res.status(400).json({ message: 'Molimo popunite sva polja.' });
        }

        const newVehicle = new Vehicle(
            brand,
            model,
            price,
            type,
            rentalObject,
            transmission,
            fuelType,
            consumption,
            numberOfDoors,
            numberOfPersons,
            image,
            status? status:'available',
            description? description:null
        );

        vehicleService.saveVehicles(newVehicle);
        carRentalObjectService.addVehicle(newVehicle.id, newVehicle.rentalObject);
        return res.status(200).json({message: 'Novo vozilo je sacuvan.'});

    },

    updateVehicle(req, res) {
        authService.verifyToken(req, res, 'MANAGER');
        if (res.statusCode === 401) {
            return;
        }
        const id = parseInt(req.params.id);
        const vehicleData = req.body;

        const isUpdated = vehicleService.updateVehicle(vehicleData, id);
        if (isUpdated) {
            return res.status(200).json({message: 'Vozilo je uspešno ažurirano.'});
        } else {
            return res.status(404).json({error: 'Vozilo sa datim ID-em nije pronađeno.'});
        }
    },

    getVehicles(req, res) {
        const ids = req.params.ids;
        authService.verifyToken(req, res, 'USER');
        if (res.statusCode === 401) {
            return;
        }
        const idArray = ids.slice(0, -1).split('-').map(str => parseInt(str, 10));
        const vehicles =  vehicleService.getVehicles(idArray);
        return res.status(200).json({ vehicles: vehicles });
    },
    deleteVehicle(req, res) {
        authService.verifyToken(req, res, 'MANAGER');
        if (res.statusCode === 401) {
            return;
        }
        const id = parseInt(req.params.id);

        const isDeleted = vehicleService.deleteVehicle(id);
        if (isDeleted) {
            return res.status(200).json({ message: 'Vozilo je uspešno obrisano.' });
        } else {
            return res.status(404).json({ error: 'Vozilo sa datim ID-em nije pronađeno.' });
        }
    },
};
module.exports = vehicleController;
