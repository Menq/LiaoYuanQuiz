var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');
var cookiePatset = require('cookie-parser');
var bodyParser = require('body-parser');
var utils = require('./bin/utils');
var routes = require('./routes/index.js');
var urlMapping = require('./routes/urlMapping.js');

var db = mongoose.connect(config.db.mongodb, function(err){
    utils.generateKeys(config.keysLength);
});

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/map', urlMapping);

// app.use(function(req, res, next) {
//   var err = new Error('not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


