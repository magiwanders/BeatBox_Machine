class WaitRec {

    constructor(id = 'waitrec1', rad = 10, anim = null) {

        this.id = id
        this.rad = rad;
        this.anim = anim

        this.initrad = rad


    }



    // BUILD functions

    build() {
        var waitreccontainer = document.createElement('div')
        waitreccontainer.setAttribute("id", "waitrec")

        var waitreccanvas = document.createElement('canvas')
        waitreccanvas.setAttribute("id", "waitreccanvas")
        waitreccanvas.style.left = 120 + 'px'
        var waitrecctx = waitreccanvas.getContext('2d');

        waitrecctx.beginPath();
        waitrecctx.arc(150, 30, this.rad, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.fill();
        waitrecctx.fillStyle = "red";
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();

        /*
        waitrecctx.beginPath();
        waitrecctx.arc(150, 70, this.rad - 20, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();
        */

        waitreccontainer.appendChild(waitreccanvas)
        return waitreccontainer

    }

    draw() {
        var waitreccanvas = document.getElementById("waitreccanvas")
        var waitrecctx = waitreccanvas.getContext('2d');

        waitrecctx.beginPath();
        waitrecctx.arc(150, 30, this.rad, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.fill();
        waitrecctx.fillStyle = "red";
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();

        /*
        waitrecctx.beginPath();
        waitrecctx.arc(150, 70, this.rad - 20, 0, 2 * Math.PI);
        waitrecctx.lineWidth = 5;
        waitrecctx.strokeStyle = "red"
        waitrecctx.stroke();
        */

    }

    update() {

        if (this.rad < 20) {
            this.rad += 0.3
        } else {
            this.rad = 10
        }

        this.draw();
    }

    startAnimation() {
        if (document.getElementById("waitrec")) {
            this.anim = requestAnimationFrame(this.startAnimation.bind(this));
            var waitreccanvas = document.getElementById("waitreccanvas")
            var waitrecctx = waitreccanvas.getContext('2d');
            waitrecctx.clearRect(0, 0, waitreccanvas.width, waitreccanvas.height);
            this.update();
        }
    }

    stopAnimation() {
        cancelAnimationFrame(this.anim)
    }


}
