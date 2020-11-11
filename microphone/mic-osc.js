
var canvasCtx = document.getElementById('canvas').getContext('2d');
var bufferSize = 4096;
var audioContext;

try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
} catch (e) {
    alert('Web Audio API is not supported in this browser');
}

// Check if there is microphone input.
try {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||     navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var hasMicrophoneInput = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
} catch (e) {
    alert("getUserMedia() is not supported in your browser");
}

// Create analyser node.
var analyser = audioContext.createAnalyser();

analyser.fftsize = 512;
analyser.smoothingTimeConstant = 0.9;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

var errorCallback = function (e) {
    alert("Error in getUserMedia: " + e);
};

// Get access to the microphone and start pumping data through the  graph.
navigator.getUserMedia({
    audio: true
}, function (stream) {
    // microphone -&gt; myPCMProcessingNode -&gt; destination.
    var microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.connect(audioContext.destination);
    //microphone.start(0);
}, errorCallback);

// draw an oscilloscope of the current audio source

function draw() {

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    var WIDTH = 500;
    var HEIGHT = 256;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < dataArray.length; i++) {
      barHeight = HEIGHT - dataArray[i];
      canvasCtx.fillRect(i * 2, barHeight, 1, dataArray[i]);
      // It is a bad idea to update an element in this loop:
      // However, if you do, the following line always gives 0, which seems like a bug.
      document.getElementById("arrayIndex").innerHTML = dataArray[i];
      // This line works though.
      document.getElementById("arrayIndex").innerHTML = dataArray[50];
    }
};

draw();