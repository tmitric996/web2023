
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

class vehicleService {

    saveVehicles(vehicel) {
        const newVehicel = getVehicles();
        newVehicel.push(vehicel);
        saveVehicles(newVehicel);
    }


}
module.exports = vehicleService;

