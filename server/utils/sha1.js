const crypto = require('crypto');
function jiami(text) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(text);
    return sha1.digest('hex');
}
module.exports = jiami;