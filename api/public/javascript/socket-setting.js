
var radarSize = 300;
var dataSize = window.innerWidth - radarSize;
var compassSize = 200;

var direct = 's';
var preDirect = 's';
var doc = {};

var main = function() {
	var radar = Radar.init(radarSize);
	var data = dataBlock.init(dataSize);
	var compass = Compass.init(compassSize);

	document.body.appendChild(radar);
	Radar.drawBase();

	document.body.appendChild(data);
	dataBlock.drawBase();

	document.body.appendChild(compass);
	Compass.drawBase();

	doc.H = document.getElementById('H');
	doc.T = document.getElementById('T');
	doc.P = document.getElementById('P');
	doc.R2 = document.getElementById('rData');
	doc.D2 = document.getElementById('dData');
	doc.C2 = document.getElementById('cData');

	document.onkeydown = function(e) {
	    preDirect = direct;
	    switch(e.keyCode) {
	        case 37:
	            direct = 'l';
	            break;
	        case 38:
	            direct = 'f';
	            break;
	        case 39:
	            direct = 'r';
	            break;
	        case 40:
	            direct = 'b';
	            break;
	        default:
	            direct = 's';
	    }
	    if(preDirect !== direct) {
	    	updateDirection();
	    }
	}
	
	document.onkeyup = function(e) {
		direct = preDirect = 's';
		updateDirection();
	}

	setInterval(queryData, 1000);
}; 

var update = function(data) {
	dataBlock.renderData(doc.D2, [data.h, data.t, data.p]);
	Radar.renderData(doc.R2, data.r);
	Compass.rotateTo(doc.C2, data.c, 300);
}

var queryData = function() {
	$.ajax({
		url: '/getAll',
		type: 'GET'
	}).done(function(data) {
		update(data);
	});
}

var updateDirection = function() {
	$.ajax({
		url: '/move/' + direct,
		type: 'POST'
	});
}

$(document).ready(main);
