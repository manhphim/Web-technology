const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

const bids = require("../data/bids");
router.get('', (req, res) => {
    res.send(bids);
});

router.get('/:id', (req, res) => {
    res.send(`Bid with id ${req.params.id} in progress...`);
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


