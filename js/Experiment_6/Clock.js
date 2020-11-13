class Clock {

  constructor(
    id = 'clock1',
    gridOfDots = new GridOfDots(),
    isArmed = false,
    isPlaying = false,
    tempo = 60
  ) {
    this.id = id
    this.gridOfDots = gridOfDots
    this.isArmed = isArmed
    this.isPlaying = isPlaying
    this.tempo = tempo
  }

  // FUNCTIONALITY RELATED functions

  play() {
    this.isPlaying = true
    this.gridOfDots.startRotating(60/this.tempo*1000)
  }

  pause() {
    this.isPlaying = false
    this.gridOfDots.stopRotating()
  }

  stop() {
    this.pause()
    this.gridOfDots.handAngle = 0
  }

  addLayer() {
    this.gridOfDots.nLayers += 1
    this.gridOfDots.addLayer()
  }

  updateDivisions(divisions) {
    if(divisions != this.gridOfDots.divisions) {
      this.gridOfDots = new GridOfDots(1, divisions)
    }
  }

  updateDots(layerNumber, nOfEquallySpacedDots) {
    this.gridOfDots.updateLayer(layerNumber, nOfEquallySpacedDots)
  }

  // BUILD RELATED FUNCTIONS

  build() {
    var container = document.createElement('div')

    if (Default.DEBUG) container = this.injectDebugData(container)

    container.appendChild(this.gridOfDots.build())

    return container
  }


  // DEBUG only funcions

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
