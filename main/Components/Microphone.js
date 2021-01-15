/*ALL THE FUNCTIONALITY FOR THE
MICROPHONE AND AUDIO BUFFER*/

//AUDIO CONTEXT//
audioctx = new AudioContext()


//CANVAS FOR RECORDING DRAWING//
canvas_rec = document.getElementById("current-scope")
fullrec_canvas = document.getElementById("full-rec")
ctx = canvas_rec.getContext("2d")
fullrec_ctx = fullrec_canvas.getContext("2d")


///AUDIO NODES///
a = audioctx.createAnalyser();
g = audioctx.createGain();

///BUTTON DEFITIONS///
//let startbutton = document.getElementById("rec");
//let stopbutton = document.getElementById("stop");
let resumebutton = document.getElementById("resume-ctx");
let playbackbutton = document.getElementById("play");

//BUTTONS FUNCTION CONNECTION///
//startbutton.onclick = startreconding;
//stopbutton.onclick = stoprecording;
resumebutton.onclick = function() { audioctx.resume() }
playbackbutton.onclick = PlayBack;

//mute the audio from the microphone//
g.gain.value = 0;

let sampleRate = audioctx.sampleRate;

let bufferLen = 4096;

a.fftSize = bufferLen;

let duration = 5; //seconds to record -> dinamically

let AudioData = new Float32Array(sampleRate * duration) //-> dinamically

let AudioIndex = 0; //index to scroll data

let data_draw = new Uint8Array(bufferLen);

let data_draw_full = new Uint8Array(sampleRate * duration);

var ms; //media source

var mss; //media stream source


///DATA TO POST

data_to_post = {
    "AudioData": AudioData,
    "BPM": document.getElementById("bpm-value").textContent
}

///SCRIPT PROCESSOR///
sp = audioctx.createScriptProcessor(bufferLen, 1, 1)

sp.onaudioprocess = function(e) {
    inputBuffer = e.inputBuffer;
    outputBuffer = e.outputBuffer;

    inputData = inputBuffer.getChannelData(0);
    outputData = outputBuffer.getChannelData(0);

    //copy the input to the output
    for (var i = 0; i < inputData.length; i++) {
        outputData[i] = inputData[i];
    }
    ///store the input
    RecordAudio(inputData);
}

///ROUTING///
sp.connect(g);
g.connect(audioctx.destination);


///RECORD FUNCTION///
function RecordAudio(data_rec) {
    for (var i = 0; i < data_rec.length; i++) {
        if (AudioIndex < AudioData.length) {
            AudioData[AudioIndex++] = data_rec[i];
        }
    }
}

///PLAYBACK FUNCTION///
function PlayBack() {
    b = audioctx.createBuffer(1, AudioData.length, sampleRate)
    d = b.getChannelData(0);

    for (var i = 0; i < AudioData.length; i++) {
        d[i] = AudioData[i]
    }

    bs = audioctx.createBufferSource();
    bs.buffer = b;
    bs.connect(audioctx.destination);

    bs.start();
    //return bs
}

///STREAMING MICROPHONE SIGNAL///
async function MicrophoneConnect() {
    ms = await navigator.mediaDevices.getUserMedia({ audio: true })
    mss = audioctx.createMediaStreamSource(ms);
    //Routing
    mss.connect(sp);
    mss.connect(a);
}
MicrophoneConnect();

///DRAWING THE FRAME ANALYZER
function drawAnalyzer() {
    requestAnimationFrame(drawAnalyzer);
    ctx.clearRect(0, 0, canvas_rec.width, canvas_rec.height)
    a.getByteTimeDomainData(data_draw);
    //a.getByteFrequencyData(data);
    ctx.beginPath();
    for (var i = 0; i < data_draw.length; i++) {
        ctx.lineTo(i, data_draw[i] - 50)
    }
    ctx.stroke()
}
drawAnalyzer();

///DRAWING THE FULL RECORDING WHEN STOP IS PRESSED
function draw_fullrec() {
    var canvasHeight = fullrec_canvas.height
    var canvasWidth = fullrec_canvas.width
    fullrec_ctx.save();
    fullrec_ctx.fillStyle = "grey";
    fullrec_ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    fullrec_ctx.strokeStyle = 'black';
    fullrec_ctx.translate(0, canvasHeight / 2);
    //fullrec_ctx.globalAlpha = 0.5; // lineOpacity ;
    for (var i = 0; i < AudioData.length; i++) {
        var x = Math.floor(canvasWidth * i / AudioData.length);
        var y = AudioData[i] * canvasHeight / 2;
        fullrec_ctx.beginPath();
        fullrec_ctx.moveTo(x, 0);
        fullrec_ctx.lineTo(x + 1, y);
        fullrec_ctx.stroke();
    }
    fullrec_ctx.restore();
}

//START YOUR RECORDING//
function startreconding() {

    AudioData = new Float32Array(sampleRate * duration)
    start_timer();
    AudioIndex = 0;
}

//STOP THE RECORDING AND SEND DATA//
async function stoprecording() {
    stop_timer();
    draw_fullrec();
    data_to_post.AudioData = AudioData
    data_to_post.BPM = document.getElementById("bpm-value").textContent
    console.log(data_to_post)
    return await post_to_server(data_to_post);
    //get_from_server();
}

//DISCARD THE CURRENT RECORDING
function discardrecording() {
    stop_timer();
    AudioData = new Float32Array(sampleRate * duration)
}