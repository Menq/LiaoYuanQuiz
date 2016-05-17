var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/', function(req, res){
  res.render('index', {title : config.indexView.title});
});

module.exports = router;
