var addseccontainer = document.createElement('div')
addseccontainer.setAttribute("id", "addsection")

var addseccanvas = document.createElement('canvas')

var addsecctx = addseccanvas.getContext('2d');

class AddSection {

    constructor(id = 'addsection1', rad = 20) {
        this.id = id
        this.rad = rad
    }

    // BUILD functions

    build() {
        addseccontainer.appendChild(addseccanvas)
        return addseccontainer
    }

    draw() {
        addsecctx.beginPath();
        addsecctx.arc(150, 50, this.rad, 0, 2 * Math.PI);
        addsecctx.lineWidth = 5;
        addsecctx.stroke();
        addsecctx.beginPath();
        addsecctx.lineTo(150, 30)
        addsecctx.lineTo(150, 70)
        addsecctx.lineWidth = 5;
        addsecctx.stroke();
        addsecctx.beginPath();
        addsecctx.lineTo(130, 50)
        addsecctx.lineTo(170, 50)
        addsecctx.lineWidth = 5;
        addsecctx.stroke();
    }

    update() {
        this.draw();
    }

    startAnimate() {
        requestAnimationFrame(this.startAnimate.bind(this));
        addsecctx.clearRect(0, 0, addseccanvas.width, addseccanvas.height);
        this.update();
    }

}