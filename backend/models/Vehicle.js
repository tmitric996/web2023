
class Vehicle {
    static idCounter = 1;

    constructor(brand, model, price, type, rentalObject, transmission, fuelType, consumption, numberOfDoors, numberOfPersons, image, status, description) {
        this.id = Date.now() + Vehicle.idCounter++;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.type = type;
        this.rentalObject = rentalObject;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.consumption = consumption;
        this.numberOfDoors = numberOfDoors;
        this.numberOfPersons = numberOfPersons;
        this.image = image;
        this.status = status;
        this.description = description? description:null;
        this.active = true;

    }

}

module.exports = Vehicle;
