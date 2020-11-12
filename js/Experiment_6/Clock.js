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

  build() {
    const container = document.createElement('div')

    const title = document.createElement('p')
    title.innerHTML = 'CLOCK: ' + this.id
    container.appendChild(title)

    const isArmedDisplay = document.createElement('p')
    isArmedDisplay.innerHTML = '[Clock] isArmed=' + this.isArmed
    container.appendChild(isArmedDisplay)

    const isPlayingDisplay = document.createElement('p')
    isPlayingDisplay.innerHTML = '[Clock] isPlayingisPlayingDisplay=' + this.isPlaying
    container.appendChild(isPlayingDisplay)

    const tempoDisplay = document.createElement('p')
    tempoDisplay.innerHTML = '[Clock] tempo=' + this.tempo
    container.appendChild(tempoDisplay)

    container.appendChild(this.gridOfDots.build())

    return container
  }


}
