const beat = 120
const divisions = 3
const step = Math.ceil(360/divisions)
const divisionsBlue = 5
const stepBlue = Math.ceil(360/divisionsBlue)
const divisionsRed = 2
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
}
