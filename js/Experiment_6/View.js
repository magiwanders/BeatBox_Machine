class View {

  // Receives reference form Controller as it has to "read" the Model in order to render it
  // Note that the actual construction of the components is done in the components' class, View just calls them in the right order
  constructor(model) {
    this.model = model
  }

  render() {
    console.log("Rendering...")

    // Reset the clock container before adding the new rendered clock
    const clockContainer = document.getElementById("clockContainer")
    clockContainer.innerHTML = ""

    // All the building is done inside the Clock class which contains also the building of all these children.
    clockContainer.appendChild(this.model.clock.build())

    console.log("Done Rendering")
  }
}
