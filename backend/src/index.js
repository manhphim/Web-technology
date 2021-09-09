const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.use('/auctions', require('./routes/auctions'));

app.use('/bids', require('./routes/bids'));

app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
