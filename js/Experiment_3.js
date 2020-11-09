const beat = 120
const divisions = 3
const step = Math.ceil(360/divisions)

p=0
k=0
function increaseByOneDegree() {
  document.getElementById("hand").style.transform = `rotate(${p}deg)`;
  p++
  k++
  if(p==360) p=0

  if (k==step) {
  	console.log(p)
    playNote()
  	k=0
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
