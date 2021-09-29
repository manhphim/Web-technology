const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;



const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('combined'));

app.use('/auctions', require('./routes/auctions'));

app.use('/bids', require('./routes/bids'));

app.use('/users', require('./routes/users'));

app.use('/credentials', require('./routes/credentials'));

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
