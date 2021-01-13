class Section {

    constructor(id) {
        this.id = id
        this._nOfClocksPerSection = 3
        this._clocks = []
        this._addbutton = new AddButton()
        this._addwaitrec = new WaitRec()
    }

    removeClock(clockindex) {
        this._clocks.splice(clockindex, 1)
    }

    addClock(clock) {
        if (this._clocks.length < this._nOfClocksPerSection) this._clocks.push(clock)
    }

    // BUILD functions

    build() {
        var section = document.createElement("div")
        section.setAttribute("id", "section")

        // Offset by id*310
        var offset = this.id * 315
        section.style.left = offset + 'px'

        // Put _clocks
        for (var i = 0; i < this._clocks.length; i++) {
            section.append(this._clocks[i].build())
        }

        // Put add clock button
        if (this._clocks.length < this._nOfClocksPerSection) {
            const addclkbtn = this._addbutton.build("addsection", "addsectioncanvas")

            var addwait = this._addwaitrec.build();

            function func_gen(addwaitrec, id, nClock) {
                return function(event) {

                    // Save ghetto coordinate of the clock to be built
                    const sectionIndex = document.getElementById("sectionIndex")
                    const clockIndex = document.getElementById("clockIndex")
                    sectionIndex.innerHTML = id
                    clockIndex.innerHTML = nClock

                    if (document.getElementById("waitrec")) {
                        document.getElementById("waitrec").remove();
                    }

                    if (!document.getElementById("waitrec")) {
                        discardrecording()
                        section.prepend(addwait);
                        addwaitrec.stopAnimation()
                        addwaitrec.startAnimation();
                        startreconding();
                    }

                    addwait.onclick = function() {
                        console.log("ciao")
                    }
                }
            }

            addclkbtn.onclick = func_gen(this._addwaitrec, this.id, this._clocks.length);
            console.log('About to prepend')
            section.prepend(addclkbtn)
        }

        return section
    }

}