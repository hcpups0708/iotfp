
var direct = 's';
var preDirect = 's';

var main = function() {
	
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

document.onreadystatechange = main;

var update = function(data){
	console.log(data);
	var UL = document.createElement('ul');
	var H = document.createElement('li');
	H.innerText = data.h;
	var T = document.createElement('li');
	T.innerText = data.t;
	var P = document.createElement('li');
	P.innerText = data.p;
	var R = document.createElement('li');
	R.innerText = data.r.join('\n');

	UL.setAttribute('id', 'MAIN');
	UL.appendChild(H);
	UL.appendChild(T);
	UL.appendChild(P);
	UL.appendChild(R);

	var old = document.getElementById('MAIN');
	if(old) {
		document.body.replaceChild(UL, old);
	} else {
		document.body.appendChild(UL);
	}
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
