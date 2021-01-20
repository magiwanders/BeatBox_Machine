class View {

    // Receives reference form Controller as it has to "read" the Model in order to render it
    // Note that the actual construction of the components is done in the components' class, View just calls them in the right order
    constructor(model) {
        this.model = model
    }

    render() {
        console.log("Rendering...")
            /*
            // Reset the clock container before adding the new rendered clock
            const clockContainer = document.getElementById("clockContainer")
            clockContainer.innerHTML = ""

            // All the building is done inside the Clock class which contains also the building of all these children.
            clockContainer.appendChild(this.model.clock.build())
            */
        document.getElementById("bpm-value").textContent = this.model.bpm.value

        var selected_section = this.model.selectedSection
        if (this.model.selectedSection == 0) {
            selected_section = 4;
        }
        document.getElementById("selector").textContent = selected_section


        const rythmic_view = document.getElementById("rythmyc-view")
        rythmic_view.innerHTML = ''

        for (var i = 0; i < this.model._nOfSections; i++) {
            rythmic_view.append(this.model.sections[i].build())
        }

        console.log("Done Rendering")
    }

    firstrender() {
        console.log("Rendering...")
            // const rythmyc = document.getElementById("rythmyc-view");

        // var addsectionbtn = this.model.addbutton.build("addsection", "addsectioncanvas")
        // rythmyc.prepend(addsectionbtn)

        //this.model.addclock.startAnimate();
        console.log("Done Rendering")

        document.getElementById("bpm-value").textContent = this.model.bpm.value

        this.render()
    }

    updatesection() {

        var rythmyc = document.getElementById("rythmyc-view")
        var section = this.model.section.build();
        //this.model.addclock.draw();
        var addclkbtn = this.model.addbutton.build("addclkbutton", "addclockcanvas")

        //this.model.addwaitrec.draw();
        // var addwait = this.model.addwaitrec.build();
        //
        // function func_gen(addwaitrec) {
        //     return function(event) {
        //
        //         if (document.getElementById("waitrec")) {
        //             document.getElementById("waitrec").remove();
        //         }
        //
        //         if (!document.getElementById("waitrec")) {
        //             discardrecording()
        //             section.prepend(addwait);
        //             addwaitrec.stopAnimation()
        //             addwaitrec.startAnimation();
        //             startreconding();
        //         }
        //
        //         addwait.onclick = function() {
        //             console.log("ciao")
        //         }
        //     }
        // }
        //
        // addclkbtn.onclick = func_gen(this.model.addwaitrec);

        section.prepend(addclkbtn);
        rythmyc.prepend(section);
    }

}


/*if (!document.getElementById("waitrec")) {

            this.model.addwaitrec.draw()
            var addwait = this.model.addwaitrec.build();

            addwait.onclick = function() {
                console.log("ciao")
            }
            section.prepend(addwait);
            this.model.addwaitrec.startAnimate();
            startreconding();
        }
    } */