var ajaxer = require('./ajaxer');

var Direct = {};

Direct.prev = '';
Direct.curr = '';

Direct.registerKeyDown = function(e) {
	Direct.prev = Direct.curr;
	switch(e.keyCode) {
		case 37:
			Direct.curr = 'l';
			break;
		case 38:
			Direct.curr = 'f';
			break;
		case 39:
			Direct.curr = 'r';
			break;
		case 40:
			Direct.curr = 'b';
			break;
		default:
			Direct.curr = 's';
	}
	if(Direct.prev === Direct.curr) {
		ajaxer.updateDirection(Direct.curr);
	}
}

Direct.registerKeyUp = function(e) {
	Direct.prev = Direct.curr = 's';
	ajaxer.updateDirection(Direct.curr);
}

Direct.init = function() {
	document.onkeyup = Direct.registerKeyUp;
	document.onkeydown = Direct.registerKeyDown;
}

module.exports = Direct.init;