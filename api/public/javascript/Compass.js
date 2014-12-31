
var Compass = {};

Compass.previous = '';

Compass.current = '';

Compass.action = {};

Compass.init = function(_w) {
	var width = _w;
	var height = _w;

	var div = document.createElement('div');
	var divStyle = 'position:absolute;top:0px;right:0px;z-index:1;height:{h}px;width:{w}px;';
	divStyle = divStyle.replace(/\{h\}/g, height);
	divStyle = divStyle.replace(/\{w\}/g, width);
	div.setAttribute('style', divStyle);

	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'compass');
	canvas.setAttribute('height', height);
	canvas.setAttribute('width', width);
	div.appendChild(canvas);
}

Compass.drawCompass = function(canvas, angle) {
	var ctx = canvas.getContext('2d');
    var length = (canvas.height<canvas.width)?canvas.height:canvas.width;
    
    var h = length /3;
    var w = h /4;
    ctx.clearRect(0,0,length,length);
    
    ctx.shadowBlur = 10;
    //ctx.shadowColor = 'black';
    ctx.font = w + 'px san-serif';
    
    ctx.translate(length/2, length/2);
    ctx.rotate(Math.PI / 180 * angle);
    
    ctx.strokeText('N', -w/4, -h-w/4);
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