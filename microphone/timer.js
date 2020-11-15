//var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
/*var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();


    seconds = now.seconds;
    minutes = now.minutes;

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

    // If the count down is over, write some text 
}, 1000);*/

//setInterval(get_millseconds, 1)

function start_timer() {
    setInterval(get_seconds, 1000)
}

function stop_timer(){
    clearInterval(1000)

    seconds = 0
}

var seconds = 0
var millsec = 0

function get_millseconds() {
    if (millsec == 1000) {
        millsec = 0
    }

    document.getElementById("millsec").innerHTML = millsec + "ms";
    millsec++
}

function get_seconds() {


    document.getElementById("seconds").innerHTML = seconds + "s";
    seconds++
}
