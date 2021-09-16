const { StatusCodes } = require('http-status-codes');

const isLoggedIn = (req, res, next) => {
    console.log('Authenticating...');
    const authData = getDataFromRequest(req);
    console.log('header data', authData);

    if (authData) {
        return next();
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
