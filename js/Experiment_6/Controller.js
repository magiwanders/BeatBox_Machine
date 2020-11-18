class Controller {

  constructor() {
    this.model = new Model()
    this.view = new View(this.model)

    setTimeout(()=> {


      this.view.render() // Initial rendering.

      // Binding of all the buttons with all the respective functions
      // All html retrievals happen here

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
      }

      document.getElementById("play").onclick = () => {
        this.model.clock.play()
        this.view.render()
      }

      document.getElementById("pause").onclick = () => {
        this.model.clock.pause()
        this.view.render()
      }

      document.getElementById("stop").onclick = () => {
        this.model.clock.stop()
        this.view.render()
      }

      document.getElementById("simpleRender").onclick = () => {
        this.model.clock.stop()
        this.model.clock.updateDivisions(
          parseInt(document.getElementById("divisions").value, 10)
        )
        this.view.render()
      }

      document.getElementById("renderDeg").onclick = () => {
        this.model.clock.stop()
        this.model.clock.updateDivisions(
          parseInt(document.getElementById("divisions").value, 10)
        )
        this.model.clock.updateDotsArbitrary(
          parseInt(document.getElementById("layer").value, 10),
          document.getElementById("deg").value
        )
        this.view.render()
      }

    }, 100)

  }
}

const app = new Controller()
