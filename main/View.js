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



        console.log("Done Rendering")
    }

    firstrender() {
        console.log("Rendering...")
        const rythmyc = document.getElementById("rythmyc-view");
        this.model.addsection.draw()
        var addsectionbtn = this.model.addsection.build()
        rythmyc.prepend(addsectionbtn)

        //this.model.addclock.startAnimate();
        console.log("Done Rendering")
    }

    updatesection() {
        var rythmyc = document.getElementById("rythmyc-view")
        var section = this.model.section.build();
        //this.model.addclock.draw();
        var addclkbtn = this.model.addclock.build()

        var addwait = this.model.addwaitrec.draw();

        addclkbtn.onclick = function() {

            section.prepend(addwait);
            startreconding();

            addwait.onclick = function() {
                console.log("ciao")
            }
        }

        //this.model.addwaitrec.startAnimate();
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