const fs = require('fs');

const checkToken = req => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        const sessionToken = JSON.parse(fs.readFileSync('./fs/session.json'))[0].token;
        if (token === sessionToken) return true;
        else return false;
    } else {
        return false;
    }
}

module.exports = checkToken;