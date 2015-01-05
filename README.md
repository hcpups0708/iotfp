iotfp
=====

To start the servers:
```sh
$ cd api && npm install
```

Start an API server:
```sh
$ node app.js
```

Start WebRTC signaling server:
```sh
$ node rtcServer.js
```

1. Connect all the sensors to each Arduino YUN acording to the Sensor.ino and Motor.ino code.
2. Make sure YUNs are connected to Internet. (We used 3G network on phone during demo)
3. Compile and Upload Sensor.ino and Motor.ino to each Arduino Yun.
4. pen your computer's browser connect to service port 8080.
5. Put phone with Internet connection on the remote car, with phone's browser opened and connect to service port 8081.
6. Voila, computer's browser now showing video. Control the car with keyboard. :-)
