var mongoose = require('mongoose');

var KeysSchema = new mongoose.Schema({
  index: Number,
  keys: [String]
});

module.exports = mongoose.model('Keys', KeysSchema);
