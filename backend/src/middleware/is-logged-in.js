const { StatusCodes } = require('http-status-codes');
const users = require('../data/users');
const bcrypt = require('bcrypt');

const isLoggedIn = (req, res, next) => {
    console.log('Authenticating...');
    const authData = getDataFromRequest(req);

    if (authData) {
        const [username, password] = authData;
        const user = users.find((user) => {
            return user.username === username;
        });

        if (user) {
            const result = bcrypt.compareSync(password, user.password);

            if (result) {
                return next();
            }
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send('Something is wrong with your credentials.');
}

const getDataFromRequest = (req) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        return authHeader.split(' ');
    }

    return false;
}

module.exports = isLoggedIn;
