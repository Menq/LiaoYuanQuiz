var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/', function(req, res){
  res.render('index', {title : config.indexView.title});
});

router.get('/404', function(req, res){
  res.render('error');
});

module.exports = router;
