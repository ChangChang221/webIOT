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
    host: '97ff5a567fc942d896f17c1f4730142a.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'trangbg20@gmail.com',
    password: 'Trang2000'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

//Called each time a message is received
client.on('message', function (topic, message) {
  try{
    console.log('Received message:', message.toString());
    console.log(typeof message.toString())
    let dataMessage = JSON.parse(message);
    cityController.updateMQTT(dataMessage);
  }catch(e){
    console.log("loi")
  }
})
  

client.on('close', () => {
  console.log(`disconnected`);
});
// subscribe to topic 'my/test/topic'
client.subscribe('mytopic');
// publish message 'Hello' to topic 'my/test/topic'
let dataPush={
  name: "Hà Nội",
  humidity: "2000%",
  temperature: "20'C"
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
app.get("/send", function(req, res) {
  client.publish('mytopic', dataPush);
  console.log("req.body.message");
  res.send({
    message: dataPush});
});
// app.post("/send", function(req, res) {
//   client.publish('mytopic', req.body.message);
//   console.log(req.body.message);
//   res.body=req.body.message;
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

