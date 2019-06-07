const express = require('express');
const app = express();
const PORT = (process.env.PORT || 8080);


require('dotenv').config();
console.log(require('dotenv').config());

const mongoose = require('mongoose');
const eJwt = require('express-jwt');
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

app.post('/api/get-filters', (req, res) => {
    jobs.find()
        .then(jobs => res.json(jobs))
});

app.post('/api/get-jobs', (req, res) => {
    if(req.body.filters != undefined && req.body.filters.length === 1) {
        jobs.find({
            $or:[
                { category: { $in: req.body.filters }}, { area: { $in: req.body.filters }}
            ]})
            .then(data => res.json(data))
    } else if(req.body.filters != undefined && req.body.filters.length > 1) {
        jobs.find({
            $and:[
                { category: { $in: req.body.filters }}, { area: { $in: req.body.filters }}
            ]})
            .then(function(data){
                if( data.length === 0) {
                    jobs.find({
                        $or:[
                            { category: { $in: req.body.filters }}, { area: { $in: req.body.filters }}
                        ]})
                        .then(data => res.json(data))
                } else {
                res.json(data)
                }
            })
    } else {
        jobs.find()
            .then(jobs => res.json(jobs))
    }
});


app.get('/api/add-job', eJwt({secret: process.env.JWT_SECRET}), (req, res) => {
    res.send('Access granted');
});

app.post('/api/add-job', (req, res) => {
    let newJob = new jobs({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        area: req.body.area
    });

    newJob
        .save()
        .then(res.json({ message: "Post added succesfully"}));
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

/****** Routes ******/
let loginRouter = require('./routers/login_router');
app.use('/api/users', loginRouter);


app.use((err, req, res, next) => {
    console.log("Error status: " + err.status);
    if (err.status == 401) {
        res.redirect('/');
    }
});
