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

router.get('/c', function(req, res, next) {
	res.send({result:data.compass.get()});
});

router.get('/r/:index', function(req, res, next) {
	var index = req.params.index;
	if(index === 'all') res.send({result:data.radar.get()});
	else res.send({result:data.radar.get(Number(index))});
});

router.get('/move', function(req, res, next) {
	var result = data.movement.get() || 's';
	//console.log(result);
	res.send(result);
});

router.get('/getAll', function(req, res, next) {
	res.send({
		h: data.humidility.get(),
		t: data.temperature.get(),
		p: data.pressure.get(),
		c: data.compass.get(),
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
	var index = Math.floor(Number(req.params.index)/2);
	var value = req.params.value;
	if(value !== 0) data.radar.set(index, Number(value));
	res.end();
});

router.post('/c/:value', function(req, res, next) {
	var value = req.params.value;
	data.compass.set(Number(value));
	res.end();
});

router.post('/move/:direct', function(req, res, next) {
	var direct = req.params.direct;
	//console.log(direct);
	data.movement.set(direct);
	res.end();
});

router.post('/update', function(req, res, next) {
	var params = req.query;
	data.temperature.set(Number(params.t));
	data.humidility.set(Number(params.h));
	data.pressure.set(Number(params.p));
	data.compass.set(Number(params.c));

	var index = Math.floor(Number(params.r)/2);
	if(Number(params.d1) !== 0) data.radar.set(index, Number(params.d1));
	if(Number(params.d2) !== 0) data.radar.set(index+9, Number(params.d2));
	res.end();
});

router.post('/setDirectGetAll/:direct', function(req, res, next) {
	var direct = req.params.direct;
	console.log(direct);
	data.movement.set(direct);
	res.send({
		h: data.humidility.get(),
		t: data.temperature.get(),
		p: data.pressure.get(),
		c: data.compass.get(),
		r: data.radar.get()
	});
});

module.exports = router;