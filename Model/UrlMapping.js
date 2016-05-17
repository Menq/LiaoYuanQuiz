var mongoose = require('mongoose');

var UrlMapping = mongoose.Schema({
  shortUrl: String,
  raw: String
});

module.exports = mongoose.model('UrlMappingModel', UrlMapping);
