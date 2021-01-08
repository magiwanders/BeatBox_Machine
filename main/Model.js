class Model {

    constructor() {
        this._clock = new Clock()
        this._addbutton = new AddButton()
        this._addwaitrec = new WaitRec()
        this._section = new Section()
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