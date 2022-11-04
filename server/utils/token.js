const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

const secret = 'lile';

function getToken(payload, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn })
}

function verifyToken() {
    return expressjwt({ secret: secret, algorithms: ['HS256'] })
}


module.exports = { getToken, verifyToken };