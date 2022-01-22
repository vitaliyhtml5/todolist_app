const getData = require('./get_data.js');

const getAccess = (req, res) => {
    try {
        if (req.headers.cookie) {
            const token = req.headers.cookie.split('=')[1];
            getData.readData(res, './fs/session.json', (data) => {
                if (data[0].token === token) {
                    res.status(200).send({code: 200, message:'access is allowed'});
                } else {
                    res.status(401).send({code: 401, message:'unauthorized'});
                }
            });
        } else {
            res.status(401).send({code: 401, message:'unauthorized'});
        }
    } catch (e) {
        res.status(500).send('something went wrong');
    }
}

module.exports = getAccess;