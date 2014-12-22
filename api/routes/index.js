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

router.get('/move', function(req, res, next) {
	res.end(data.movement.get() || 's');
});

router.get('/getAll', function(req, res, next) {
	res.send({
		h: data.humidility.get(),
		t: data.temperature.get(),
		p: data.pressure.get(),
		r: data.radar.get()
	});
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
	data.radar.set(Number(index), Number(value));
	res.end();
});

router.post('/move', function(req, res, next) {
	var direct = req.params.direct;
	data.movement.set(direct);
	res.end();
});

router.post('/update', function(req, res, next) {
	var params = req.query;
	data.temperature.set(Number(params.t));
	data.humidility.set(Number(params.h));
	data.pressure.set(Number(params.p));
	data.radar.set(Number(params.r), Number(params.d1));
	data.radar.set(Number(params.r)+18, Number(params.d2));
	res.end();
});

module.exports = router;