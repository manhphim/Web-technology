const { StatusCodes } = require('http-status-codes');
const users = require('../data/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    console.log('Authenticating...');
    const token = getTokenFromRequest(req);

    if (token) {
        const payload = verifyToken(token);
        if (payload) {
            req.user = payload;
            return next();
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send('Something is wrong with your credentials.');
}

const getTokenFromRequest = (req) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        return authHeader.split(' ')[1];
    }

    return false;
}

const verifyToken = (token) => {
    try {
        const tokenPayload = jwt.decode(token);
        console.log('User payload', tokenPayload);
        if (tokenPayload) {
            const user = users.find(user => user.username === tokenPayload.username);
            return jwt.verify(token, user.secret);
        }
    } catch (e) {
        return false;
    }
}
module.exports = isLoggedIn;
