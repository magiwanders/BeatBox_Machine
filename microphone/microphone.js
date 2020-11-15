c = new AudioContext()
canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")
a = c.createAnalyser()

var data = new Uint8Array(a.frequencyBinCount)

var typed_array = [];

var arr_to_send = [];

stop = false;

p = navigator.mediaDevices.getUserMedia({ audio: true })
var ms
p.then(function (_ms) {
    ms = _ms
    var mss
    mss = c.createMediaStreamSource(ms)
    mss.connect(a)
    mss.connect(c.destination)
    
})

function drawAnalyzer() {
    requestAnimationFrame(drawAnalyzer);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    a.getByteTimeDomainData(data);
    //a.getByteFrequencyData(data);
    ctx.beginPath();
    for (i = 0; i < data.length; i++) {
        ctx.lineTo(i, data[i])
    }
    ctx.stroke()
}

var start;

millsec_to_call = (1024/48000)*1000



function startreconding() {

    typed_array=[];
    start_timer();
    start = setInterval(stock_data, millsec_to_call)
    //extract_data(data);
}

function stoprecording() {
    clearInterval(start)
    stop_timer();
    post_to_server(typed_array)

}


drawAnalyzer();


function stock_data() {
    console.log('ciao')

    for (var i = 0; i < data.length; i++) {
        typed_array.push(data[i])
    }
}


//setInterval(drawAnalyzer,100)


let startbutton = document.getElementById("start-rec");
let stopbutton = document.getElementById("stop-rec");

//console.log(data);
startbutton.onclick = startreconding;
stopbutton.onclick = stoprecording;

//document.querySelector("button").onclick = function(){c.resume()}

