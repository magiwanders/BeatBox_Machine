class GridOfDots {

    // nLayers is the number of layers of the clock.
    // divisions is the minimum step/angle to which to quantize the dots.

    // The actual grid is a map of Maps
    // The LVL1 map is nLayer -> mapOfDotsRelativeToThatLayer
    // The LVL2 map is angleInDegreesOfStep -> 0 if the step is empty, 1 if there is a dot

    constructor(nLayers = 3, divisions = 8) {
        this.nLayers = nLayers
        this.divisions = divisions
        this.step = 360 / divisions
        this.mapOfLayers = this.generateMapOfLayers()
        this.handAngle = 0
        this.sound = new Sound()
        this.armed_dot = this.buildDot(Default.innerCircleRadius, Default.innerCircleRadius, Default.dotDiameter + 20)
        this.hand = this.buildHand()
        this.rotation = 0

    }

    static getMyPoorThing() {
        return this.mapOfLayers.get(0).get(0)
    }

    // Returns the model representation of a layer with n equally spaced dots.
    // n=0 returns just an empty layer
    // The actual data model used is a LVL2 Map<[angleOfDivisions],[1_forDot - 0_forEmpty]>
    getLayer(n = 0) {
        var layer = new Map()
        var skip = this.divisions / n - 1 // How many empty divisions between two dots
        var remaining = 0 // How many divisions remain to be left empty before a new dot
        for (var i = 0; i < this.divisions; i++) { // Cycling divisions
            if (remaining != 0 || n == 0) { // Put a zero either if n=0 or there are still remaining divisions to be left empty
                layer.set(Math.round(i * this.step), 0) // Non-integer angles are rounded to the nearest int
                remaining--
            } else { // Only in case n!=0 in the first place, if there are no remaining divisions to be left empty, write 1
                layer.set(Math.round(i * this.step), 1)
                remaining = skip // remaining divisions to be left empty reset to the number of divisions between two dots
            }
        }
        return layer
    }

    // Replaces an existing LVL2 map relative to a layer with a new one with the required number of equally spaced dots
    updateLayer(layerNumber, nOfDots) {
        if (this.isAcceptable(nOfDots)) {
            this.mapOfLayers.delete(layerNumber)
            this.mapOfLayers.set(
                layerNumber,
                this.getLayer(nOfDots)
            )
        }
    }

    updateLayerArbitrary(layerNumber, nOfDots) {
        var emptyLayer = this.getLayer()
        for (var i = 0; i < nOfDots.length; i++) {
            if (emptyLayer.has(parseInt(nOfDots[i]))) {
                emptyLayer.set(parseInt(nOfDots[i]), 1)
            }
        }
        this.mapOfLayers.set(
            layerNumber,
            emptyLayer
        )
    }

    // Controls that n, the number of equally spaced dots, fits into the divisions grid.
    isAcceptable(n) {
        return (this.divisions % n == 0) &&
            (this.divisions >= n)
    }

    // This generates the data model of all the levels together (the whole data grid)
    // Generates an empty LVL1 Map<[layer index, innermost is zero],[LVL2 Map of the layer]>
    generateMapOfLayers() {
        var mapOfLayers = new Map()
        for (var i = 0; i < this.nLayers; i++) {
            mapOfLayers.set(i, this.getLayer())
        }
        return mapOfLayers
    }

    // Adds outermost layer
    addLayer() {
        this.mapOfLayers.set(this.nLayers - 1, this.getLayer())
    }



    // MOVING RELATED FUNCTIONS

    startRotating(interval) {
      for (var i = 0; i < this.mapOfLayers.size; i++) {
          var layer = this.mapOfLayers.get(i)
              //layer.get(this.handAngle) == 1 ? console.log("Layer", i + ": Note!") : console.log("")
          if (layer.get(this.handAngle) == 1) {
              if (i == 0) {
                  this.sound.play_hihat()
              } else if (i == 1) {
                  this.sound.play_kick()
              } else if (i == 2) {
                  this.sound.play_snare()
              }
          }
      }
        this.handMoving = setInterval((interval) => this.nextDivision(), interval)
        var shortInterval = interval/25
        this.handSteps = setInterval(() => this.nextHandStep(), shortInterval)
    }

    stopRotating() {
        clearInterval(this.handMoving)
        clearInterval(this.handSteps)
        this.handAngle = 0
        this.rotation = 0
        this.hand.style.transform = 'translateX(-50%) rotate(' + this.rotation + 'deg)'
    }

    // Advances the hand position by one step
    // TODO: interpolate the positions to obtain a smooth transition
    nextDivision(interval) {


        //this.hand.style.transform = 'translateX(-50%) rotate(' + 0 + 'deg)'
        //this.hand.style.transition = '0.1s'

        //this.hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'

      //  if(this.handAngle>=360) this.hand.style.removeProperty('transition');

        // if (this.handAngle >= 360) {
        //   //this.hand.style.removeProperty('transition');
        //   this.hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'
        //   this.handAngle = this.handAngle - 360
        //   this.hand.style.transition = '0.00001s'
        //   //this.hand.style.removeProperty('transition');
        //   this.hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'
        //   this.hand.style.transition = '0.1s'
        //   this.hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'
        // } else {
        //     this.hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'
        // }


        this.handAngle += this.step
        if(this.handAngle>=360) this.handAngle -= 360

        for (var i = 0; i < this.mapOfLayers.size; i++) {
            var layer = this.mapOfLayers.get(i)
                //layer.get(this.handAngle) == 1 ? console.log("Layer", i + ": Note!") : console.log("")
            if (layer.get(this.handAngle) == 1) {
                if (i == 0) {
                    this.sound.play_hihat()
                } else if (i == 1) {
                    this.sound.play_kick()
                } else if (i == 2) {
                    this.sound.play_snare()
                }
            }
        }


    }

    nextHandStep(interval) {
      this.hand.style.transform = 'translateX(-50%) rotate(' + this.rotation + 'deg)'
      if(this.rotation>=360) this.rotation -= 360
      this.rotation += this.step/25
    }


    // METHODS THAT BUILD THE HTML FOR THE GRID

    build() {
        // Get innermost layer
        var layers = this.buildLayer()

        // Adds division bars
        layers = this.buildDivisions(layers)

        // Add central dot and hand to it
        this.armed_dot.style.zIndex = 10
        layers.appendChild(this.armed_dot)
        layers.appendChild(this.hand)

        // Add other layers
        for (var layerNumber = 1; layerNumber < this.nLayers; layerNumber++) {
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
        hand.style.transform = 'translateX(-50%) rotate(' + this.handAngle + 'deg)'
        return hand
    }

    buildDivisionAtAngle(angle) {
        const division = this.buildGenericHand()
        division.style.backgroundColor = '#e0e0e0'
        division.style['z-index'] = '-1'
        division.style.transform = 'translateX(-50%) rotate(' + angle + 'deg)'
        return division
    }

    buildGenericHand() {
        const hand = document.createElement('div')
        hand.className = 'hand'
        hand.style.height = ((this.nLayers - 1) * Default.clockMargin + Default.innerCircleRadius + Default.handOverhang) + 'px'
        hand.style.width = Default.handWidth + 'px'
        hand.style.bottom = Default.innerCircleRadius + 'px'
        hand.style.left = Default.innerCircleRadius + 'px'
        hand.style['z-index'] = '3'
        return hand
    }

    buildDivisions(layer0) {
        const steps = this.getLayer()
        for (var [angle, notImportant] of steps) {
            const division = this.buildDivisionAtAngle(angle)
            layer0.appendChild(division)
        }
        return layer0
    }

    buildLayer(layerNumber = 0) {
        var layer = document.createElement('div')
        layer.className = 'clock'
        layer.id = 'root' + layerNumber
        layer.style['z-index'] = '1'
        layer.style.margin = Default.clockMargin + 'px'
        layer.style.height = (Default.circleDiameter + layerNumber * 2 * Default.clockMargin) + 'px'
        layer.style.width = (Default.circleDiameter + layerNumber * 2 * Default.clockMargin) + 'px'
        layer.style.border = Default.borderThickness + 'px solid white'
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
        for (var [angle, isThereDot] of layerMap) {
            if (isThereDot == 1) layer = this.addCircleAtAngle(layer, angle, layerNumber)
        }

        return layer
    }

    addCircleAtAngle(layer, angle, layerNumber) {
        const r = Default.innerCircleRadius + layerNumber * Default.clockMargin
        const left = r + r * Math.sin(Math.PI / 180 * angle)
        const top = r - r * Math.cos(Math.PI / 180 * angle)
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

        //console.table(this.mapOfLayers)

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

        const debug_angle = document.createElement('p')
        debug_angle.innerHTML = '[GridOfDots] handAngle=' + this.handAngle
        container.appendChild(debug_angle)

        return container
    }

}
