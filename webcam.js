var t = false;


window.onload = function() {
  // getWebcam();
}



// intializes webcam with face recoginition
function getWebcam() {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      
      var tracker = new tracking.ObjectTracker('face');
      
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track('#video', tracker, { camera: true });
      tracker.on('track', function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var t = true;

      event.data.forEach(function(rect) {
        console.log(t);

        // canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
        // var img = canvas.toDataURL("image/png");
        // var image = new Image();
        // image.src = img;
        // console.log(img);



        //   image.onload = function() {
        //   console.log(img);
        //   ctx.drawImage(image, 110, 90);
        //   var foo = Canvas2Image.saveAsPNG(canvas);
        // };


        t = true;

        

          

          // ctx.strokeStyle = '#a64ceb';
          // ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // ctx.font = '11px Helvetica';
          // ctx.fillStyle = "#fff";
          // ctx.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          // ctx.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
}



navigator.getUserMedia({video: true}, 
    function(stream) {
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var button = document.getElementById("b");
      var ctx = canvas.getContext("2d");
      video.src = stream;

      var tracker = new tracking.ObjectTracker('face');

      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track('#video', tracker, { camera: true });
      tracker.on('track', function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      event.data.forEach(function(rect) {

        canvas.getContext("2d").drawImage(video, 0, 0);
        var img = canvas.toDataURL("image/png");
        var image = new Image();
        image.src = img;

        image.onload = function() {
          ctx.drawImage(image, 110, 90);
          var foo = Canvas2Image.saveAsPNG(canvas);
        };
          

        ctx.strokeStyle = '#a64ceb';
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        ctx.font = '11px Helvetica';
        ctx.fillStyle = "#fff";
        ctx.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        ctx.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      
      });
    });


  }, function(err) { alert("there was an error " + err)}

    );