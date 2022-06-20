"use strict";

var mqtt = require('mqtt');

var bodyParser = require("body-parser");

var express = require('express');

var app = express();
var port = 5000;

var cors = require('cors');

var city = require('./models/city');

var cityController = require('./controller/cityController'); //Import the mongoose module


var mongoose = require('mongoose'); //Set up default mongoose connection


var mongoDB = "mongodb+srv://trangnt:trangtute@cluster0.zdvmv.mongodb.net/esp32?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Successfully connect to MongoDB.");
}); //Get the default connection

var db = mongoose.connection; //Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:')); // city.find({})
// .then(data => {
//     console.log("du lieu",data )
// })
// .catch(err => {
//     console.log('err',err);
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
var options = {
  host: '68c31a99590a4e37b25ad1b5789d04df.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'trangbg20@gmail.com',
  password: 'Trang2000'
}; //initialize the MQTT client

var client = mqtt.connect(options); //setup the callbacks

client.on('connect', function () {
  console.log('Connected mqtt');
});
client.on('error', function (error) {
  console.log(error);
}); //Called each time a message is received

client.on('message', function (topic, message) {
  try {
    //    console.log('Received message:', message.toString());
    //    console.log(typeof message.toString())
    var dataMessage = JSON.parse(message);
    cityController.updateMQTT(dataMessage);
  } catch (e) {
    console.log("error");
  }
});
client.on('close', function () {
  console.log("disconnected mqtt");
}); // subscribe to topic 'my/test/topic'

client.subscribe('mytopic'); // publish message 'Hello' to topic 'my/test/topic'

var dataPush = {
  id: "62808211ee8fefe86e989d2e",
  name: "Hà Nội",
  humidity: "200%",
  temperature: "20'C",
  co: "26",
  co2: "26",
  pm25: "25",
  pm10: "28"
};
client.publish('mytopic', JSON.stringify(dataPush)); //create a server object:

app.get('/', function (req, res) {
  city.find(function (err, city) {
    if (err) {
      console.log(err);
    } else {
      res.json(city);
    }
  });
});
app.get("/send", function (req, res) {
  client.publish('mytopic', dataPush); // console.log("req.body.message");

  res.send({
    message: dataPush
  });
});
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});