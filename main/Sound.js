class Sound {
    static bip(f) {
        var c = new AudioContext
        var o = c.createOscillator()
        var g = c.createGain()

        g.connect(c.destination)
        o.connect(g)

        o.start()
        g.gain.value = 0

        c.resume()

        o.frequency.setValueAtTime(f, c.currentTime)
        g.gain.setValueAtTime(0, c.currentTime)
        g.gain.linearRampToValueAtTime(1, c.currentTime + 0.1)
        g.gain.linearRampToValueAtTime(0, c.currentTime + 0.2)

    }
}


function play_kick() {
    var kick_sound = new Audio('kick.wav')
    kick_sound.play()
}

function play_snare() {
    var snare_sound = new Audio('snare.wav')
    snare_sound.play()
}

function play_hihat() {
    var hihat_sound = new Audio('hihat.wav')
    hihat_sound.play()
}