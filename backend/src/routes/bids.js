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
    res
        .status(StatusCodes.CREATED)
        .send('Bids creation in progress..');
});

module.exports = router;


