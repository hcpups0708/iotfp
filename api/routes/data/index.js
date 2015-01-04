var GSeter = require('../../lib/GSeter');

var radarSize = 18;
var data = {};

data.pressure = new GSeter();
data.humidility = new GSeter();
data.temperature = new GSeter();
data.radar = new GSeter(radarSize);
data.compass = new GSeter();
data.movement = new GSeter();

data.updateRadar = function(initial, data1, data2) {
	console.log(arguments);
	var increase = (initial>=0)? true : false;
	var size = data1.length || data2.length;
	var now = Math.abs(initial);

	for(var i=0; i<size; i++) {
		if(now < 0 || now >=9 ) {
			now = (now<0)?1:7;
			increase = !increase;
		}
		console.log('now:' + now);
		console.log('increase?' + increase);

		data.radar.set(now, Number(data1[i]));
		data.radar.set(now+9, Number(data2[i]));
		now = (increase == true)? now+1: now-1;
	}
}

module.exports = data;
