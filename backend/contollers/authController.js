// controllers/authController.js

const AuthService = require('../services/authService');

const authService = new AuthService();

const authController = {
    register(req, res) {
        // Uzimanje podataka iz tela zahteva
        const { username, password, firstName, lastName, gender, dateOfBirth } = req.body;

        // Validacija podataka
        if (!username || !password || !firstName || !lastName || !gender || !dateOfBirth) {
            return res.status(400).json({ message: 'Molimo popunite sva polja.' });
        }

        // Provera da li korisnik sa istim korisničkim imenom već postoji
        const existingUser = authService.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Korisničko ime već postoji.' });
        }

        // Kreiranje novog korisnika
        const newUser = {
            username,
            password,
            firstName,
            lastName,
            gender,
            dateOfBirth,
        };

        // Čuvanje korisnika
        authService.saveUser(newUser);

        return res.status(200).json({ message: 'Uspešno ste se registrovali.' });
    },

    login(req, res) {
        // Uzimanje podataka iz tela zahteva
        const { username, password } = req.body;

        // Validacija podataka
        if (!username || !password) {
            return res.status(400).json({ message: 'Molimo unesite korisničko ime i lozinku.' });
        }

        // Provera korisnika u bazi podataka
        const user = authService.getUserByUsername(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Pogrešno korisničko ime ili lozinka.' });
        }

        // Generisanje JWT tokena ili drugog oblika autentifikacije
        const token = authService.generateToken(user);

        return res.status(200).json({ token });
    },

    logout(req, res) {
        // Implementirajte logiku odjavljivanja korisnika
        return res.status(200).json({ message: 'Uspešno ste se odjavili.' });
    },
};

module.exports = authController;
