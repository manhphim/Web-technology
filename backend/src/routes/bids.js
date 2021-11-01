const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const isLoggedIn = require('../middleware/is-logged-in');

let bids = require("../data/bids");
router.get('', (req, res) => {
    const filters = req.query;

    if (Object.keys(filters).length === 0) {
        res.send(bids);
    } else {
        const filteredBids = bids.filter(bid => {
            let isValid = true;
            for (let key in filters) {
                isValid = isValid && bid[key] == filters[key];
            }
            return isValid;
        });
        res.send(filteredBids);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const bid = bids.find((bid) => {
        return bid.id == id;
    })

    if (bid) {
        res.send(bid);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`Bid with id ${id} not found`);
    }
});

router.post('', isLoggedIn, (req, res) => {
    const bid = req.body;
    const bidWithId = {id: bids.length +1, ...bid};
    bids.push(bidWithId);
    res
        .status(StatusCodes.CREATED)
        .send('Bid created!');

});

router.delete('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params;
    const bid = bids.find((bid) => bid.id == id);
    if (bid) {
        bids = bids.filter((bid) => bid.id != id);
        res
            .status(StatusCodes.OK)
            .send('Bid deleted');
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`Bid with id ${id} not found!`);
    }
});

module.exports = router;
