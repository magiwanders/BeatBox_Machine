class GridOfDots {

  // nLayers is the number of layers of the clock.
  // divisions is the minimum step/angle to which to quantize the dots.

  // The actual grid is a map of Maps
  // The first map is nLayer -> mapOfDotsRelativeToThatLayer
  // The secnd map is angleInDegreesOfStep -> 0 if the step is empty, 1 if there is a dot

  constructor(nLayers = 1, divisions = 8) {
    this.nLayers = nLayers
    this.divisions = divisions
    this.step = 360/divisions
    this.mapOfLayers = this.generateMapOfLayers()
  }

  // n is number of dots in the layer
  getLayer(n=0) {
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
      mapOfLayers.set(i, this.getLayer())
    }
    return mapOfLayers
  }

  addLayer() {
    this.mapOfLayers.set(this.nLayers-1, this.getLayer())
  }


  // METHODS THAT BUILD THE HTML FOR THE GRID

  build() {
    // Get innermost layer
    var layers = this.buildLayer()

    // Adds division bars
    layers = this.buildDivisions(layers)

    // Add central dot and hand to it
    layers.appendChild(this.buildDot())
    layers.appendChild(this.buildHand())

    // Add other layers
    for(var layerNumber=1; layerNumber<this.nLayers; layerNumber++) {
      layers = this.addMaterialLayer(this.buildLayer(layerNumber), layers)
    }

    if (Default.DEBUG) layers = this.appendDebugData(layers)

    return layers
  }

  buildDot(
    top = Default.innerCircleRadius,
    left = Default.innerCircleRadius,
    d = Default.dotDiameter
  ) {
    const dot = document.createElement('div')
    dot.className = 'dot'
    dot.style.top = top + 'px'
    dot.style.left = left + 'px'
    dot.style.width = d + 'px'
    dot.style.height = d + 'px'
    dot.style['z-index'] = '2'
    return dot
  }

  buildHand() {
    const hand = this.buildGenericHand()
    hand.id = 'hand'
    return hand
  }

  buildDivisionAtAngle(angle) {
    const division = this.buildGenericHand()
    division.style.backgroundColor = '#e0e0e0'
    division.style['z-index'] = '-1'
    division.style.transform = 'translateX(-50%) rotate('+ angle +'deg)'
    return division
  }

  buildGenericHand() {
    const hand = document.createElement('div')
    hand.className = 'hand'
    hand.style.height = ( (this.nLayers-1)*Default.clockMargin + Default.innerCircleRadius + Default.handOverhang) + 'px'
    hand.style.width = Default.handWidth + 'px'
    hand.style.bottom = Default.innerCircleRadius + 'px'
    hand.style.left = Default.innerCircleRadius + 'px'
    hand.style['z-index'] = '3'
    return hand
  }

  buildDivisions(layer0) {
    const steps = this.getLayer()
    for(var [angle, notImportant] of steps) {
      const division = this.buildDivisionAtAngle(angle)
      layer0.appendChild(division)
    }
    return layer0
  }

  buildLayer(layerNumber = 0) {
    var layer = document.createElement('div')
    layer.className = 'clock'
    layer.id = 'root'+layerNumber
    layer.style['z-index'] = '1'
    layer.style.margin = Default.clockMargin + 'px'
    layer.style.height = (Default.circleDiameter + layerNumber*2*Default.clockMargin) + 'px'
    layer.style.width = (Default.circleDiameter + layerNumber*2*Default.clockMargin) + 'px'
    layer.style.border = Default.borderThickness + 'px solid green'
    layer.style.transform = 'translateX(-' + Default.borderThickness + 'px) translateY(-' + Default.borderThickness + 'px)'

    layer = this.populateOfDots(layer, layerNumber)

    return layer
  }

  addMaterialLayer(father, child) {
    father.appendChild(child)
    return father
  }

  populateOfDots(layer, layerNumber) {
    const layerMap = this.mapOfLayers.get(layerNumber)
    for(var [angle, isThereDot] of layerMap) {
      if(isThereDot==1) layer = this.addCircleAtAngle(layer, angle, layerNumber)
    }

    return layer
  }

  addCircleAtAngle(layer, angle, layerNumber) {
    const r = Default.innerCircleRadius + layerNumber * Default.clockMargin
    const left = r + r*Math.sin(Math.PI/180*angle)
    const top = r - r*Math.cos(Math.PI/180*angle)
    layer.appendChild(this.buildDot(top, left))
    return layer
  }

  // DEBUG only functions
  appendDebugData(layers) {
    const container = document.createElement('div')
    container.appendChild(layers)

    const title = document.createElement('p')
    title.innerHTML = 'DEBUG from GridOfDots'
    container.appendChild(title)

    const debug_nLayers = document.createElement('p')
    debug_nLayers.innerHTML = '[GridOfDots] nLayers=' + this.nLayers
    container.appendChild(debug_nLayers)

    const debug_divisions = document.createElement('p')
    debug_divisions.innerHTML = '[GridOfDots] divisions=' + this.divisions
    container.appendChild(debug_divisions)

    const debug_step = document.createElement('p')
    debug_step.innerHTML = '[GridOfDots] step=' + this.step
    container.appendChild(debug_step)

    const debug_map = document.createElement('p')
    debug_map.innerHTML = '[GridOfDots] map=' + this.mapOfLayers
    container.appendChild(debug_map)

    return container
  }

}
