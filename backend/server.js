const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'my_secret_key123';
const USERS_FILE = 'data/users.json';

// Endpoint za registraciju korisnika
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // // Provjeri da li korisnik već postoji
    const users = getUsers();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'Korisnik već postoji' });
    }

    // Kreiraj novog korisnika
    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);

    res.json({ message: 'Registracija uspješna' });
});

// Endpoint za prijavu korisnika
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Provjeri korisničko ime i lozinku
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Pogrešno korisničko ime ili lozinka' });
    }

    // Generiši JWT token
    const token = jwt.sign({ username }, SECRET_KEY);

    res.json({ token });
});

// Endpoint za provjeru autentičnosti
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Autentičnost potvrđena' });
});

// Middleware za provjeru JWT tokena
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Nedostaje JWT token' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Neispravan JWT token' });
        }

        req.user = decoded.username;
        next();
    });
}

// Pomoćne funkcije za čitanje i pisanje korisnika u JSON fajl
function getUsers() {
    const usersData = fs.readFileSync(USERS_FILE);
    return JSON.parse(usersData);
}

function saveUsers(users) {
    const data = JSON.stringify(users);
    fs.writeFileSync(USERS_FILE, data);
}

// Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
