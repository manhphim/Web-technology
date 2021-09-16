const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const users = require('../data/users');
router.get('', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    res.send(`User with id ${req.params.id} in progress...`);
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


