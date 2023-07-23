
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const CarRentalObject = require('../models/CarRentalObject');

const usersFilePath = path.join(__dirname, '../data/users.json');
const carRentalObjectFilePath = path.join(__dirname, '../data/carRentalObject.json');

const saveCarRentalObjects = (objects) => {
    fs.writeFileSync(carRentalObjectFilePath, JSON.stringify(objects, null, 2), 'utf8');
};

const getCarRentalObjects = () => {
    try {
        const objectsData = fs.readFileSync(carRentalObjectFilePath, 'utf8');
        return JSON.parse(objectsData);
    } catch (error) {
        return [];
    }
};

class carRentalObjectService {

    saveCarRentalObject(carRentalObject) {
        const objects = getCarRentalObjects();
        objects.push(carRentalObject);
        saveCarRentalObjects(objects);
    }

    getCarRentalObjectsSortedByWorkingHour() {
        const carRentalObjects = getCarRentalObjects();

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        const compareWorkingHour = (obj1, obj2) => {
            const [hour1, minute1] = obj1.workingHour.split(':').map(Number);
            const [hour2, minute2] = obj2.workingHour.split(':').map(Number);

            const isOpen1 = hour1 < currentHour || (hour1 === currentHour && minute1 <= currentMinutes);
            const isOpen2 = hour2 < currentHour || (hour2 === currentHour && minute2 <= currentMinutes);

            if (isOpen1 && !isOpen2) return -1;
            if (!isOpen1 && isOpen2) return 1;

            if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) return -1;
            if (hour1 > hour2 || (hour1 === hour2 && minute1 > minute2)) return 1;
            return 0;
        };

        carRentalObjects.sort(compareWorkingHour);

        return carRentalObjects;
    };


}
module.exports = carRentalObjectService;

