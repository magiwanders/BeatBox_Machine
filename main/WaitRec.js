class WaitRec {

    constructor(id = 'waitrec1', rad = 40) {

        this.id = id
        this.rad = rad
    }

    // BUILD functions

    build() {
        waitrecdef();

    }

    update() {
        if (this.rad < 60) {
            this.rad += 0.9;
        } else {
            this.rad = 20;
        }
        this.draw();
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
        //this.animate();
        waitreccontainer.appendChild(waitreccanvas)
        return waitreccontainer
    }

    startAnimate() {

        requestAnimationFrame(this.startAnimate.bind(this));
        waitrecctx.clearRect(0, 0, waitreccanvas.width, waitreccanvas.height);
        this.update();
    }
}