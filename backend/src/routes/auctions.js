const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const auctions = require('../data/auctions');
const isLoggedIn = require('../middleware/is-logged-in');

router.get('', (req, res) => {
    const filters = req.query;

    if (Object.keys(filters).length === 0) {
        res.send(auctions);
    } else {
        const filteredAuctions = auctions.filter(auction => {
            let isValid = true;
            for (let key in filters) {
                isValid = isValid && auction[key] === filters[key];
            }
            return isValid;
        });
        res.send(filteredAuctions);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const auction = auctions.find((auction) => {
        return auction.id == id;
    })

    if (auction) {
        res.send(auction);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`Auction with id ${id} not found`);
    }
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
