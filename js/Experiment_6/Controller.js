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
        if(divisions != this.model.clock.gridOfDots.divisions) {
          this.model.clock.gridOfDots = new GridOfDots(1, divisions)
        }
        this.model.populateLayer(
          parseInt(document.getElementById("layer").value, 10),
          parseInt(document.getElementById("eqN").value, 10)
        )
        this.view.render()
      }

      document.getElementById("play").onclick = () => {
        console.log("play!");
        this.model.clock.isPlaying = true
      }
    }, 100)

  }
}

const app = new Controller()
