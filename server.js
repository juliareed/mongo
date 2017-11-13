// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
// set mongoose to use Promises
mongoose.Promise = Promise;

//Initialisze express
var app = express();

// use morgan and body parser with app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// set up handlebars as engine
var exphbs = require('express-handlebars');
// set up defauly layout, to possibly be changed
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// make public a static directory
app.use(express.static('public'));

// database configuration with mongoose
mongoose.connect('mongodb://localhost/news');
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(error) {
    console.log('Mongoose Error: ', error);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
    console.log('Mongoose connection successful');
});

// routes
require('./routes/html-routes.js')(app, request);
require('./routes/api-routes.js')(app);

app.listen(3000, function() {
    console.log('App running on port 3000');
});