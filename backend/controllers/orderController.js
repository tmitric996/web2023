const Orderervice = require("../services/orderService");
const AuthService = require("../services/authService");
const ObjectService = require("../services/carRentalObjectService");
const Order = require('../models/Order');
const Vehicle = require("../models/Vehicle");

const authService = new AuthService();
const orderService = new Orderervice();
const objectService = new ObjectService();

const orderController = {

    addOrder(req, res) {
        authService.verifyToken(req, res, 'USER');
        if (res.statusCode === 401) {
            return;
        }
        const { vehicles, carRentalObject, dateAndTime, duration, price, customer, status } = req.body;
        if (!vehicles || !carRentalObject || !dateAndTime || !duration || !price || !customer || !status ) {
            return res.status(400).json({ message: 'Molimo popunite sva polja.' });
        }
        const user = authService.getUserByUsername(customer);
        const newOrder = new Order(
            vehicles,
            carRentalObject,
            dateAndTime,
            duration,
            price,
            user.id,
            status
        );

        orderService.addOrder(newOrder);
        return res.status(200).json({message: 'Registrovano iznajmljivanje.'});

    },

    getUserOrder(req, res) {
        authService.verifyToken(req, res, 'USER');
        if (res.statusCode === 401) {
            return;
        }
        const username = req.params.id;
        const user = authService.getUserByUsername(username);

        const orders = orderService.getOrdersForUser(user.id);
        return res.status(200).json({ orders: orders });
    },

    getObjectOrder(req, res) {
        authService.verifyToken(req, res, 'MANAGER');
        if (res.statusCode === 401) {
            return;
        }
        const id = parseInt(req.params.id);

        const orders = orderService.getOrdersForManager(id);
        return res.status(200).json({ orders:orders });
    },

    getVehiclesForDates(req, res) {
        authService.verifyToken(req, res, 'USER')
        if (res.statusCode === 401) {
            return;
        }
        const id = req.body.objectId;
        const startDate = parseInt(req.body.start_date);
        const endDate = parseInt(req.body.end_date);
        const vehicles = orderService.getAvailableVehiclesForPeriod(id, startDate, endDate);
        return res.status(200).json({ vehicles:vehicles });


    },

};
module.exports = orderController;
