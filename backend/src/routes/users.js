const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const users = require('../data/users');
const bids = require("../data/bids");
router.get('', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
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

router.post('', (req, res) => {
    res
        .status(StatusCodes.CREATED)
        .json(req.body)

});

router.put('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('User update in progress..');
});

router.delete('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('User update in progress..');
});
module.exports = router;


