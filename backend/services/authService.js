
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const usersFilePath = path.join(__dirname, '../data/users.json');
const secretKey = 'my_secret_key'; // Tajni ključ za potpisivanje JWT tokena

const getUsers = () => {
    try {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};


class AuthService {
    getUserByUsername(username) {
        const users = getUsers();
        return users.find((user) => user.username === username);
    }

    generateToken(user) {
        const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
        return token;
    }

    verifyToken(req, res, permission) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Nedostaje JWT token' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Neispravan JWT token' });
            }

            req.user = decoded.username;
            if (permission && decoded.role!=permission) {
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


    // Ovde možete dodati i druge funkcije koje su relevantne za autentifikaciju i registraciju korisnika
}

module.exports = AuthService;
