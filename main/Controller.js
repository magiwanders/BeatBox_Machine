class Controller {

    constructor() {
        this.model = new Model()
        this.view = new View(this.model)

        setTimeout(() => {


            this.view.firstrender() // Initial rendering.

            // Binding of all the buttons with all the respective functions
            // All html retrievals happen here

            /*
            document.getElementById("addLayerBtn").onclick = () => {
                this.model.clock.stop()
                this.model.clock.addLayer()
                this.view.render()
            }

            document.getElementById("renderEqN").onclick = () => {
                this.model.clock.stop()
                this.model.clock.updateDivisions(
                    parseInt(document.getElementById("divisions").value, 10)
                )
                this.model.clock.updateDots(
                    parseInt(document.getElementById("layer").value, 10),
                    parseInt(document.getElementById("eqN").value, 10)
                )
                this.view.render()
            }*/

            document.getElementById("play").onclick = () => {
                this.model.clock.play()
                this.view.render()
            }

            /*document.getElementById("pause").onclick = () => {
                this.model.clock.pause()
                this.view.render()
            }*/

            document.getElementById("stop").onclick = () => {
                this.model.clock.stop()
                this.view.render()
                stoprecording();
            }

            /*document.getElementById("simpleRender").onclick = () => {
                this.model.clock.stop()
                this.model.clock.updateDivisions(
                    parseInt(document.getElementById("divisions").value, 10)
                )
                this.view.render()
            }*/


            ////RETRIVE THE LAST ADD BUTTON////
            var rythmyc = document.getElementById("rythmyc-view");
            var addsectionbtn = rythmyc.children[0];
            addsectionbtn.onclick = () => {
                discardrecording()

                this.view.render();
                if (document.getElementById("waitrec")) {
                    document.getElementById("waitrec").remove();
                }
                this.view.updatesection();
            }

            document.getElementById("next").onclick = () => {
                this.model.bpm.increase()
                this.view.render()

            }

            document.getElementById("prev").onclick = () => {
                this.model.bpm.decrease()
                this.view.render()
            }


            /*document.getElementById("renderDeg").onclick = () => {
                this.model.clock.stop()
                this.model.clock.updateDivisions(
                    parseInt(document.getElementById("divisions").value, 10)
                )
                this.model.clock.updateDotsArbitrary(
                    parseInt(document.getElementById("layer").value, 10),
                    document.getElementById("deg").value
                )
                this.view.render()
            }*/


            // WHERE THE MAGIC HAPPENS

            document.getElementById("stop").onclick = async () => {
              var ourJson = await stoprecording()
              console.log("Ueeeee mi è arrivato il json")
              console.log(ourJson)

              var waitrec = document.getElementById("waitrec")
              var section = waitrec.parentElement

              waitrec.remove()

              var ourGrid = new GridOfDots(3, ourJson.Divisions)
              ourGrid.updateLayerArbitrary(0, ourJson.Angles_hihat)
              ourGrid.updateLayerArbitrary(1, ourJson.Angles_kick)
              ourGrid.updateLayerArbitrary(2, ourJson.Angles_snare)

              section.prepend(new Clock(
                'OurClock',
                ourGrid,
                false,
                false,
                this.model.bpm.value
              ).build())





            };

        }, 100)

    }
}

const app = new Controller();
