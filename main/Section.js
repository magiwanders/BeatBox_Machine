class Section {

    constructor(id = 'section1') {
        this.id = id
    }

    // BUILD functions

    build() {
        var section = document.createElement("div")
        section.setAttribute("id", "section")
        return section
    }

}