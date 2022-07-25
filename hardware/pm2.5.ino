#include <ArduinoJson.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "MQ135.h"
#include "DHT.h"
#include<string.h>
#define DHT11PIN 14
#define DHTType DHT11
#define UTILS_JSON_MAXLENGTH 256
DHT HT(DHT11PIN,DHTType);
float temp,humi;
//const char* ssid = "Ours Wifi";
//const char* password = "13102410az@";
//const char* ssid = "Green house tang 5";
//const char* password = "1234567890";
const char* ssid = "Hage";
const char* password = "123456789";
const char* mqtt_server = "172.20.10.6";
const char *topic = "mytopic";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;
unsigned long timer;
void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

/////////////////////////////*********DSM501A*******//////////////////////////////
const int R0 = 90;
float ratio = 0;
float RS = 0;
int sensorValue = 0;
float volts = 0;
float ppm_co = 0;
float ppm_co2 = 0;
/////////////////////////////*********DSM501A*******//////////////////////////////
#include<string.h>
int pin = 2;//DSM501A input G6
unsigned long duration;
unsigned long starttime;
unsigned long endtime;
unsigned long sampletime_ms = 30000;
unsigned long lowpulseoccupancy = 0;
float concentration = 0;
/////////////////////////////***********************//////////////////////////////
void dht11(){
   humi = HT.readHumidity();
   temp = HT.readTemperature();
   Serial.print("Độ ẩm:");
   Serial.print(humi,0);
   Serial.print("%");
   Serial.print(" Nhiệt độ:");
   Serial.print(temp);
   Serial.println("*C");
  }

void mq135(){
  sensorValue = analogRead(32);
   // convert to voltage:
   volts = sensorValue * 3.3;
   volts = volts / 4095;
   RS = 20*(3.8/volts - 1);
   ratio = RS / R0;
   ppm_co2 = 110.47*pow(ratio, -2.862)/10;
   ppm_co = 605.18*pow(ratio, -3.937)/100;
   Serial.print("PPM CO2:");
   Serial.println(ppm_co2);
   Serial.print("PPM CO:");
   Serial.println(ppm_co);
   Serial.println(volts);
   Serial.println("---------");
}
void dsm501a(){
    duration = pulseIn(pin, LOW);
    lowpulseoccupancy += duration;
//    endtime = millis();
////  if ((endtime-starttime) > sampletime_ms)
////  {
    ratio = (lowpulseoccupancy-endtime+starttime + sampletime_ms)/(sampletime_ms*10.0);  // Integer percentage 0=>100
    concentration = 1.1*pow(ratio,3)-3.8*pow(ratio,2)+520*ratio+0.62; // using spec sheet curve
    Serial.print("lowpulseoccupancy:");
    Serial.print(lowpulseoccupancy);
    Serial.print("    ratio:");
    Serial.print(ratio);
    Serial.print("    DSM501A:");
    Serial.println(concentration);
    lowpulseoccupancy = 0;
//    starttime = millis();
//  }
}

void setup() {                
  Serial.begin(115200);
  delay(10);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  HT.begin();
  starttime = millis(); 
  
}
 
void loop() {
  if ( (unsigned long) (millis() - timer) > 3000){
    
//  dht11();
   humi = HT.readHumidity();
   temp = HT.readTemperature();
   Serial.print("Độ ẩm:");
   Serial.print(humi,0);
   Serial.print("%");
   Serial.print(" Nhiệt độ:");
   Serial.print(temp);
   Serial.println("*C");
//  delay(1000);
  mq135();
//  delay(1000);
  dsm501a();    
//  delay(2000);  
    if (!client.connected()) {
    reconnect();
  }
  client.loop();

  Serial.print("Publish message: ");
//  Serial.println(temp);
//  client.publish(topic, String(temp).c_str());
//  sendMessage();
DynamicJsonDocument doc(1024);

doc["Device"] = "ESP32";
doc["id"] = "62808211ee8fefe86e989d2e";
doc["name"] = "hà nội";
doc["temperature"] = temp;
doc["humidity"] = humi;
doc["co2"] = ppm_co2;
doc["co"] = ppm_co;
doc["pm25"] = concentration;  

  char buffer[256];
//  doc.toCharArray(buffer, 256);
  serializeJson(doc, buffer);
//  client.publish(topic,buffer);
  if (client.publish(topic, buffer)) {
    Serial.println("Publish ok");
  }
  else {
    Serial.println("Publish failed");
  }
timer= millis();
    }
}
