
var direct = 's';
var preDirect = 's';
var doc = {};

var main = function() {
	/*var H = document.createElement('div')
	H.setAttribute('id', 'H');
	var T = document.createElement('div')
	T.setAttribute('id', 'T');
	var P = document.createElement('div')
	P.setAttribute('id', 'P');
	*/
	var radar = Radar.init();
	var data = dataBlock.init();

	//document.body.appendChild(H);
	//document.body.appendChild(T);
	//document.body.appendChild(P);
	document.body.appendChild(radar);
	Radar.drawBase();

	document.body.appendChild(data);
	dataBlock.drawBase();

	doc.H = document.getElementById('H');
	doc.T = document.getElementById('T');
	doc.P = document.getElementById('P');
	doc.R2 = document.getElementById('rData');
	doc.D2 = document.getElementById('dData');

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
