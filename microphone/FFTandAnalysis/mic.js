// Prefer camera resolution nearest to 1280x720.
var constraints = {
    audio: true,
    video: false
};

async function getMedia(constraints) {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        
    } catch (err) {
        console.error(err);
    }
}

getMedia(constraints);