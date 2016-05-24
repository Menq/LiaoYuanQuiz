var express = require('express');
var router = express.Router();
var utils = require('../bin/utils');
var config = require('../config');

var mongoose = require('mongoose');
var UrlMapping = require('../Model/UrlMapping');

router.get('/:short_url', function (req, res) {
  UrlMapping.findOne({'shortUrl': req.params.short_url}, 'shortUrl raw',function(err, urlmapping){
    if (err) {
      res.send(err);
    }
    if (urlmapping) {
      var url;
      if(!urlmapping.raw.startsWith('http')){
        url = 'http://' + urlmapping.raw;
      }else{
        url = urlmapping.raw;
      }
      res.redirect(301, url);
    }else{
      res.redirect('/404');
    }
  });
});

router.post('/', function(req, res, next) {
  var raw = req.body.raw;
  UrlMapping.findOne({'raw': raw}, function(err, model){
    if (err) {
      return next(err);
    }else if(model){
      res.json(formUrl(model, req));
    }else{
      UrlMapping.count({}, function(err, count){
        var shortUrl = utils.generateShortUrl(count + 1);
        if (!shortUrl) {
          res.json({"error": "generate url fail"});
        }else{
          UrlMapping.create({'shortUrl': shortUrl, 'raw': raw}, function(err,model){
            if (err) { return next(err) }
              res.json(formUrl(model, req));
          });
        }
      });
    }
  });
});

function formUrl(model, req) {
  if (config.port == 80) {
     model.shortUrl = req.hostname + '/map/' + model.shortUrl;
  }else{
     model.shortUrl = req.hostname +':' + config.port + '/map/' + model.shortUrl;
  }
  return model;
}

module.exports = router;
