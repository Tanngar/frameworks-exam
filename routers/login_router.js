module.exports = () => {
    let express = require('express');
    let router = express.Router();

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
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            res.status(401).json({msg: msg});
            return;
        }

        // console.log("JWT: " + process.env.JWT_SECRET);


        users.findOne( { username: req.body.username }, function(err, obj){
            if(err){
                console.log(err);
            } else {
                authenticateUser(obj);
            }
        });

        function authenticateUser(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                console.log("Username: " + user.username + " Password: " + user.password);
                if(err){
                    console.log(err);
                }
                if (result) {
                    const payload = {
                        username: user.username,
                        password: user.password
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                    res.json({
                        msg: 'User authenticated successfully',
                        token: token
                    });
                }
                else res.status(401).json({msg: "Password mismatch!"})
            });
        }
    });

    return router;
};