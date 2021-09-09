const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const auctions = require('../data/auctions');

router.get('', (req, res) => {
    res.send(auctions);
});

router.get('/:id', (req, res) => {
    res.send(`Auction with id ${req.params.id} in progress...`);
});

router.post('', (req, res) => {
    res
        .status(StatusCodes.CREATED)
        .send('Auctions creation in progress..');
});

module.exports = router;


