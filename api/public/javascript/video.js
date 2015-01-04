
var rtcOrigin = 'chalos2.nctucs.net:8081';

var VideoStart = function() {
	var div = document.createElement('div');
	div.setAttribute('style', 'overflow:hidden;display:block;width:100%;height:100%;');

	var video = document.createElement('video');
	video.setAttribute('id', 'video');

	div.appendChild(video);
	document.body.appendChild(div);

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
