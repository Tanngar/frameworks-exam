const express = require('express');
const app = express();
const PORT = (process.env.PORT || 8080);

require('dotenv').config();
console.log(require('dotenv').config());

const mongoose = require('mongoose');
const checkJwt = require('express-jwt');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
app.use('/', express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    if ('OPTIONS' === req.method) {
        console.log("Allowing OPTIONS");
        res.send(200);
    }
    else {
        next();
    }
});

// Open paths that does not need login
let openPaths = [
    '/'
];
// Validate the user using authentication
app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path : openPaths})
);
app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

/*** Database ***/
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', function() {
    console.log("MongoDB connected")
});

/*** API ***/
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});

const jobs = require('./models/job.model');
app.get('/', (req, res) => {
    jobs.find()
        .then(jobs => res.json(jobs))
});

app.post('/add-job', (req, res) => {
    let newJob = new jobs({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        area: req.body.area
    });
    console.log(newJob);

    newJob
        .save()
        .then(answer => res.json(answer));
});

/****** Routes ******/
const users = require('./models/user.model');
let usersRouter = require('./routers/login_router')(users.find());
app.use('/users', usersRouter);



// /*** Error handling ***/
// app.use(function (err, req, res, next) {
//     res.status(500).send({msg: 'Something broke! ' + err})
// });