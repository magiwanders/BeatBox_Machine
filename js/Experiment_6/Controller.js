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
        this.model.addLayer()
        this.view.render()
      }

      document.getElementById("renderEqN").onclick = () => {
        const divisions = parseInt(document.getElementById("divisions").value, 10)
        this.model.updateDivisions(divisions)
        this.view.render()
      }

      document.getElementById("play").onclick = () => {
        console.log("play!");
        this.model.clock.play()
      }

      document.getElementById("stop").onclick = () => {
        console.log("stop!");
        this.model.clock.stop()
      }

    }, 100)

  }
}

const app = new Controller()
