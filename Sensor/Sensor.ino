// include all Libraries needed:
#include <Process.h>
#include <Wire.h>
#include "dht.h"
#include "I2Cdev.h"
#include "BMP085.h"
#include "HMC5883L.h"
#include <Servo.h>
#define OUTPUT_READABLE_ACCELGYRO

#define echoPin1 5 // Echo Pin
#define trigPin1 6 // Trigger Pin
#define echoPin2 7 // Echo Pin
#define trigPin2 8 // Trigger Pin

// set up net client info:
const unsigned long postingInterval = 50;  //delay between updates to myProcess.com
unsigned long lastRequest = 0;      // when you last made a request
String dataString = "";

dht DHT;

//Pressure
BMP085 barometer;
int32_t lastMicros;

//Servo
Servo myservo;  // create servo object to control a servo
int pos = 90;
int dir = 10;

//Ultra sonic
long duration1, distance1; // Duration used to calculate distance
long duration2, distance2; // Duration used to calculate distance

//Meg
HMC5883L mag;
int16_t mx, my, mz;

void setup() {
  // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif
  
  // start serial port:
  Bridge.begin();
  Serial.begin(9600);
  
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(90);  
  
  //while(!Serial);    // wait for Network Serial to open
  Serial.println("Initializing I2C devices...");
  barometer.initialize();
  mag.initialize();

  // verify connection
  Serial.println("Testing device connections...");
  Serial.println(barometer.testConnection() ? "BMP085 connection successful" : "BMP085 connection failed");
  Serial.println(mag.testConnection() ? "HMC5883L connection successful" : "HMC5883L connection failed");
  
  Serial.println("Client Start");

  // Do a first update immediately
  updateData();
  sendData();
  lastRequest = millis();
}

void loop() {
  // get a timestamp so you can calculate reading and sending intervals:
  long now = millis();

  // if the sending interval has passed since your
  // last connection, then connect again and send data:
  if (now - lastRequest >= postingInterval) {
    updateData();
    sendData();
    lastRequest = now;
  }
}

void updateData() {
  
  if(pos==170||pos==0)
    dir=-dir;
  myservo.write(pos);
  pos+=dir;  
  
  //Temperature and Humidity
  DHT.read11(10);
  
  //Pressure
  // request temperature
  barometer.setControl(BMP085_MODE_TEMPERATURE);
  // wait appropriate time for conversion (4.5ms delay)
  lastMicros = micros();
  while (micros() - lastMicros < barometer.getMeasureDelayMicroseconds());
  // read calibrated temperature value in degrees Celsius
  barometer.getTemperatureC();
  // request pressure (3x oversampling mode, high detail, 23.5ms delay)
  barometer.setControl(BMP085_MODE_PRESSURE_3);
  while (micros() - lastMicros < barometer.getMeasureDelayMicroseconds());
  // read calibrated pressure value in Pascals (Pa)
  float pressure = barometer.getPressure();
  
  //distance 1
  digitalWrite(trigPin1, LOW); 
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10); 
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  distance1 = duration1/58.2;
  
  //distance 2
  digitalWrite(trigPin1, LOW); 
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10); 
  digitalWrite(trigPin1, LOW);
  duration2 = pulseIn(echoPin1, HIGH);
  distance2 = duration2/58.2;
  
  //heading
  mag.getHeading(&mx, &my, &mz);
  float heading = atan2(my, mx);
  if(heading < 0)
    heading += 2 * M_PI;
  heading *= 180/M_PI;
  
  // convert the readings to a String to send it:
  dataString = "t=";
  dataString += DHT.temperature;
  dataString += "&h=";
  dataString += DHT.humidity;
  dataString += "&p=";
  dataString += pressure;
  dataString += "&r=";
  dataString += pos/10;
  dataString += "&d1=";
  dataString += distance1;
  dataString += "&d2=";
  dataString += distance2;
  dataString += "&c=";
  dataString += heading;
}

// this method makes a HTTP connection to the server:
void sendData() {

  // form the string for the URL parameter:
  String url = "http://chalos2.nctucs.net:8080/update?";

  // Send the HTTP PUT request

  // Is better to declare the Process here, so when the
  // sendData function finishes the resources are immediately
  // released. Declaring it global works too, BTW.
  Process myProcess;
  Serial.print("\n\nSending data... \n");
  myProcess.begin("curl");
  myProcess.addParameter("--request");
  myProcess.addParameter("POST");
  myProcess.addParameter(url+dataString);
  myProcess.run();
  Serial.println(dataString);

  // If there's incoming data from the net connection,
  // send it out the Serial:
  while (myProcess.available()>0) {
    char c = myProcess.read();
    Serial.write(c);
  }

}
