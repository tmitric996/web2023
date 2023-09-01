
const fs = require('fs');
const path = require('path');

const Vehicles = require('../models/Vehicle');

const vehiclesFilePath = path.join(__dirname, '../data/vehicle.json');

const saveVehicles = (vehicles) => {
    fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 2), 'utf8');
};

const getVehicles = () => {
    try {
        const vehiclesData = fs.readFileSync(vehiclesFilePath, 'utf8');
        return JSON.parse(vehiclesData);
    } catch (error) {
        return [];
    }
};
const getVehicle = (id) => {
    try {
        const vehiclesData = fs.readFileSync(vehiclesFilePath, 'utf8');
        const vehicles = JSON.parse(vehiclesData);
        const indexToUpdate = vehicles.findIndex((vehicle) => vehicle.id ===  parseInt(id));

        const vehicle = vehicles[indexToUpdate];
        return vehicle || null;
    } catch (error) {
        return null;
    }
};

class vehicleService {

    saveVehicles(vehicel) {
        const newVehicel = getVehicles();
        newVehicel.push(vehicel);
        saveVehicles(newVehicel);
    }

    getVehicles(idArray) {
        const allVehicles = getVehicles()
        const filteredVehicles = allVehicles.filter(vehicle => idArray.includes(vehicle.id));

        return filteredVehicles;
    }
    updateVehicle(vehicleData, id) {
        try {
            const vehicles = getVehicles();
            const indexToUpdate = vehicles.findIndex((vehicle) => vehicle.id === id);
            if (indexToUpdate === -1) {
                return false;
            }
            const updatedVehicle = { ...vehicles[indexToUpdate], ...vehicleData };
            vehicles[indexToUpdate] = updatedVehicle;
            saveVehicles(vehicles);
            return true;
        } catch (error) {
            console.error('Greška prilikom ažuriranja vozila:', error);
            return false;
        }
    }

    getAvailableForBoject(id) {
        const vehicles = getVehicles();
        console.log("vehicles", vehicles, id);
        return vehicles.filter((vehicle) => vehicle.status === 'available' && parseInt(vehicle.rentalObject) === parseInt(id));

    }

    deleteVehicle(id) {
        try {
            const vehicles = getVehicles();
            const indexToDelete = vehicles.findIndex((vehicle) => vehicle.id === id);
            if (indexToDelete === -1) {
                return false;
            }
            const deletedVehicle = { ...vehicles[indexToDelete], ...{active: false} };
            vehicles[indexToDelete] = deletedVehicle;
            saveVehicles(vehicles);
            return true;
        } catch (error) {
            console.error('Greška prilikom brisanja vozila:', error);
            return false;
        }
    }

    getVehicleById(id) {
        getVehicle(id);
    }

}
module.exports = vehicleService;

