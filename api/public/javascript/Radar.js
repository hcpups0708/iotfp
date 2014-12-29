
var Radar = {};

Radar.drawBase = function() {
	var canvas = document.getElementById('rBase');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#000';
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fill();

	var radius = [150, 120, 90, 60, 30];
	ctx.lineWidth = 2;
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

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'white';
    data.forEach(function(v,i) {
		var x = canvas.width/2;
		var y = canvas.height/2;
		var r = v * (canvas.height/2)/150; r = (r > 150) 150:r;
		var iInit = (36 - 2 * i  - 1) * 10 * Math.PI / 180;
		var iFinal = (36 - 2 * i + 1) * 10 * Math.PI / 180;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.arc(x,y,r,iInit,iFinal);
		ctx.closePath();
		ctx.fill();
    });
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
	R.setAttribute('style', 'z-index:2;position:absolute;opacity:1;');

	var R2 = document.createElement('canvas');
	R2.setAttribute('id', 'rData');
	R2.setAttribute('height', rSize);
	R2.setAttribute('width', rSize);
	R2.setAttribute('style', 'z-index:3;position:absolute;opacity:0.8;');

	radar.appendChild(R);
	radar.appendChild(R2);
	return radar;
}
