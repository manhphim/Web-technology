const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const auctions = require('../data/auctions');
const isLoggedIn = require('../middleware/is-logged-in');


router.get('', (req, res) => {
    res.send(auctions);
});

router.get('/:id', (req, res) => {
    res.send(`Auction with id ${req.params.id} in progress...`);
});

router.post('', isLoggedIn, (req, res) => {
    res
        .status(StatusCodes.CREATED)
        .send(req.body);
});

router.put('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Auction update in progress..');
});

router.delete('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Auction update in progress..');
});
module.exports = router;
