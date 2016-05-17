var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db.mongodb);

var UrlMapping = mongoose.model('UrlMappingModel',{
  shortUrl: String,
  raw: String,
});

var app = express();

app.get('/api/urlMapping/:short_url', function (req, res) {
  UrlMapping.findOne({'shortUrl': req.params.short_url}, 'shortUrl raw',function(err, urlmapping){
    if (err) {
      res.send(err);
    }
    console.log(req.url);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(urlmapping);
    res.redirect(urlmapping.raw);
  });
});

// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


