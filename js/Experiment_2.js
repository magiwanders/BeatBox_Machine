const beat = 120
const divisions = 5
const step = 360/divisions

i=0

function increaseByOneDegree() {
  document.getElementById("hand").style.transform = `rotate(${i}deg)`;
  i++
  if(i==360) i=0
}

setInterval(increaseByOneDegree, 1)
setTimeout(addCircles, 100)

function addCircles() {
  for(j=0; j<divisions; j++) {
    addCircleAtAngle(j*step)
  }
}


function addCircleAtAngle(angle) {
  console.log("Entered with value " + angle)
  const circle = document.createElement("div")
  circle.classList.add("dot")
  const left = 157 + 157*Math.sin(Math.PI/180*angle)
  const top = 157 - 157*Math.cos(Math.PI/180*angle)
  console.log(top)
  console.log(left)
  circle.style.top = `${top}px`
  circle.style.left = `${left}px`
  root = document.getElementById("root")
  root.appendChild(circle)
}
