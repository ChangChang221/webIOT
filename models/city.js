//Require Mongoose
var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  name: {
    type: String
  },
  temperature: {
    type: String
  },
  humidity: {
    type: String
  }
}, {
  collection: 'city'
});
var city = mongoose.model('city', citySchema );
module.exports = city;