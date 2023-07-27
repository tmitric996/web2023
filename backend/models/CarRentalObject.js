
class CarRentalObject {
    static idCounter = 1;

    constructor(name, vehicles, workingHour, status, location, logo, rating, manager) {
        this.id = CarRentalObject.idCounter++;
        this.name = name;
        this.vehicles = vehicles;
        this.workingHour = workingHour;
        this.status = status;
        this.location = location;
        this.logo = logo;
        this.rating = rating;
        this.manager = manager;
        this.active = true;
    }
}

module.exports = CarRentalObject;
