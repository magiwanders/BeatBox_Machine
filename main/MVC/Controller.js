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
                //this.model.clock.play()

                // cicla tutti i clock e fa partire quelli armati
                for (var i = 0; i < this.model._nOfSections; i++) {
                    for (var j = 0; j < this.model.sections[i]._clocks.length; j++) {
                        var currentClock = this.model.sections[i]._clocks[j]
                        if (currentClock.isArmed) {
                            currentClock.play()
                        }
                    }
                }

                this.view.render()
            }

            document.getElementById("stop").onclick = () => {
                // cicla tutti i clock e fa partire quelli armati
                for (var i = 0; i < this.model._nOfSections; i++) {
                    for (var j = 0; j < this.model.sections[i]._clocks.length; j++) {
                        var currentClock = this.model.sections[i]._clocks[j]
                        if (currentClock.isPlaying) {
                            currentClock.stop()
                        }
                    }
                }
            }

            document.getElementById("selector").onclick = () => {
                //this.model.clock.play()

                // cicla tutti i clock e fa partire quelli armati
                for (var i = 0; i < this.model._nOfSections; i++) {
                    for (var j = 0; j < this.model.sections[i]._clocks.length; j++) {
                        var currentClock = this.model.sections[i]._clocks[j]
                        if (i == this.model.selectedSection) {
                            currentClock.isArmed = true
                            currentClock.play()
                        } else {
                            currentClock.isArmed = false
                            currentClock.stop()
                        }
                    }
                }

                this.model.selectedSection++
                    if (this.model.selectedSection >= 4) this.model.selectedSection -= 4

                this.view.render()
            }


            /*document.getElementById("pause").onclick = () => {
                this.model.clock.pause()
                this.view.render()
            }*/

            document.getElementById("create-clock").onclick = () => {
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
            // var rythmyc = document.getElementById("rythmyc-view");
            // var addsectionbtn = rythmyc.children[0];
            // addsectionbtn.onclick = () => {
            //     discardrecording()
            //
            //     this.view.render();
            //     if (document.getElementById("waitrec")) {
            //         document.getElementById("waitrec").remove();
            //     }
            //     this.view.updatesection();
            // }

            document.getElementById("next").onclick = () => {
                this.model.bpm.increase()

                for (var i = 0; i < this.model._nOfSections; i++) {
                    for (var j = 0; j < this.model.sections[i]._clocks.length; j++) {
                        var currentClock = this.model.sections[i]._clocks[j]
                        currentClock.updateBpm();
                        if (currentClock.isArmed) {
                            clearInterval(currentClock.gridOfDots.handMoving)
                            clearInterval(currentClock.gridOfDots.handSteps)
                            currentClock.handAngle = 0
                            currentClock.rotation = 0
                            currentClock.gridOfDots.startRotating(60 / this.model.bpm.value * 1000)
                        }
                    }
                }
                this.view.render()

            }

            document.getElementById("prev").onclick = () => {
                this.model.bpm.decrease()
                for (var i = 0; i < this.model._nOfSections; i++) {
                    for (var j = 0; j < this.model.sections[i]._clocks.length; j++) {
                        var currentClock = this.model.sections[i]._clocks[j]
                        currentClock.updateBpm();
                        if (currentClock.isArmed) {
                            clearInterval(currentClock.gridOfDots.handMoving)
                            clearInterval(currentClock.gridOfDots.handSteps)
                            currentClock.handAngle = 0
                            currentClock.rotation = 0
                            currentClock.gridOfDots.startRotating(60 / this.model.bpm.value * 1000)
                        }
                    }
                }
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

            document.getElementById("create-clock").onclick = async() => {
                var ourJson = await stoprecording()
                console.log("Ueeeee mi è arrivato il json")
                console.log(ourJson)

                var waitrec = document.getElementById("waitrec")
                var section = waitrec.parentElement

                waitrec.remove()

                const sectionIndex = parseInt(document.getElementById("sectionIndex").innerHTML, 10)
                const clockIndex = parseInt(document.getElementById("clockIndex").innerHTML, 10)

                var ourGrid = new GridOfDots(3, ourJson.Divisions)
                ourGrid.updateLayerArbitrary(0, ourJson.Angles_hihat)
                ourGrid.updateLayerArbitrary(1, ourJson.Angles_kick)
                ourGrid.updateLayerArbitrary(2, ourJson.Angles_snare)

                const myClock = new Clock(
                    'OurClock',
                    ourGrid,
                    false,
                    false,
                    this.model.bpm.value,
                    sectionIndex,
                    clockIndex,
                    this.model,
                    this.view
                )

                /*
                        const armed_dot = myClock.getArmedDot()
                        const rem_btn = myClock.getRemBtn()


                        armed_dot.onclick = () => {
                            myClock.isArmed = !myClock.isArmed
                            this.view.render()
                        }

                        rem_btn.onclick = () => {
                            this.model.sections[sectionIndex].removeClock(clockIndex)
                            this.view.render()
                        }
                        */
                myClock.bindAll()

                this.model.sections[sectionIndex].addClock(myClock)

                this.view.render()


                //
                // section.prepend(new Clock(
                //   'OurClock',
                //   ourGrid,
                //   false,
                //   false,
                //   this.model.bpm.value
                // ).build())





            };

        }, 100)

    }
}

const app = new Controller();
