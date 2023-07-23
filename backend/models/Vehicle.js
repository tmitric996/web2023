
class Vehicle {
    static idCounter = 1;

    constructor(make, model, picture, numberOfSeats, numberOfDoors, typeFuel, consumption, type, description) {
        this.id = Vehicle.idCounter++;
        this.make = make;
        this.model = model;
        this.picture = picture;
        this.numberOfSeats = numberOfSeats;
        this.numberOfDoors = numberOfDoors;
        this.typeFuel = typeFuel;
        this.consumption = consumption;
        this.type = type;
        this.description = description? description:null;
    }
}

module.exports = Vehicle;
