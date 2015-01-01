var videos = [];
var PeerConnection = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection;


function removeVideo(socketId) {
  var video = document.getElementById('remote' + socketId);
  if(video) {
    videos.splice(videos.indexOf(video), 1);
    video.parentNode.removeChild(video);
  }
}

function init() {
  var room = 'asusRoom';
  var role = window.location.hash.slice(1,2);

  if(PeerConnection) {
    if(role=="1") {

      var vid;

      if (typeof MediaStreamTrack === 'undefined'){
        alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
      } else {
        MediaStreamTrack.getSources(function (sourceInfos) {
          for (var i = 0; i != sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            if(sourceInfo.facing=='environment') {
              vid = sourceInfo.id;
            }
          }
        });
      }

      rtc.createStream({
        video: {
          optional: [{sourceId: 'fb88723cfd887ca247d8b1fe73bc696a4239fb4b3b75f5c55d861d0fc5c7b2ca'}]
        },
        "audio": true
      }, function (stream) {
        document.getElementById('video').src = URL.createObjectURL(stream);
      });
    }
  } else {
    alert('Your browser is not supported or you have to turn on flags. In chrome you go to chrome://flags and turn on Enable PeerConnection remember to restart chrome');
  }

  rtc.connect("ws:" + window.location.href.substring(window.location.protocol.length).split('#')[0].slice(0, -1) + ':8080/', room);

  rtc.on('add remote stream', function(stream, socketId) {
    if(role=="2") {
      console.log("ADDING REMOTE STREAM...");
      document.getElementById('video').src=URL.createObjectURL(stream);
      //videos.push(document.getElementById('video'));
    }
  });
  rtc.on('disconnect stream', function(data) {
    console.log('remove ' + data);
    removeVideo(data);
  });
}
