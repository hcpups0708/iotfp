
var Compass = {};

Compass.now = 0;

Compass.init = function(_w) {
	var width = _w;
	var height = _w;

	var div = document.createElement('div');
	var divStyle = 'position:absolute;top:0px;right:0px;z-index:1;height:{h}px;width:{w}px;';
	divStyle = divStyle.replace(/\{h\}/g, height);
	divStyle = divStyle.replace(/\{w\}/g, width);
	div.setAttribute('style', divStyle);

	var base = document.createElement('canvas');
	base.setAttribute('id', 'cBase');
	base.setAttribute('height', height);
	base.setAttribute('width', width);
	base.setAttribute('style', 'z-index:2;position:absolute;opacity:0.5;margin:0px;');
	div.appendChild(base);

	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'cData');
	canvas.setAttribute('height', height);
	canvas.setAttribute('width', width);
	canvas.setAttribute('style', 'z-index:3;position:absolute;;margin:0px;');
	div.appendChild(canvas);

	return div;
}

Compass.drawBase = function() {
	var canvas = document.getElementById('cBase');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = 'white';
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fill();

	var length = (canvas.height<canvas.width)?canvas.height:canvas.width;
	var h = length /3;
	var w = h /4;
	ctx.strokeStyle = 'black';
	ctx.font = w + 'px san-serif';
	ctx.translate(length/2, length/2);
	ctx.strokeText('N', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('NE', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('E', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('SE', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('S', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('SW', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('W', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
	ctx.strokeText('NW', -w/4, -h-w/4);
	ctx.rotate(45 * Math.PI/180);
}

Compass.drawCompass = function(canvas, angle) {
	var ctx = canvas.getContext('2d');
    var length = (canvas.height<canvas.width)?canvas.height:canvas.width;
    
    var h = length /3;
    var w = h /4;
    ctx.clearRect(0,0,length,length);
    
    ctx.shadowBlur = 10;
    
    ctx.translate(length/2, length/2);
    ctx.rotate(Math.PI / 180 * angle);
    
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(-w ,0);
    ctx.lineTo(w ,0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    ctx.shadowOffsetY = -2;
    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.lineTo(-w ,0);
    ctx.lineTo(w ,0);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    
    ctx.rotate(-Math.PI / 180 * angle);
    ctx.translate(-length/2, -length/2);
    ctx.shadowOffsetY = 0;
}

Compass.rotateTo = function(canvas, angle, timeUnit) {
    Compass.now = Compass.now % 360;
    if(Compass.now == angle) return;
    var i = 0;
    var fps = 30;
    var rotation = Math.abs(Compass.now - angle);
    if(rotation < 180) {
        rotation = (Compass.now < angle)? rotation/fps: rotation/-fps;
    } else {
        rotation = rotation % 180;
        rotation = (Compass.now > angle)? rotation/fps: rotation/-fps;
    }
    
	setTimeout((that = function() {
		i++;
		Compass.now += rotation;
		Compass.drawCompass(canvas, Compass.now);
		if(i >= fps) Compass.drawCompass(canvas, angle);
		else setTimeout(that, timeUnit/fps);
	}), timeUnit/fps);
}

