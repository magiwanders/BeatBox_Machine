var rad = 20

class WaitRec {

    constructor(id = 'waitrec1', rad = 40) {

        this.id = id
        this.rad = rad;
    }

    // BUILD functions

    build() {

    }

    draw() {
        var waitreccontainer = document.createElement('div')
        waitreccontainer.setAttribute("id", "waitrec")

        var waitreccanvas = document.createElement('canvas')
        waitreccanvas.setAttribute("id", "waitreccanvas")
        var waitrecctx = waitreccanvas.getContext('2d');

        waitrecctx.beginPath();
        waitrecctx.arc(150, 70, this.rad, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();

        waitrecctx.beginPath();
        waitrecctx.arc(150, 70, this.rad - 20, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();

        waitreccontainer.appendChild(waitreccanvas)
        return waitreccontainer
    }
}



///BAD ANIMATION SOLUTION
/*function startAnimate() {

    requestAnimationFrame(startAnimate);
    waitreccanvas = document.getElementById("waitreccanvas")
    var waitrecctx = waitreccanvas.getContext('2d');

    waitrecctx.clearRect(0, 0, waitreccanvas.width, waitreccanvas.height);
    waitrecctx.beginPath();
    if (rad < 60) {
        rad += 0.9;
    } else {
        rad = 20;
    }
    waitrecctx.arc(150, 70, rad, 0, 2 * Math.PI);
    waitrecctx.lineWidth = 5;
    waitrecctx.strokeStyle = "red"
    waitrecctx.stroke();

    waitrecctx.beginPath();
    waitrecctx.arc(150, 70, rad - 20, 0, 2 * Math.PI);
    waitrecctx.lineWidth = 5;
    waitrecctx.strokeStyle = "red"
    waitrecctx.stroke();
}*/