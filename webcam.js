window.onload = function() {

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
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

    if (arr.length == 0) {
      arr.push(canvas.toDataURL('image/png'));
    }
    context.strokeStyle = '#ff0000';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    
  });
});

var button = document.getElementById('button');

var snapshot = function() {
  // if (localMediaStream) {
    console.log(canvas.toDataURL('image/png'));
    console.log('button has been clicked.');
  // }
}

button.addEventListener('click', snapshot, false);
}

// navigator.getUserMedia({video: true}, function(stream) {
//   video.src = window.URL.createObjectURL(stream);
//   localMediaStream = stream;
// }, function(error){console.error(error)});
// };




