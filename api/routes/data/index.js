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
	var increase = (initial >= 0)? true : false;
	var size = data1.length || data2.length;
	initial = Math.abs(initial);

	for(var i=0; i<size; i++) {
		var indexToChange = (increase)? i+initial: i-initial;
		if(indexToChange <= 0 || indexToChange >=8 ) increase = !increase;

		console.log(indexToChange);
		//console.log(increase);

		data.radar.set(indexToChange, Number(data1[i]));
		data.radar.set(indexToChange+9, Number(data2[i]));
	}
}

module.exports = data;
