const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const bids = require("../data/bids");
const auctions = require("../data/auctions");
router.get('', (req, res) => {
    res.send(bids);
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

router.post('', (req, res) => {
    const bid = req.body;
    bids.push(bid);
    res.send("Bid created successfully")

});

router.put('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Bid update in progress..');
});

router.delete('', (req, res) => {
    res
        .status(StatusCodes.OK)
        .send('Bid update in progress..');
});
module.exports = router;


