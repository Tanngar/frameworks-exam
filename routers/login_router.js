const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = require('../models/user.model');

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10,function(err, hash){
        if(err){ console.log(err)}

        let newUser = new users({
            username: req.body.username,
            password: hash,
        });

        newUser
            .save()
            .then(answer => res.json(answer));
    })
});

router.post('/login', (req, res) => {
    console.log("API called");
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        let msg = "Username or password missing!";
        res.status(401).json({msg: msg});
        return;
    }

    // console.log("JWT: " + process.env.JWT_SECRET);

    users.findOne( { username: req.body.username }, function(err, user){
        if(err){
            console.log(err);
            res.status(401).json(err);
        } else if(user){
            console.log(user);
            authenticateUser(user);
        } else {
            res.status(401).json({msg: "User not found!"})
        }
    });

    function authenticateUser(user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                console.log(err);
            }
            if (result) {
                let expirationDate = Math.floor(Date.now() / 1000) + 3600;
                const payload = {
                    username: user.username,
                    password: user.password
                };

                const token = jwt.sign({payload, exp: expirationDate}, process.env.JWT_SECRET);
                console.log(token);
                res.json({
                    msg: 'User authenticated successfully',
                    token: token
                });
            }
            else res.status(401).json({msg: "Password mismatch!"})
        });
    }
});

module.exports = router;

