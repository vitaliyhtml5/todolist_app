const fs = require('fs');
const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const getToken = (req, res) => {
    const login = 'login';
    const password = 'password';

    try {
        if (req.body.login === '' || req.body.password === '') {
            res.status(400).send({code: 400, message: 'Can\'t be blank'});
        } else if (req.body.login !== login || req.body.password !== password) {
            res.status(401).send({code: 401, message: 'Wrong credentials'});
        } else if (req.body.login === login || req.body.password === password) {
            const token = crypto.randomBytes(20).toString('hex');
            res.cookie('token', token, {
                maxAge: 3600 * 3600 * 24,
                secure: false,
            });

            fs.writeFile('./fs/session.json', JSON.stringify([{token}]), (err) => {
                if (err) res.send(err);
            });

            res.status(201).send({code: 201, message:'access is allowed'});
        }
    } catch (e) {
        res.status(500).send('something went wrong');
    }
}

module.exports = getToken;