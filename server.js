const express = require('express');
const app = express();
const PORT = (process.env.PORT || 8080);

require('dotenv').config();
console.log(require('dotenv').config());

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path")
app.use('/', express.static(path.join(__dirname, 'build')));

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
    res.redirect('/')
});


// /*** Error handling ***/
// app.use(function (err, req, res) {
//     res.status(500).send({msg: 'Something broke! ' + err})
// });