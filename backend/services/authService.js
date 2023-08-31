
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const CarRentalObjectService = require('./carRentalObjectService');
const carRentalObjectService = new CarRentalObjectService();

const usersFilePath = path.join(__dirname, '../data/users.json');
const secretKey = 'my_secret_key';

const getUsers = () => {
    try {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        return [];
    }
};

const getManagers = (free) => {
    try {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        let managers = users.filter(user => user.role === 'MANAGER');
        if (free) {
            const objects = carRentalObjectService.getObjects();
            let occupiedManagers = [];
            objects.forEach(object => {
                occupiedManagers.push(object.manager);
            });
            managers = managers.filter(manager => {
                if (!occupiedManagers.includes(manager.id)){
                    return true;
                }});
        }
        return managers || null;
    } catch (error) {
        return [];
    }
};

const getUserBy= (param, id) => {
    try {
        const userData = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(userData);
        const user = users.filter(user => user[param] === id);
console.log("user", user)
        return user || null;
    } catch (error) {
        return null;
    }
}

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};


class AuthService {
    getUserByUsername(username) {
        const users = getUsers();
        return users.find((user) => user.username === username);
    }

    updateProfile(data, id) {
        try {
            const users = getUsers();
            const indexToUpdate = users.findIndex((user) => user.id === id);
            if (indexToUpdate === -1) {
                return false;
            }

            const updatedUser = { ...users[indexToUpdate], ...data}
            users[indexToUpdate] = updatedUser;
            console.log("updatedObject,", updatedUser);
            saveUsers(users);
            return true;
        } catch (error) {
            console.error('Greška prilikom ažuriranja profila:', error);
            return false;
        }
    }

    getAllManagers(free) {
        let managers = [];
        if (free) {
            managers = getManagers(free);
        } else {
            managers = getManagers();
        }
        return managers;
    }

    generateToken(user) {
        const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '2h' });
        return token;
    }

    verifyToken(req, res, permission) {
        const token = req.headers.authorization;
        console.log('objectIdreq',req)

        if (!token) {
            return res.status(401).json({ error: 'Nedostaje JWT token' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Neispravan JWT token' });
            }

            req.user = decoded.username;
            if (permission && !permission.includes(decoded.role)) {
                return res.status(401).json({ error: 'Nemate odgovarajuce permisije' });
            }
            req.role = decoded.role;
            // return res.json({ message: 'Autentičnost potvrđena' });
        });
    }

    saveUser(user) {
        const users = getUsers();
        users.push(user);
        saveUsers(users);
    }

    getUserBy(param, value) {
        const user = getUserBy(param, value);
        return user;
    }

}

module.exports = AuthService;
