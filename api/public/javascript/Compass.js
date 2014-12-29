
var Compass = {};

Compass.previous = '';

Compass.current = '';

Compass.init = function(_w) {
	var width = _w;
	var height = _w;

	var div = document.createElement('div');
	var divStyle = 'position:absolute;top:0px;right:0px;z-index:1;height:{h}px;width:{w}px;';
	divStyle = divStyle.replace(/\{h\}/g, height);
	divStyle = divStyle.replace(/\{w\}/g, width);
	div.setAttribute('style', divStyle);


}

Compass.drawBase