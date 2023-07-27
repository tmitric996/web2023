
class User {
    static idCounter = 1;

    constructor(username, password, firstName, lastName, gender, dateOfBirth, role, rentals, cart, carRentalObject, loyaltyPoints, customerType) {
        this.id = User.idCounter++;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.role = role;
        this.rentals = rentals;
        this.cart = cart;
        this.carRentalObject = carRentalObject;
        this.loyaltyPoints = loyaltyPoints;
        this.customerType = customerType;
        this.active = true;

    }
}

module.exports = User;

