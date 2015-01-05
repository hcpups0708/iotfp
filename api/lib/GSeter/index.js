
function GSeter(setting) {
	if(setting && typeof setting === 'number') {
		this.dataValue = [];
		this.dataSize = setting;
		for(var i=0; i< setting; i++) this.dataValue[i] = 0;
	} else {
		this.dataValue = 0;
	}
}

module.exports = GSeter;

// get() or get(index)//get() for get all
GSeter.prototype.get = function() {	
	if(arguments.length == 1 && typeof arguments[0] === 'number') {
		if(arguments[0] < this.dataSize) return this.dataValue[arguments[0]];
		return null;
	} else {
		return this.dataValue;
	}
}

// set(number) or set(key, number)
GSeter.prototype.set = function() {
	if(arguments.length >=2 && typeof arguments[0] === 'number') {
		if(arguments[0] < this.dataSize) this.dataValue[arguments[0]] = arguments[1];
	} else {
		if(arguments[0]) this.dataValue = arguments[0];
	}
}
