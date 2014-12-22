
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
	R.innerText = data.r.toString();

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

var query = function() {
	$.ajax({
		url: '/getAll',
		type: 'GET'
	}).done(function(data) {
		update(data);
	});
}

document.onreadystatechange = function() {
	setInterval(query, 500);
};