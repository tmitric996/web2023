
const fs = require('fs');
const path = require('path');

const Order = require('../models/Order');

const orderFilePath = path.join(__dirname, '../data/order.json');

const saveOrder = (orders) => {
    fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2), 'utf8');
};

const getOrders = () => {
    try {
        const orderData = fs.readFileSync(orderFilePath, 'utf8');
        return JSON.parse(orderData);
    } catch (error) {
        return [];
    }
};
const getOrder = (id) => {
    try {
        const orderData = fs.readFileSync(orderFilePath, 'utf8');
        const orders = JSON.parse(orderData);
        const indexToUpdate = orders.findIndex((order) => order.id ===  parseInt(id));

        const order = orders[indexToUpdate];
        return order || null;
    } catch (error) {
        return null;
    }
};

const getOrderBy= (entity, id) => {
    try {
        const orderData = fs.readFileSync(orderFilePath, 'utf8');
        const orders = JSON.parse(orderData);
        const indexToUpdate = orders.findIndex((order) => order.entity ===  parseInt(id));

        const order = orders[indexToUpdate];
        return order || null;
    } catch (error) {
        return null;
    }
}
class orderService {

    addOrder(order) {
        const orders = getOrders();
        orders.push(order);
        saveOrder(orders);
    }

    getOrdersForUser(id) {
        try {
            const orders = getOrderBy('user', id);
            return orders || null;
        } catch (error) {
            return null;
        }
    }

    getOrdersForManager(id) {
        try {
            const orders = getOrderBy('carRentalObject', id);
            return orders || null;
        } catch (error) {
            return null;
        }
    }
}
module.exports = orderService;