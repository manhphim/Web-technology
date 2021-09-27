const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

let users = require('../data/users');
const bids = require("../data/bids");
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");
const {hash} = require("bcrypt");

router.get('', isLoggedIn, (req, res) => {
    res.send(users);
});

router.get('/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => {
        return user.id == id;
    })

    if (user) {
        res.send(user);
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`User with id ${id} not found`);
    }
});

router.post('', isLoggedIn, isAdmin, (req, res) => {
    const user = req.body;
    const userWithId = {id: users.length + 1, ...user, secret: uuid()};
    users.push(userWithId);
    res
        .status(StatusCodes.CREATED)
        .send('User created!');
});

router.post('/register', async (req, res) => {
    try {

        users.push({
            id: users.length + 1,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            secret: uuid(),
            roles: ['user']
        });
        console.log(users);
        res
            .status(StatusCodes.CREATED)
            .send('User registered!');
    } catch {
        res
            .status(StatusCodes.BAD_REQUEST)
            .send("Please fill in username/password");
    }
})

router.put('/:id', isLoggedIn, isAdmin, (req, res) => {
    const { id } = req.params;
    const userUpdated = req.body;


    if(users[id-1] != null) {
        for (let key in userUpdated) {
            users[id - 1][key] = userUpdated[key];
        }
        res
            .status(StatusCodes.OK)
            .send('User updated');
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`User with id ${id} not found`)
    }
});

router.delete('/:id', isLoggedIn, isAdmin, (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    if (user) {
        users = users.filter((user) => user.id != id);
        res
            .status(StatusCodes.OK)
            .send('User deleted!');
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send(`User with ${id} not found`);
    };
});
module.exports = router;


