const { StatusCodes } = require('http-status-codes');

const isAdmin = (req, res, next) => {
    if (req.user.roles.includes('admin')) {
        return next();
    }

    res.status(StatusCodes.UNAUTHORIZED).send('You need to be an admin to do this!');
}

module.exports = isAdmin;