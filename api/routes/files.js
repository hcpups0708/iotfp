
var express = require('express');
var router = express.Router();

var path = require('path');

router.get('/webrtc.io.js', function(req, res) {
	res.sendfile(path.resolve(__dirname + '/../../webrtc/site/webrtc.io.js'));
});

module.exports = router;