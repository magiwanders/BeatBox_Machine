setTimeout(link, 1000)

function link() {
  document.getElementById("startButton").onclick = boot
}

function boot() {
  // AUDIO

  var c = new AudioContext
  c.resume();
  var o = c.createOscillator()
  var g = c.createGain()
  g.connect(c.destination)
  o.connect(g)
  o.start()
  g.gain.value = 0

  var c1 = new AudioContext
  var o1 = c1.createOscillator()
  var g1 = c1.createGain()
  g1.connect(c1.destination)
  o1.connect(g1)
  o1.start()
  g1.gain.value = 0

  var c2 = new AudioContext
  var o2 = c2.createOscillator()
  var g2 = c2.createGain()
  g2.connect(c2.destination)
  o2.connect(g2)
  o2.start()
  g2.gain.value = 0


  // JS

  const beat = 120
  const divisions = 2
  const step = Math.ceil(360/divisions)
  const divisionsBlue = 5
  const stepBlue = Math.ceil(360/divisionsBlue)
  const divisionsRed = 3
  const stepRed = Math.ceil(360/divisionsRed)

  p=0
  k=0
  l=0
  m=0
  function increaseByOneDegree() {
      document.getElementById("hand").style.transform = `rotate(${p}deg)`;
    p++
    k++
    l++
    m++
    if(p==360) p=0

    if (k==step) {
    	console.log(p)
      playNote()
    	k=0
    }

    if (l==stepBlue) {
      console.log(p)
    	playNoteBlue()
    	l=0
    }

    if (m==stepRed) {
      console.log(p)
    	playNoteRed()
      m=0
    }
  }

  setTimeout(start, 3000)

  function start() {
  	 setInterval(increaseByOneDegree, 1)
  }

  setTimeout(addCircles, 100)

  function addCircles() {
    for(j=0; j<divisions; j++) {
      addCircleAtAngle(j*step)
    }
  }

  function addCircleAtAngle(angle) {
    const circle = document.createElement("div")
    circle.classList.add("dot")
    const left = 157 + 157*Math.sin(Math.PI/180*angle)
    const top = 157 - 157*Math.cos(Math.PI/180*angle)
    circle.style.top = `${top}px`
    circle.style.left = `${left}px`
    root = document.getElementById("root")
    root.appendChild(circle)
  }


  function playNote() {
    console.log("Green Note Played")
    c.resume()
    o.frequency.setValueAtTime(440, c.currentTime)
    g.gain.setValueAtTime(0, c.currentTime)
    g.gain.linearRampToValueAtTime(1, c.currentTime + 0.1)
    g.gain.linearRampToValueAtTime(0, c.currentTime + 0.2)
  }

  // BLUE

  setTimeout(addCirclesBlue, 100)

  function addCirclesBlue() {
    for(j=0; j<divisionsBlue; j++) {
      addCircleAtAngleBlue(j*stepBlue)
    }
  }

  function addCircleAtAngleBlue(angle) {
    const circle = document.createElement("div")
    circle.classList.add("dot")
    const left = 200 + 200*Math.sin(Math.PI/180*angle)
    const top = 200 - 200*Math.cos(Math.PI/180*angle)
    circle.style.top = `${top}px`
    circle.style.left = `${left}px`
    root = document.getElementById("root1")
    root.appendChild(circle)
  }


  function playNoteBlue() {
    console.log("Blue Note Played")
    c1.resume()
    o1.frequency.setValueAtTime(523, c1.currentTime)
    g1.gain.setValueAtTime(0, c1.currentTime)
    g1.gain.linearRampToValueAtTime(1, c1.currentTime + 0.1)
    g1.gain.linearRampToValueAtTime(0, c1.currentTime + 0.2)
  }

  // RED

  setTimeout(addCirclesRed, 100)

  function addCirclesRed() {
    for(j=0; j<divisionsRed; j++) {
      addCircleAtAngleRed(j*stepRed)
    }
  }

  function addCircleAtAngleRed(angle) {
    const circle = document.createElement("div")
    circle.classList.add("dot")
    const left = 250 + 250*Math.sin(Math.PI/180*angle)
    const top = 250 - 250*Math.cos(Math.PI/180*angle)
    circle.style.top = `${top}px`
    circle.style.left = `${left}px`
    root = document.getElementById("root2")
    root.appendChild(circle)
  }


  function playNoteRed() {
    console.log("Red Note Played")
    c2.resume()
    o2.frequency.setValueAtTime(659, c2.currentTime)
    g2.gain.setValueAtTime(0, c2.currentTime)
    g2.gain.linearRampToValueAtTime(1, c2.currentTime + 0.1)
    g2.gain.linearRampToValueAtTime(0, c2.currentTime + 0.2)
  }

}
