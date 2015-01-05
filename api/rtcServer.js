var path = require('path');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);

server.listen(8081);

app.use(express.static(__dirname + '/public/javascript'));

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/public/phone.html');
});

webRTC.on('connect', function() {
	console.log('connected');
});

webRTC.on('disconnect', function() {
	console.log('disconnected');
});

module.exports = server;