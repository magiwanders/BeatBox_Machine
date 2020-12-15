class Model {

    constructor() {
        this._clock = new Clock()
        this._addclock = new AddClock()
        this._addwaitrec = new WaitRec()
        this._addsection = new AddSection()
        this._section = new Section()
    }

    get clock() {
        return this._clock
    }

    get addclock() {
        return this._addclock
    }

    get addwaitrec() {
        return this._addwaitrec
    }

    get addsection() {
        return this._addsection
    }

    get section() {
        return this._section
    }

}