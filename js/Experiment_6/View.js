class View {

  constructor(model) {
    this.model = model

    this.defaultInnerCircleRadius = 125
    this.defaultHandOverhang = 10
    this.defaultHandWidth = 2
    this.defaultDotDiameter = 10
    this.defaultBorderThickness = 2
    this.defaultHandHeight = this.defaultInnerCircleRadius + this.defaultHandOverhang
    this.defaultClockMargin = this.defaultInnerCircleRadius*2/10
    this.defaultCircleDiameter = 2*this.defaultInnerCircleRadius
  }

  render() {
    console.log("Rendering...")

    const clockContainer = document.getElementById("clockContainer")
    clockContainer.innerHTML = ""
    var newClock = this.buildInitialClock()

    for(var i=1; i<this.model.nLayers; i++) {
      newClock = this.addClock(newClock, i)
    }

    clockContainer.appendChild(newClock)

    console.log("Done Rendering")
  }

  addClock(childClock, layerNumber) {
    const layer = document.createElement("div")
    layer.className = "clock"
    layer.id = "root"+layerNumber
    layer.style.margin = this.defaultClockMargin + "px"
    layer.style.height = (this.defaultCircleDiameter + layerNumber*2*this.defaultClockMargin) + "px"
    layer.style.width = (this.defaultCircleDiameter + layerNumber*2*this.defaultClockMargin) + "px"
    layer.style.border = this.defaultBorderThickness + "px solid green"
    layer.style.transform = "translateX(-" + this.defaultBorderThickness + "px) translateY(-" + this.defaultBorderThickness + "px)"

    this.populateActualDotsOfLayer(layer, layerNumber)
    layer.appendChild(childClock)

    return layer
  }

  buildInitialClock() {

    const dot = document.createElement("div")
    dot.className = "dot"
    dot.style.top = this.defaultInnerCircleRadius + "px"
    dot.style.left =  this.defaultInnerCircleRadius + "px"
    dot.style.width = this.defaultDotDiameter + "px"
    dot.style.height = this.defaultDotDiameter + "px"

    const hand = document.createElement("div")
    hand.id = "hand"
    hand.style.height = ( (this.model.nLayers-1)*this.defaultClockMargin + this.defaultInnerCircleRadius + this.defaultHandOverhang) + "px"
    hand.style.width = this.defaultHandWidth + "px"
    hand.style.bottom = this.defaultInnerCircleRadius + "px"
    hand.style.left = this.defaultInnerCircleRadius + "px"

    const layer0 = document.createElement("div")
    layer0.className = "clock"
    layer0.id = "root"
    layer0.style.margin = this.defaultClockMargin + "px"
    layer0.style.height = this.defaultCircleDiameter + "px"
    layer0.style.width = this.defaultCircleDiameter + "px"
    layer0.style.border = this.defaultBorderThickness + "px solid green"
    layer0.style.transform = "translateX(-" + this.defaultBorderThickness + "px) translateY(-" + this.defaultBorderThickness + "px)"

    this.populateActualDotsOfLayer(layer0, 0)

    // Visualizations for divisions.
    const steps = this.model.clock.gridOfDots.getLayer(0)
    for(var [angle, notImportant] of steps) {
      const invisibleHand = document.createElement("div")
      invisibleHand.id = "hand"
      invisibleHand.style.height = ( (this.model.nLayers-1)*this.defaultClockMargin + this.defaultInnerCircleRadius + this.defaultHandOverhang) + "px"
      invisibleHand.style.width = this.defaultHandWidth + "px"
      invisibleHand.style.bottom = this.defaultInnerCircleRadius + "px"
      invisibleHand.style.left = this.defaultInnerCircleRadius + "px"

      invisibleHand.style.backgroundColor = "#e0e0e0"
      invisibleHand.style.transform = "translateX(-50%) rotate("+ angle +"deg)"

      layer0.appendChild(invisibleHand)
    }



    layer0.appendChild(dot)
    layer0.appendChild(hand)
    //populateDots(layer0, dotgrid.positions[0])
    return layer0
  }

  populateActualDotsOfLayer(actualLayer, layerNumber) {
      const layerMap = this.model.clock.gridOfDots.mapOfLayers.get(layerNumber)
      for(var [angle, isThereDot] of layerMap) {
        if(isThereDot==1) this.addCircleAtAngle(actualLayer, angle, layerNumber)
      }
  }

  addCircleAtAngle(layer, angle, layerNumber) {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    const r = this.defaultInnerCircleRadius + layerNumber * this.defaultClockMargin
    const left = r + r*Math.sin(Math.PI/180*angle)
    const top = r - r*Math.cos(Math.PI/180*angle)
    dot.style.top = top + "px"
    dot.style.left = left + "px"
    dot.style.height = this.defaultDotDiameter + "px"
    dot.style.width = this.defaultDotDiameter + "px"
    layer.appendChild(dot)
  }

  play(h) {
    console.log("h");
    setInterval(this.increment(h), 100)
  }

  increment(h) { TO FIX
    console.log("hh");
    var v = parseInt(h.style.transform.charAt(24))
    v = v+1
    console.log(v);
    h.style.transform = "translateX(-50%) rotate("+v+"deg)"
  }

  alive() {
    console.log("View alive!")
  }

}
