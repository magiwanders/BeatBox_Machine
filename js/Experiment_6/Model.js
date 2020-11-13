class Model {

  constructor() {
    this._clock = new Clock()
  }

  get nLayers() {
    return this._clock.gridOfDots.nLayers
  }

  get divisions() {
    return this._clock.gridOfDots.divisions
  }

  get clock() {
    return this._clock
  }

  // SOME OF THESE ARE SIMPLY TO MOVE INSIDE CLASS CLOCK

  addLayer()  {
    const newLayers = this.nLayers + 1
    this.clock.gridOfDots.nLayers = newLayers
    this.clock.gridOfDots.addLayer()
  }

  populateLayer(layer, nOfEquallySpacedDots) {
    if(this.isAcceptable(nOfEquallySpacedDots)) {
      const arrayOfAngles = this.clock.gridOfDots.updateLayer(layer, nOfEquallySpacedDots)
    }
  }

  // A number of equally spaced dots is acceptable if it is a divisor of the number of divisions
  isAcceptable(n) {
    return (this.divisions%n == 0) &&
           (this.divisions>=n)
  }

  updateDivisions(divisions) {
    if(divisions != this.clock.gridOfDots.divisions) {
      this.clock.gridOfDots = new GridOfDots(1, divisions)
    }
    this.populateLayer(
      parseInt(document.getElementById("layer").value, 10),
      parseInt(document.getElementById("eqN").value, 10)
    )
  }

  alive() {
    console.log("Model alive!")
  }
}
