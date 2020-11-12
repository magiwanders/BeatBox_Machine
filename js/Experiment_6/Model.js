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

  alive() {
    console.log("Model alive!")
  }
}
