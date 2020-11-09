const beat = 120

i=0

function increaseByOneDegree() {
  document.getElementById("hand").style.transform = `rotate(${i}deg)`;
  i++
  if(i==360) i=0
}

setInterval(increaseByOneDegree, 1)
