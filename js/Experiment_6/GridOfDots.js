class GridOfDots {

  // nLayers is the number of layers of the clock.
  // divisions is the minimum step/angle to which to quantize the dots.

  // The actual grid is a map of Maps
  // The first map is nLayer -> mapOfDotsRelativeToThatLayer
  // The secnd map is angleInDegreesOfStep -> 0 if the step is empty, 1 if there is a dot

  constructor(nLayers, divisions) {
    this.nLayers = nLayers
    this.divisions = divisions
    this.step = 360/divisions
    this.mapOfLayers = this.generateMapOfLayers()
  }

  // n is number of dots in the layer
  getLayer(n) {
    var layer = new Map()
    var skip = this.divisions/n - 1
    var remaining = 0 // The first dot is always there
    for(var i=0; i<this.divisions; i++) {
      if(remaining!=0 || n==0) {
        layer.set(Math.round(i*this.step), 0)
        remaining--
      } else {
        layer.set(Math.round(i*this.step), 1)
        remaining = skip
      }
    }
    return layer
  }

  updateLayer(layer, n) {
    const newLayer = this.getLayer(n)
    this.mapOfLayers.delete(layer)
    this.mapOfLayers.set(layer, newLayer)
  }

  generateMapOfLayers() {
    var mapOfLayers = new Map()
    for(var i=0; i<this.nLayers; i++) {
      mapOfLayers.set(i, this.getLayer(0))
    }
    return mapOfLayers
  }

  addLayer() {
    this.mapOfLayers.set(this.nLayers-1, this.getLayer(0))
  }

}
