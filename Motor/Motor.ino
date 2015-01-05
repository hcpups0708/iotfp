/* 
 Pulse width Horn position 
 0.8 ms Safety zone for CW 
 0.9 ms +60 degrees ± 10° CW 
 1.5 ms 0 degree(center position) 
 2.1 ms -60 degree ± 10° CCW 
 2.2 ms Safety zone for CCW
*/

// include all Libraries needed:
#include <Process.h>
#include <Servo.h>

Servo leftServo;  // create servo object to control a servo
Servo rightServo;  // create servo object to control a servo

int potpin = 0;  // analog pin used to connect the potentiometer
int val;    // variable to read the value from the analog pin

void setup()
{
  // start serial port:
  Bridge.begin();
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  leftServo.attach(3);
  rightServo.attach(4);
  
  //while(!Serial);
  Serial.println("Client Start");
}

void loop() 
{ 
  Process myProcess;
  String url = "http://chalos2.nctucs.net:8080/move";
  char c;
  Serial.print("\nGetting data... \n"+url+"\n");
  myProcess.begin("curl");
  //myProcess.addParameter("--request");
  //myProcess.addParameter("POST");
  myProcess.addParameter(url);
  myProcess.run();
  //Serial.write(myProcess.read());
  
  while (myProcess.available()>0) {
    char c = myProcess.read();
    Serial.write(c);
    myProcess.flush();
    if(c=='f'){    
      leftServo.writeMicroseconds(1000);
      rightServo.writeMicroseconds(2000);
    }
    if(c=='b'){    
      leftServo.writeMicroseconds(2000);
      rightServo.writeMicroseconds(1000);
    }
    if(c=='r'){    
      leftServo.writeMicroseconds(1900);
      rightServo.writeMicroseconds(1900);
    }
    if(c=='l'){    
      leftServo.writeMicroseconds(1100);
      rightServo.writeMicroseconds(1100);
    }
    if(c=='s'){    
      leftServo.writeMicroseconds(1500);
      rightServo.writeMicroseconds(1500);
    }
    delay(200);
  }  
} 

