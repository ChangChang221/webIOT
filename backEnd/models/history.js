//Require Mongoose

var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
  name: {
    type: String
  },
  pm25: {
    type: String
  },
  date: {
    type: Date
  }
}, {
  collection: 'history'
});
var history = mongoose.model('history', historySchema );
module.exports = history;