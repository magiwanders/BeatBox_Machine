class Controller {

  constructor() {
    this.model = new Model()
    this.view = new View(this.model)

    this.model.alive()
    this.view.alive()

    setTimeout(()=> {


      this.view.render() // Initial rendering.

      // Binding the render function to the renderButton requires that it is binded with the 'this' of the class in which render() is defined, View in this case.
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

    }, 100)

  }
}

const app = new Controller()
