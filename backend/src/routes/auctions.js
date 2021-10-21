const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

let auctions = require('../data/auctions');
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const users = require("../data/users");
const {uuid} = require("uuidv4");

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

router.post('', isLoggedIn, isAdmin, (req, res) => {
    const auction = req.body;
    const auctionWithId = {id: auctions.length + 1, ...auction};
    auctions.push(auctionWithId);
    res
        .status(StatusCodes.CREATED)
        .send(auction);
});

router.put('/:id', isLoggedIn, isAdmin, (req, res) => {
    const { id } = req.params;
    const auctionUpdated = req.body;


    if(auctions[id-1] != null) {
        for (let key in auctionUpdated) {
            auctions[id-1][key] = auctionUpdated[key];
        }
        res
            .status(StatusCodes.OK)
            .send(auctionUpdated);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`Auction with id ${id} not found!`);
    }

});

router.delete('/:id', isLoggedIn, isAdmin, (req, res) => {
    const { id } = req.params;
    const auction = auctions.find((auction) => auction.id == id);
    if (auction) {
        auctions = auctions.filter((auction) => auction.id != id);
        res
            .status(StatusCodes.OK)
            .send(`auction delete: ${auction}`);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`Auction with id ${id} not found!`);
    }
});
module.exports = router;
