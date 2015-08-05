var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

// configuration
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);
// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// morgan
app.use(morgan('dev'));

// routes
app.get('/', function(req, res) {
    res.send('The API');
});
// setup new user
app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new User({
        name: 'Farrukh',
        password: 'password',
        admin: true
    });

    nick.save(function (err) {
        if (err) throw err;

        console.log('New user added');
        res.json({ success: true });
    });
});


// start server
app.listen(port);
console.log('Server is run at http://localhost:' + port);
