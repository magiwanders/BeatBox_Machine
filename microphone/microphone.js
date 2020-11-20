audioctx = new AudioContext()
canvas = document.getElementById("current-scope")
fullrec_canvas = document.getElementById("full-rec")

ctx = canvas.getContext("2d")
fullrec_ctx = fullrec_canvas.getContext("2d")

a = audioctx.createAnalyser();
g = audioctx.createGain();

g.gain.value = 0;

let sampleRate = audioctx.sampleRate;

let bufferLen = 4096;

a.fftSize = bufferLen;

let duration = 10; //seconds to record -> dinamically

let AudioData = new Float32Array(sampleRate * duration) //-> dinamically

let DataToSend = new Float32Array(sampleRate * duration)

let AudioIndex = 0; //index to scroll data

let data_draw = new Uint8Array(bufferLen);

let data_draw_full = new Uint8Array(sampleRate * duration);

var ms;

var mss;

var offset = 0;

///SCRIPT PROCESSOR///
sp = audioctx.createScriptProcessor(bufferLen, 1, 1)

sp.onaudioprocess = function (e) {
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
            //console.log('Copio')
            AudioData[AudioIndex++] = data_rec[i];

        }
    }
}

///PLAYBACK FUNCTION///
function PlayBack(data_play) {
    b = audioctx.createBuffer(1, data_play.length, sampleRate)
    d = b.getChannelData(0);

    for (var i = 0; i < data_play.length; i++) {
        d[i] = data_play[i]
    }

    bs = audioctx.createBufferSource();
    bs.buffer = b;
    bs.connect(audioctx.destination);

    return bs
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

function drawAnalyzer() {
    requestAnimationFrame(drawAnalyzer);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    a.getByteTimeDomainData(data_draw);
    //a.getByteFrequencyData(data);
    ctx.beginPath();
    for (var i = 0; i < data_draw.length; i++) {
        ctx.lineTo(i, data_draw[i])
    }
    if (data_draw.length * offset + 2432 < data_draw_full.length) {
        data_draw_full.set(data_draw, data_draw.length * offset)
    }
    ctx.stroke()
    offset++;
}

drawAnalyzer();

function draw_fullrec(audiobuf) {
    var canvasHeight =  fullrec_canvas.height
    var canvasWidth =  fullrec_canvas.width
    var lineOpacity = canvasWidth / audiobuf.length  ;      
    fullrec_ctx.save();
    fullrec_ctx.fillStyle = '#f5f5dc';
    fullrec_ctx.fillRect(0,0,canvasWidth,canvasHeight );
    fullrec_ctx.strokeStyle = 'black';
    fullrec_ctx.translate(0,canvasHeight / 2);
    fullrec_ctx.globalAlpha = 0.5; // lineOpacity ;
    for (var i=0; i<  audiobuf.length; i++) {
        // on which line do we get ?
        var x = Math.floor ( canvasWidth * i / audiobuf.length ) ;
        var y = audiobuf[i] * canvasHeight / 2 ;
        fullrec_ctx.beginPath();
        fullrec_ctx.moveTo( x  , 0 );
        fullrec_ctx.lineTo( x+1, y );
        fullrec_ctx.stroke();
    }
    fullrec_ctx.restore();
 }


function startreconding() {

    AudioData = new Float32Array(sampleRate * duration)
    start_timer();
    AudioIndex = 0;
    offset = 0;

}


function stoprecording() {

    stop_timer();
    draw_fullrec(AudioData);
    DataToSend.set(AudioData)
    //post_to_server(DataToSend);


}



//setInterval(drawAnalyzer,100)


let startbutton = document.getElementById("start-rec");
let stopbutton = document.getElementById("stop-rec");
let resumebutton = document.getElementById("resume");
//console.log(data);
startbutton.onclick = startreconding;
stopbutton.onclick = stoprecording;
resumebutton.onclick = function () { audioctx.resume() }

//document.querySelector("button").onclick = function(){c.resume()}

