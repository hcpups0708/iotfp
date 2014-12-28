var express = require('express')
var app = express()
var webRTC = require('webrtc.io').listen(8001);

app.use(express.static(__dirname + '/public'));
//app.set('root',"C:/Users/Asus/Documents/交大/4上/物連網/iotfp");

/*app.get('/', function (req, res) {
  res.sendFile('C:/Users/Asus/Documents/交大/4上/物連網/iotfp/public/index.html');
})*/

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
