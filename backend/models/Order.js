
class Order {
    static idCounter = 1;

    constructor(vehicles, carRentalObject, dateAndTime, duration, price, customer, status) {
        this.id = Order.idCounter++;
        this.vehicles = vehicles;
        this.carRentalObject = carRentalObject;
        this.dateAndTime = dateAndTime;
        this.duration = duration;
        this.price = price;
        this.customer = customer;
        this.status = status;
    }

}

module.exports = Order;
