
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
const getCarRentalObjectById = (id) => {
    try {
        const objectsData = fs.readFileSync(carRentalObjectFilePath, 'utf8');
        const objects = JSON.parse(objectsData);
        const index = objects.findIndex((object) => object.id ===  parseInt(id));

        const object = objects[index];
        return object || null;
    } catch (error) {
        return null;
    }
};
class carRentalObjectService {

    saveCarRentalObject(carRentalObject) {
        const objects = getCarRentalObjects();
        console.log('carRentalObject',carRentalObject);
        objects.push(carRentalObject);
        saveCarRentalObjects(objects);
    }
    getCarRentalObjectsById(id) {
         return getCarRentalObjectById(id);
    }
    getCarRentalObjectsSortedByWorkingHour() {
        const carRentalObjects = getCarRentalObjects();

        // const currentTime = new Date();
        // const currentHour = currentTime.getHours();
        // const currentMinutes = currentTime.getMinutes();
        //
        // const compareWorkingHour = (obj1, obj2) => {
        //     const [hour1, minute1] = obj1.workingHour.split(':').map(Number);
        //     const [hour2, minute2] = obj2.workingHour.split(':').map(Number);
        //
        //     const isOpen1 = hour1 < currentHour || (hour1 === currentHour && minute1 <= currentMinutes);
        //     const isOpen2 = hour2 < currentHour || (hour2 === currentHour && minute2 <= currentMinutes);
        //
        //     if (isOpen1 && !isOpen2) return -1;
        //     if (!isOpen1 && isOpen2) return 1;
        //
        //     if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) return -1;
        //     if (hour1 > hour2 || (hour1 === hour2 && minute1 > minute2)) return 1;
        //     return 0;
        // };

        // carRentalObjects.sort(compareWorkingHour);
//todo napraviiti novu sort koji radi sa novim unosom working houra
//todo takodje napraviti da je unos praza za dane to znaci da ne radi
        return carRentalObjects;
    };

    updateFacility(objectData, id) {
        try {
            const objects = getCarRentalObjects();
            const indexToUpdate = objects.findIndex((object) => object.id === id);
            if (indexToUpdate === -1) {
                return false;
            }
            console.log("objectData,", objectData);

            const updatedObject = { ...objects[indexToUpdate], ...objectData}
            objects[indexToUpdate] = updatedObject;
            console.log("updatedObject,", updatedObject);
            saveCarRentalObjects(objects);
            return true;
        } catch (error) {
            console.error('Greška prilikom ažuriranja objekta:', error);
            return false;
        }
    }

    getObjects() {
        const carRentalObjects = getCarRentalObjects();
        return carRentalObjects;
    }

}
module.exports = carRentalObjectService;

