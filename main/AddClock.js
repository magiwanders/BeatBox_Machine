var mouse = {

    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', mousecall);

function mousecall(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

class AddClock {

    constructor(id = 'addclock1', rad = 20) {
        this.id = id
        this.rad = rad
    }

    // BUILD functions

    build() {
        var addclkcontainer = document.createElement('div')
        addclkcontainer.setAttribute("id", "addclkbutton")

        var addclkcanvas = document.createElement('canvas')
        addclkcanvas.setAttribute("id", "addclockcanvas")

        var addclkctx = addclkcanvas.getContext('2d');

        addclkctx.beginPath();
        addclkctx.arc(150, 50, this.rad, 0, 2 * Math.PI);
        addclkctx.lineWidth = 5;
        addclkctx.stroke();
        addclkctx.beginPath();
        addclkctx.lineTo(150, 30)
        addclkctx.lineTo(150, 70)
        addclkctx.lineWidth = 5;
        addclkctx.stroke();
        addclkctx.beginPath();
        addclkctx.lineTo(130, 50)
        addclkctx.lineTo(170, 50)
        addclkctx.lineWidth = 5;
        addclkctx.stroke();
        addclkcontainer.appendChild(addclkcanvas)
        return addclkcontainer
    }

}