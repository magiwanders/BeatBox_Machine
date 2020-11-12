class View {

  constructor(model) {
    this.model = model
  }

  render() {
    console.log("Rendering...")

    const clockContainer = document.getElementById("clockContainer")
    clockContainer.innerHTML = ""

    clockContainer.appendChild(this.model.clock.build())

    console.log("Done Rendering")
  }

  play(h) {
    console.log("h");
    setInterval(this.increment(h), 100)
  }

  increment(h) { //TO FIX
    console.log("hh");
    var v = parseInt(h.style.transform.charAt(24))
    v = v+1
    console.log(v);
    h.style.transform = "translateX(-50%) rotate("+v+"deg)"
  }

  alive() {
    console.log("View alive!")
  }

}
