var http = require('http');

var query = '/update';
var r = 0;

function send() {
	r = (r+1)%18;
	var t = 20 + (Math.random()*2);
	var p = 1000 + (Math.random()*100);
	var h = 20 + (Math.random()*2);
	var d1= 10 + (Math.random()*30);
	var d2= 10 + (Math.random()*30);
	var myquery = query + '?t=' + t.toString() + '&p=' + p.toString() + '&h=' + h.toString() + '&r=' + r.toString() + '&d1=' + d1.toString() + '&d2=' + d2.toString();
	console.log(myquery);
	var req = http.request({hostname: 'localhost', port: 8080, method:'POST', path: myquery}, function(res){
		console.log(res.statusCode);
	});
}

setInterval(send, 1000);
