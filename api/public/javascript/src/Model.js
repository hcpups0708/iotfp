var ajaxer = require('./ajaxer');

var Model = {};

Model.data = {};

Model.data.degreeConst = 1.0;

Model.query = function() {
	ajaxer.queryData(function(data) {
		Model.data = data;
	});
}

Model.drawDirection = function() {
	if(Object.prototype.toString.call(Model.data.r) !== '[object Array]' ) return;
	Model.data.r2 = Model.data.r.map(function(value, index) {
		var degree = index * 10;
		var x = Model.data.degreeConst * Math.cos(degree);
		var y = Model.data.degreeConst * Math.sin(degree);
		return [x, y];
	});
}

Model.renderDirection = function() {
	
}
