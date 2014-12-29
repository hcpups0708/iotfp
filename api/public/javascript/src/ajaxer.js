var $ = require('jquery');

var queryData = {
	url: '/getAll',
	type: 'GET'
};

module.exports.queryData = function(callback) {
	$.ajax({
		url: queryData.url,
		type: queryData.type
	}).done(function(data) {
		if(typeof callback == 'function') callback.call(this, data);
	});
}

var updateDirection = {
	url: '/move/',
	type: 'POST'
}

module.exports.updateDirection = function(direct, callback) {
	$.ajax({
		url: updateDirection.url + direct,
		type: updateDirection.type
	}).done(function(data){
		if(typeof callback == 'function') callback.call(this, data);
	});
}
