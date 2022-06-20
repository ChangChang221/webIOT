var mqtt = require('mqtt')
var bodyParser = require("body-parser");
const express = require('express')
const app = express()
const port = 5000
const cors= require('cors');
const city = require('./models/city');
const cityController = require('./controller/cityController');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = "mongodb+srv://trangnt:trangtute@cluster0.zdvmv.mongodb.net/esp32?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Successfully connect to MongoDB.");
});

//Get the default connection
var db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
// city.find({})
// .then(data => {
//     console.log("du lieu",data )
// })
// .catch(err => {
//     console.log('err',err);
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var options = {
  host: '68c31a99590a4e37b25ad1b5789d04df.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'trangbg20@gmail.com',
  password: 'Trang2000'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected mqtt');
});

client.on('error', function (error) {
    console.log(error);
});

//Called each time a message is received
client.on('message', function (topic, message) {
  try{
//    console.log('Received message:', message.toString());
//    console.log(typeof message.toString())
    let dataMessage = JSON.parse(message);
    cityController.updateMQTT(dataMessage);
  }catch(e){
    console.log("error")
  }
})

client.on('close', () => {
  console.log(`disconnected mqtt`);
});
// subscribe to topic 'my/test/topic'
client.subscribe('mytopic');
// publish message 'Hello' to topic 'my/test/topic'
let dataPush={
  id: "62808211ee8fefe86e989d2e",
  name: "Hà Nội",
  humidity: "200",
  temperature: "20",
  co:"26",
  co2:"26",
  pm25:"25",
  pm10: "28"
};
client.publish('mytopic', JSON.stringify(dataPush));
//create a server object:

app.get('/', (req, res) => {
  city.find(function(err, city){
    if(err){
        console.log(err);
    }
    else {
        res.json(city);
    }
});
});
app.get('/name', (req, res) => {
  const city_name = req.query.name;
  city.findOne({ name : city_name }, function (err, city) {
    if(err){
      console.log("err");
    }
    else {
      console.log("thành công");
      res.json(city);
    }
  });
});
app.get("/send", function(req, res) {
  client.publish('mytopic', dataPush);
 // console.log("req.body.message");
  res.send({
    message: dataPush});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

