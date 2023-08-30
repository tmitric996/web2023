
const AuthService = require('../services/authService');
const User = require('../models/User');

const authService = new AuthService();

const authController = {
    register(req, res) {
        // Uzimanje podataka iz tela zahteva
        const { username, password, firstName, lastName, gender, dateOfBirth, role, carRentalObject } = req.body;

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
        const newUser = new User(
            username,
            password,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            role? role : 'USER',
            null,
            null,
            carRentalObject? carRentalObject: null,
            null,
            null
    );

        // Čuvanje korisnika
        authService.saveUser(newUser);

        return res.status(200).json({ message: 'Uspešno ste se registrovali.', user: newUser });
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

        return res.status(200).json({ token:token, role:user.role });
    },

    logout(req, res) {
        return res.status(200).json({ message: 'Uspešno ste se odjavili.' });
    },

    protected(req, res) {
        authService.verifyToken(req, res)
    },

    getUserProfile(req, res) {
        authService.verifyToken(req, res, 'USER MANAGER ADMIN');
        if (res.statusCode === 401) {
            return;
        }
        const userProfile = authService.getUserBy('username', req.params.username);
        return res.status(200).json({ user :userProfile });

    },

    editProfile(req, res) {
        const id = parseInt(req.params.id);
        const data = req.body;

        const isUpdated = authService.updateProfile(data, id);
        if (isUpdated) {
            return res.status(200).json({message: 'Profil je uspešno ažurirano.'});
        } else {
            return res.status(404).json({error: 'Profil sa datim ID-em nije pronađeno.'});
        }
    },

    getManagers(req, res) {
        authService.verifyToken(req, res, 'ADMIN');
        if (res.statusCode === 401) {
            return;
        }
        let managers = []
            if (req.route.path.includes('free')) {
                managers = authService.getAllManagers('free');
            } else {
                managers = authService.getAllManagers();
            }
        return res.status(200).json({ managers :managers });
    },

};

module.exports = authController;
