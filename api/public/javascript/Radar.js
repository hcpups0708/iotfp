
var Radar = {};

Radar.drawBase = function() {
	var canvas = document.getElementById('rBase');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#000';
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fill();

	var radius = [150, 120, 90, 60, 30];
	radius.forEach(function(value, index) {
		var _value = value * (canvas.height/2)/150;
		ctx.beginPath();
		ctx.strokeStyle = 'green';
		ctx.arc(canvas.width/2, canvas.height/2, _value, 0, 2 * Math.PI);
		ctx.stroke();
	});

	var blockwidth = 20;
	ctx.rect((canvas.width-blockwidth)/2, 5, blockwidth, canvas.height/2);
	ctx.fill();

	radius.forEach(function(value, index) {
		if(index == 0) return;
		var _value = value * (canvas.height/2)/150;
		ctx.strokeText(value.toString(), (canvas.width-blockwidth)/2, canvas.height/2-_value);
	});
}

Radar.renderData = function(canvas, data) {
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0 ,0 , canvas.width, canvas.height);

    var array = data.map(function(v, i){
    	var _v = v * (canvas.height/2)/150;
    	if(_v < 15) _v = 15;
		return [
			Math.cos(i*10*Math.PI / 180) * _v + canvas.width/2,
			Math.sin(i*10*Math.PI / 180) * _v + canvas.height/2
		];
	}).reduce(function(pre, curr) {
		return pre.concat(curr);
	});

	array.length = data.length * 2;
	ctx.strokeStyle = '#66CCFF';
	ctx.lineWidth = 3;
	ctx.beginPath();
    ctx.moveTo(array[0], array[1]);
    for(var i=2; i< array.length-1; i+=2) {
    	if((array[i-2] !== canvas.width/2 || array[i+1-2] !== canvas.height/2) && (array[i] !== canvas.width/2 || array[i+1] !== canvas.height/2)) {
    		ctx.lineTo(array[i], array[i+1]);
    	} else {
        	ctx.moveTo(array[i], array[i+1]);
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'red';
    for(var i=0; i<array.length; i+=2) {
        ctx.fillRect(array[i]-2.5, array[i+1]-2.5, 5, 5);
    }
}

Radar.init = function(_w) {
	var rSize = _w;

	var radar = document.createElement('div');
	var radarStyle = 'position:absolute;bottom:0px;right:0px;z-index:1;height:{size}px;width:{size}px;';
	radar.setAttribute('style', radarStyle.replace(/\{size\}/gi, rSize));
	
	var R = document.createElement('canvas');
	R.setAttribute('id', 'rBase');
	R.setAttribute('height', rSize);
	R.setAttribute('width', rSize);
	R.setAttribute('style', 'z-index:2;position:absolute;opacity:0.7;');

	var R2 = document.createElement('canvas');
	R2.setAttribute('id', 'rData');
	R2.setAttribute('height', rSize);
	R2.setAttribute('width', rSize);
	R2.setAttribute('style', 'z-index:3;position:absolute;');

	radar.appendChild(R);
	radar.appendChild(R2);
	return radar;
}
