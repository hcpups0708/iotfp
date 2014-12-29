
var dataBlock = {};

dataBlock.init = function(_w) {
	var height = 100;
	var width = _w;

	var div = document.createElement('div');
	var divStyle = 'position:absolute;bottom:0px;left:0px;z-index:1;height:{h}px;width:{w}px;';
	divStyle = divStyle.replace(/\{h\}/g, height);
	divStyle = divStyle.replace(/\{w\}/g, width);
	div.setAttribute('style', divStyle);

	var base = document.createElement('canvas');
	base.setAttribute('id', 'dBase');
	base.setAttribute('height', height);
	base.setAttribute('width', width);
	base.setAttribute('style', 'z-index:2;position:absolute;opacity:0.7;margin:0px;');

	var data = document.createElement('canvas');
	data.setAttribute('id', 'dData');
	data.setAttribute('height', height);
	data.setAttribute('width', width);
	data.setAttribute('style', 'z-index:2;position:absolute;margin:0px;');

	div.appendChild(base);
	div.appendChild(data);

	return div;
}

dataBlock.drawBase = function() {
	var canvas = document.getElementById('dBase');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = 'black';
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fill();

	var word = ['Humidility', 'Temperature', 'Pressure'];
	var color = ['blue', 'red', 'green'];

	var width = canvas.width/word.length;
	var height = canvas.height;
	var margin = canvas.height/5;

	var font = height/5;

	ctx.font = font + 'px sans-serif';
	for(var i=0; i<word.length; i++) {
		ctx.fillStyle = color[i];
		ctx.fillText(word[i], width*i+margin, margin);
	}
}

dataBlock.renderData = function(canvas, myData) {
	//var canvas = document.getElementById('dataRender');
	var ctx = canvas.getContext('2d');

	ctx.clearRect(0 ,0 , canvas.width, canvas.height);
	var color = ['blue', 'red', 'green'];

	var width = canvas.width/myData.length;
	var height = canvas.height;
	var margin = canvas.height/5;
	var font = height/5*3;

	ctx.font = font + 'px sans-serif';

	ctx.shadowColor = "white";
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3;
	ctx.shadowBlur = 3;

	for(var i=0; i<myData.length; i++) {
		ctx.fillStyle = color[i];
		ctx.fillText(myData[i], width*i+margin, height - margin);
	}
}
