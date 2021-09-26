const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const auctions = require('../data/auctions');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');

router.get('', isLoggedIn, isAdmin, (req, res) => {
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

router.get('/:id', isLoggedIn, isAdmin, (req, res) => {
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

router.post('', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.CREATED)
        .send(req.body);
});

router.put('', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Auction update in progress..');
});

router.delete('/:id', isLoggedIn, isAdmin, (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Auction update in progress..');
});
module.exports = router;
