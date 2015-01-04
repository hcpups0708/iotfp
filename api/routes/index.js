var path = require('path');
var express = require('express');

var router = express.Router();
var data = require('./data');

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

router.post('/move/:direct', function(req, res, next) {
	var direct = req.params.direct;
	//console.log(direct);
	data.movement.set(direct);
	res.end();
});

router.post('/update?', function(req, res, next) {
	var params = req.body;
	console.log(params);
	data.temperature.set(Number(params.t));
	data.humidility.set(Number(params.h));
	data.pressure.set(Number(params.p));
	data.compass.set(Number(params.c));

	var index = Math.floor(Number(params.r)/2);
	//if(Number(params.d1) !== 0) data.radar.set(index, Number(params.d1));
	//if(Number(params.d2) !== 0) data.radar.set(index+9, Number(params.d2));
	data.updateRadar(index, params.d1, params.d2);
	res.end();
});

module.exports = router;