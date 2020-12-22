class AddButton {

    constructor(id = 'addbutton', rad = 20) {
        this.id = id
        this.rad = rad
    }

    // BUILD functions

    //addsection  -- addsectioncanvas
    //addclkbutton -- addclockcanvas

    build(buttonid, canvasid) {

        var addcontainer = document.createElement('div')
        addcontainer.setAttribute("id", buttonid)

        var addcanvas = document.createElement('canvas')
        addcanvas.setAttribute("id", canvasid)

        var addctx = addcanvas.getContext('2d');

        addctx.beginPath();
        addctx.arc(150, 50, this.rad, 0, 2 * Math.PI);
        addctx.lineWidth = 5;
        addctx.stroke();
        addctx.beginPath();
        addctx.lineTo(150, 35)
        addctx.lineTo(150, 65)
        addctx.lineWidth = 5;
        addctx.stroke();
        addctx.beginPath();
        addctx.lineTo(135, 50)
        addctx.lineTo(165, 50)
        addctx.lineWidth = 5;
        addctx.stroke();
        addcontainer.appendChild(addcanvas);

        return addcontainer
    }

}