
var rtcOrigin = 'chalos2.nctucs.net:8081';

var VideoStart = function() {
	var video = document.createElement('video');
	video.setAttribute('id', 'video');
	document.body.appendChild(video);

	startRtc();
}

var startRtc = function() {
	rtc.connect('ws://'+rtcOrigin, 'iotfp');

	rtc.on('add remote stream', function(stream, socketId){
		rtc.attachStream(stream, 'video');
	});

	rtc.on('disconnect stream', function(data) {
		// do nothing
	});

}

$('document').ready(VideoStart);
