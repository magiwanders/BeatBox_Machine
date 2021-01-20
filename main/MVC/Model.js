class Model {

    constructor() {
        this._clock = new Clock()

        // Fixed rythmic view model

        this.selectedSection = 0

        this._nOfSections = 4

        this.sections = [new Section(0), new Section(1), new Section(2), new Section(3)] //, new Section(4)]

        //this._section = new Section()
        this._bpm = new BPM()
    }

    get clock() {
        return this._clock
    }

    get addbutton() {
        return this._addbutton
    }

    get addwaitrec() {
        return this._addwaitrec
    }

    get section() {
        return this._section
    }

    get bpm() {
        return this._bpm
    }

}