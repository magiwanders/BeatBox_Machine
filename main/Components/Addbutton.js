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

        var img = document.createElement("img")

        img.src = "Components/add.png"

        img.id = "addbuttonimg"

        addcontainer.appendChild(img)

        return addcontainer
    }

}