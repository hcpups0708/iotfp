var socket = io.connect('http://localhost:3030');

var update = function(data){
	console.log(data);
	var newP = document.createElement('p');
	var t = document.createTextNode(JSON.stringify(data));
	document.body.appendChild(newP.appendChild(t));
}

socket.on('update', update);
