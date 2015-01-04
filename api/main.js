var apiServer = require('./app');
var rtcServer = require('./rtcServer');

apiServer.listen(8080);
rtcServer.listen(8081);