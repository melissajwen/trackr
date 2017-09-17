

window.onload = function() {
  var button = document.getElementById('btn-download');
  


var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  });

var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
var localMediaStream = null;
var arr = [];


tracker.setInitialScale(6);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
tracking.track('#video', tracker, { camera: true });



tracker.on('track', function(event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  event.data.forEach(function(rect) {


    context.drawImage(video, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
    var img = canvas.toDataURL("image/png");



    context.strokeStyle = '#ff0000';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);


  });



});



var takeSnapshot = function(canvas) {
    console.log('SNAP??');
    // console.log(canvas.toDataURL('image/png'));
    // console.log('button has been clicked.');
    Webcam.snap( function(data_uri) {
      postUri(data_uri);
    });

  };
};




// button.addEventListener('click', snapshot, false);
// }

// navigator.getUserMedia({video: true}, function(stream) {
//   video.src = window.URL.createObjectURL(stream);
//   localMediaStream = stream;
// }, function(error){console.error(error)});
// };




