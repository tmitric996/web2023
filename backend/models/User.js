class User {
    constructor(username, password, firstName, lastName, gender, dateOfBirth, role, rentals, cart, carRentalObject, loyaltyPoints, customerType) {
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
    }
}

module.exports = User;

