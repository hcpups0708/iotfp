var GSeter = require('../../lib/GSeter');

var data = {};

data.pressure = new GSeter();
data.humidility = new GSeter();
data.temperature = new GSeter();
data.radar = new GSeter(36);
data.movement = new GSeter();

module.exports = data;
