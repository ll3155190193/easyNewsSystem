const jwt = require('jsonwebtoken');
const miyao = 'lile';
function getToken(payload, expiresIn) {
    return jwt.sign(payload, miyao, { expiresIn })
}
module.exports = getToken;