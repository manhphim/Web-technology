const {v4:uuidv4} = require('uuid');

const users = [
    {
        id: 1,
        username : 'melissa',
        password : '$2a$10$VJmh3WivEnKC/En9.KiPXOJqPxEu4QqWvJ0/e4XjQMWMHqyImsUUK', //password1
        secret: uuidv4()
    },
    {
        id: 2,
        username : 'minh',
        password : '$2a$10$ra7jhyFvIVatKVdejrd3cuxSbxnt/l1jZRc172e7zgpYix.Sg9Y3e', //password2
        secret: uuidv4()
    },
    {
        id: 3,
        username : 'username3',
        password : '$2a$10$ApSBEW3BINRo.aSI3R5/0uOLj7eTF1oO3Vn2FWTNt//38zi/N83xW', //password3
        secret: uuidv4()
    }
]

module.exports = users;