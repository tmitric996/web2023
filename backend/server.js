const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

const USERS_FILE = 'data/users.json';

function getUsers() {
    const usersData = fs.readFileSync(USERS_FILE);
    return JSON.parse(usersData);
}

function saveUsers(users) {
    const data = JSON.stringify(users);
    fs.writeFileSync(USERS_FILE, data);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
