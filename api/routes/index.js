var path = require('path');
var express = require('express');
var router = express.Router();

var data = require('./data');

var ref = {
	p: 'pressure', h: 'humidility', t: 'temperature'
};

router.get('/p', function(req, res, next) {
	res.send({result:data.pressure.get()});
});

router.get('/h', function(req, res, next) {
	res.send({result:data.humidility.get()});
});

router.get('/t', function(req, res, next) {
	res.send({result:data.temperature.get()});
});

router.get('/r/:index', function(req, res, next) {
	var index = req.params.index;
	if(index === 'all') res.send({result:data.radar.get()});
	else res.send({result:data.radar.get(Number(index))});
});

router.post('/p/:value', function(req, res, next) {
	var value = req.params.value;
	data.pressure.set(Number(value));
	res.end();
});

router.post('/h/:value', function(req, res, next) {
	var value = req.params.value;
	data.humidility.set(Number(value));
	res.end();
});

router.post('/t/:value', function(req, res, next) {
	var value = req.params.value;
	data.temperature.set(Number(value));
	res.end();
});

router.post('/r/:index/:value', function(req, res, next) {
	var index = req.params.index;
	var value = req.params.value;
	console.log(index);
	console.log(value)
	data.radar.set(Number(index), Number(value));
	res.end();
});

module.exports = router;