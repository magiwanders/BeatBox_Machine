/*TIMER DISPLAY IN THE MAIN PAGE*/

var seconds = 0
var millsec = 0
var mytimer;

var timerseconds;
var timermillsec;

function start_timer() {
    timerseconds = setInterval(get_seconds, 1000)
    timermillsec = setInterval(get_millseconds, 50)
}

function stop_timer() {
    clearInterval(timerseconds)
    clearInterval(timermillsec)

    seconds = 0
    millsec = 0
    document.getElementById("millsec").textContent = millsec + "ms";
}

function get_millseconds() {

    millsec += 50;
    if (millsec == 1000) {
        millsec = 0
    }

    document.getElementById("millsec").textContent = seconds + "." + millsec + "ms";
}

function get_seconds() {
    seconds++
}