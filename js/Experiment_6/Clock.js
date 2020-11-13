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
    gridOfDots.startRotating
    const hand = document.getElementById("hand")
    const handMoving = setInterval(nextDivision(), 60/tempo*1000)
  }

  // BUILD RELATED FUNCTIONS

  build() {
    const container = document.createElement('div')

    if (Default.DEBUG) container = this.injectDebugData(container)

    container.appendChild(this.gridOfDots.build())

    return container
  }


  // DEBUG only funcions

  injectDebugData() {
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
  }



}
