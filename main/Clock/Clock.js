class Clock {

    constructor(
        id = 'clock1',
        gridOfDots = new GridOfDots(),
        isArmed = false,
        isPlaying = false,
        tempo = 60,
        sectionIndex = 0,
        clockIndex = 0,
        model = null,
        view = null
    ) {
        this.id = id
        this.gridOfDots = gridOfDots
        this.isArmed = isArmed
        this.isPlaying = isPlaying
        this.tempo = tempo
        this.sectionIndex = sectionIndex
        this.clockIndex = clockIndex
        this.remove_btn = this.buildRemBtn(20, 40, Default.dotDiameter + 10)
        this.tempo_btn = this.buildTCbtn()
        this.tTfC = false
        this.model = model
        this.view = view
    }


    getArmedDot() {
        return this.gridOfDots.armed_dot
    }

    // HAND functions

    play() {
      console.log(this.tempo)
        if (this.gridOfDots.handMoving) {
            clearInterval(this.gridOfDots.handMoving)
        }
        this.isPlaying = true
        this.gridOfDots.startRotating(60 / this.tempo * 1000)
    }

    pause() {
        this.isPlaying = false
        this.gridOfDots.stopRotating()
    }

    stop() {
        this.pause()
        this.gridOfDots.handAngle = 0
        this.gridOfDots.hand.style.transform = 'translateX(-50%) rotate(' + this.gridOfDots.handAngle + 'deg)'
    }

    updateBpm() {
        this.tempo = this.model.bpm.value
    }

    // STRUCTURE functions

    addLayer() {
        this.gridOfDots.nLayers += 1
        this.gridOfDots.addLayer()
    }

    updateDivisions(divisions) {
        if (divisions != this.gridOfDots.divisions) {
            this.gridOfDots = new GridOfDots(1, divisions)
        }
    }

    updateDots(layerNumber, nOfEquallySpacedDots) {
        this.gridOfDots.updateLayer(layerNumber, nOfEquallySpacedDots)
    }

    updateDotsArbitrary(layerNumber, dotsString) {
        const arrayOfDots = dotsString.split(',')
        this.gridOfDots.updateLayerArbitrary(layerNumber, arrayOfDots)
    }


    // BUILD functions

    build() {
        var container = document.createElement('div')
        container.setAttribute("class", "clock_container")

        if (Default.DEBUG) container = this.injectDebugData(container)

        container.appendChild(this.gridOfDots.build())
        container.prepend(this.remove_btn)
        container.prepend(this.tempo_btn)

        const armed_dot = this.gridOfDots.armed_dot
        if (this.isArmed) armed_dot.style.backgroundColor = 'red'
        else armed_dot.style.backgroundColor = 'black'

        console.log("buildato con bpm", this.tempo)

        return container
    }

    buildTCbtn(
        top = 280,
        left = 30,
        d = Default.dotDiameter
    ) {
        const dot = document.createElement('div')
        dot.className = "tigran-chopin-button"
        dot.style.top = top + 'px'
        dot.style.left = left + 'px'
        dot.style.width = d + 'px'
        dot.style.height = d + 'px'
        dot.style['z-index'] = '2'

        dot.onclick = () => {
          console.log("clickedddddd" + this.tempo)
          if(this.tTfC) {
            this.tempo = this.model._bpm.value
            this.tTfC = false
            dot.style.backgroundColor = 'black'
          } else if (!this.tTfC) {
            this.tempo = (this.gridOfDots.divisions/8)*this.model._bpm.value
            this.tTfC = true
            dot.style.backgroundColor = 'red'
          }
          console.log(this.tempo)
        }

        return dot
    }

    buildRemBtn(
        top = Default.innerCircleRadius,
        left = Default.innerCircleRadius,
        d = Default.dotDiameter
    ) {
        const dot = document.createElement('div')
        dot.className = "rem-button-container"
        var img = document.createElement("img")
        img.src = "Components/cancel.png"
        img.id = "rem-clock-img"
            /*
            dot.className = 'rem-btn'
            dot.style.top = top + 'px'
            dot.style.left = left + 'px'
            dot.style.width = d + 'px'
            dot.style.height = d + 'px'
            dot.style['z-index'] = '2'
            */
        dot.appendChild(img)
        return dot
    }

    getRemBtn() {
        return this.remove_btn
    }

    bindAll() {

        this.gridOfDots.armed_dot.onclick = () => {
            this.isArmed = !this.isArmed
            if (!this.isArmed && this.isPlaying) {
                this.gridOfDots.stopRotating()
                this.gridOfDots.handAngle = 0
                this.gridOfDots.hand.style.transform = 'translateX(-50%) rotate(' + this.gridOfDots.handAngle + 'deg)'
            }

            if (this.isPlaying && this.isArmed) {
                this.play()
            }
            this.view.render()
        }

        this.remove_btn.onclick = () => {

            clearInterval(this.gridOfDots.handMoving)

            this.model.sections[this.sectionIndex].removeClock(this.clockIndex)
            for (var i = 0; i < this.model.sections[this.sectionIndex]._clocks.length; i++) {
                console.log("bindo il clock", i)

                this.model.sections[this.sectionIndex]._clocks[i].clockIndex = i;

                this.model.sections[this.sectionIndex]._clocks[i].bindAll()
            }
            this.view.render()
        }
    }

    // DEBUG funcions

    injectDebugData(container) {
        const title = document.createElement('p')
        title.innerHTML = 'CLOCK: ' + this.id
        container.appendChild(title)

        const isArmedDisplay = document.createElement('p')
        isArmedDisplay.innerHTML = '[Clock] isArmed=' + this.isArmed
        container.appendChild(isArmedDisplay)

        const isPlayingDisplay = document.createElement('p')
        isPlayingDisplay.innerHTML = '[Clock] isPlayingisPlaying=' + this.isPlaying
        container.appendChild(isPlayingDisplay)

        const tempoDisplay = document.createElement('p')
        tempoDisplay.innerHTML = '[Clock] tempo=' + this.tempo
        container.appendChild(tempoDisplay)

        return container
    }

}
