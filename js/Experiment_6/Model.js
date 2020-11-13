class Model {

  constructor() {
    this._clock = new Clock()
  }

  get clock() {
    return this._clock
  }

  alive() {
    console.log("Model alive!")
  }
}
