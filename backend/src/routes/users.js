const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const users = require('../data/users');
const bids = require("../data/bids");
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");

router.get('', isLoggedIn, (req, res) => {
    res.send(users);
});

router.get('/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => {
        return user.id == id;
    })

    if (user) {
        res.send(user);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`User with id ${id} not found`);
    }
});

router.post('', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.CREATED)
        .json(req.body)

});

router.put('', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('User update in progress..');
});

router.delete('', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('User update in progress..');
});
module.exports = router;


